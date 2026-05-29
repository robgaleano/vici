import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// ─── Types ────────────────────────────────────────────────────────────────────

export type Coordinate = {
  latitude: number;
  longitude: number;
  timestamp: number;
};

// Snapshot returned by endSession() — sent to the Edge Function for validation.
export type ActivitySnapshot = {
  startedAt: string;
  distanceKm: number;
  durationSeconds: number;
  routeCoordinates: Coordinate[];
  gpsPointCount: number;
};

type ActivityState = {
  status: 'idle' | 'active' | 'paused';
  startedAt: string | null;
  distanceKm: number;
  durationSeconds: number;
  routeCoordinates: Coordinate[];
  gpsPointCount: number;
  startSession: () => void;
  addCoordinate: (coord: Coordinate) => void;
  pauseSession: () => void;
  resumeSession: () => void;
  endSession: () => ActivitySnapshot | null;
};

// ─── Slice ────────────────────────────────────────────────────────────────────

// D7: immer middleware used here — set() receives an Immer draft, enabling
// state.routeCoordinates.push(coord) instead of spreading on every GPS tick.
// D8: StateCreator typed with immer's mutator so set() draft is typed correctly.
const activitySlice: StateCreator<ActivityState, [['zustand/immer', never]]> = (set, get) => ({
  status: 'idle',
  startedAt: null,
  distanceKm: 0,
  durationSeconds: 0,
  routeCoordinates: [],
  gpsPointCount: 0,

  // D6: Actions are skeletons — real GPS logic added in Epic 04.

  startSession: () =>
    set((state) => {
      state.status = 'active';
      state.startedAt = new Date().toISOString();
    }),

  // D6: addCoordinate — GPS validation (teleport/speed checks) added in Epic 04.
  addCoordinate: (coord) =>
    set((state) => {
      state.routeCoordinates.push(coord);
      state.gpsPointCount = state.routeCoordinates.length;
    }),

  pauseSession: () =>
    set((state) => {
      state.status = 'paused';
    }),

  resumeSession: () =>
    set((state) => {
      state.status = 'active';
    }),

  // D6: endSession() returns a snapshot for the DB write, then resets state.
  endSession: () => {
    const { startedAt, distanceKm, durationSeconds, routeCoordinates, gpsPointCount } = get();
    if (!startedAt) return null;

    const snapshot: ActivitySnapshot = {
      startedAt,
      distanceKm,
      durationSeconds,
      routeCoordinates,
      gpsPointCount,
    };

    set((state) => {
      state.status = 'idle';
      state.startedAt = null;
      state.distanceKm = 0;
      state.durationSeconds = 0;
      state.routeCoordinates = [];
      state.gpsPointCount = 0;
    });

    return snapshot;
  },
});

// ─── Store ────────────────────────────────────────────────────────────────────

// D7 + D9: immer wraps the slice for mutable updates; devtools wraps the result
// for action history in dev. Middleware order matters: devtools(immer(slice)).
export const useActivityStore = create<ActivityState>()(
  devtools(immer(activitySlice), { name: 'ActivityStore', enabled: __DEV__ }),
);
