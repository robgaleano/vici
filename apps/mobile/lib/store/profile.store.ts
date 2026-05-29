import type { Database } from '@vici/supabase/types';
import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

// ─── Types ────────────────────────────────────────────────────────────────────

// D10: Profile derived directly from generated DB types — stays in sync
// automatically when the schema changes and types are regenerated.
type Profile = Database['public']['Tables']['profiles']['Row'];

type ProfileState = {
  profile: Profile | null;
  isLoading: boolean;
};

// ─── Slice ────────────────────────────────────────────────────────────────────

// D10: Typed stub only — no fetch logic.
// loadProfile() action added in Epic 02 after onboarding flow is defined.
const profileSlice: StateCreator<ProfileState> = () => ({
  profile: null,
  isLoading: false,
});

// ─── Store ────────────────────────────────────────────────────────────────────

export const useProfileStore = create<ProfileState>()(
  devtools(profileSlice, { name: 'ProfileStore', enabled: __DEV__ }),
);
