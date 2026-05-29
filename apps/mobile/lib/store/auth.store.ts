import type { Session, User } from '@supabase/supabase-js';
import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

import { supabase } from '../supabase/client';

// ─── Types ────────────────────────────────────────────────────────────────────

type AuthState = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  initialize: () => Promise<void>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

// ─── Slice ────────────────────────────────────────────────────────────────────

// D8: StateCreator<T> pattern used on all stores for correct middleware typing.
const authSlice: StateCreator<AuthState> = (set) => ({
  session: null,
  user: null,
  // isLoading starts true: prevents premature redirects on cold start (D3).
  isLoading: true,

  // D3: initialize() — called once in root _layout.tsx on app mount.
  // Reads the persisted session from SecureStore then subscribes to changes.
  initialize: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    set({ session, user: session?.user ?? null, isLoading: false });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null });
    });
  },

  // D3: login() — provider-specific logic added in Epic 02.
  login: async () => {
    // TODO (Epic 02): handle Apple / Google / email-password providers
    // via a typed discriminated union parameter.
  },

  // D3: logout() — clears session and user from store and SecureStore.
  logout: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null });
  },
});

// ─── Store ────────────────────────────────────────────────────────────────────

// D9: devtools enabled only in dev builds (enabled: __DEV__).
// Logs named action diffs for tracing auth state transitions in DevTools.
export const useAuthStore = create<AuthState>()(
  devtools(authSlice, { name: 'AuthStore', enabled: __DEV__ }),
);
