import type { Database } from '@vici/supabase/types';
import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

// ─── Types ────────────────────────────────────────────────────────────────────

type Team = Database['public']['Tables']['teams']['Row'];
type ZoneWithScores = Database['public']['Views']['zones_with_scores']['Row'];

type GameState = {
  // D5: Typed skeleton — all fields initialised to empty/null.
  // No fetching logic; the type contract is the deliverable in this task.
  nearbyZones: ZoneWithScores[]; // Populated by Epic 03 (Maps)
  currentTeam: Team | null; // Populated by Epic 02 (Auth/onboarding)
  competitivePoints: number; // Populated by Epic 04 (Gameplay)
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const gameSlice: StateCreator<GameState> = () => ({
  nearbyZones: [],
  currentTeam: null,
  competitivePoints: 0,
});

// ─── Store ────────────────────────────────────────────────────────────────────

export const useGameStore = create<GameState>()(
  devtools(gameSlice, { name: 'GameStore', enabled: __DEV__ }),
);
