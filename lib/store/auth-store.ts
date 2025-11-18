import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login, signup } from '@/lib/api/auth';
import type { User, LoginCredentials, SignupCredentials, AuthError } from '@/lib/types/api';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  error: AuthError | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  setHasHydrated: (state: boolean) => void;
  clearError: () => void;
  setError: (error: AuthError) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      _hasHydrated: false,
      error: null,

      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },

      clearError: () => {
        set({ error: null });
      },

      setError: (error) => {
        set({ error });
      },

      login: async (credentials) => {
        try {
          set({ error: null });
          const response = await login(credentials);

          set({
            user: response.user,
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
            isAuthenticated: true,
            error: null,
          });
        } catch (error) {
          const authError = error as AuthError;
          set({ error: authError });
          throw authError;
        }
      },

      signup: async (credentials) => {
        try {
          set({ error: null });
          const response = await signup(credentials);

          set({
            user: null, // User will be set after email verification
            accessToken: response.access_token,
            refreshToken: null,
            isAuthenticated: false, // Not fully authenticated until email verified
            error: null,
          });
        } catch (error) {
          const authError = error as AuthError;
          set({ error: authError });
          throw authError;
        }
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
        });
      },

      hasPermission: (permission) => {
        const { user } = get();
        return user?.permissions.includes(permission) ?? false;
      },
    }),
    {
      name: 'sbd-landing-auth',
      partialize: (state) => ({
        user: state.user,
        refreshToken: state.refreshToken,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);