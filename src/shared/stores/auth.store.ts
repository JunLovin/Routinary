import type { NavigateFunction } from 'react-router-dom';
import type { User } from '../models/user.model';
import { immer } from 'zustand/middleware/immer';
import { loginService, registerService } from '../services/auth.services';
import { create } from 'zustand';

// TODO: Implement it (without bugs)

type State = {
  user: User | null;
  token: string | null;
}

type Actions = {
  login: (data: { email: string; password: string; }, navigate: NavigateFunction) => void;
  register: (data: { name?: string; email: string; password: string; }, navigate: NavigateFunction) => void;
  logout: (navigate: NavigateFunction) => void;
}

type Getters = {
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<State & Actions & Getters>()(
  immer((set, get) => ({
    user: null as User | null,
    token: null as string | null,

    isAuthenticated: () => {
      const state = get();
      return state.user !== null && state.token !== null;
    },

    login: async (data, navigate) => {
      try {
        const { token, user } = await loginService(data);
        if (!token || !user) {
          throw new Error('Invalid login response');
        }
        set((state: State) => {
          state.user = user;
          state.token = token;
        });
        navigate(`/main/${user.id}/chat/new`, { replace: true });
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Login failed');
        console.error(err.message);
        throw error;
      }
    },

    register: async (data, navigate) => {
      try {
        const user = await registerService(data);
        if (!user) return;

        set((state: State) => {
          state.user = user;
        });
        navigate('/auth/login', { replace: true });
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Register failed');
        console.error(err.message);
        throw error;
      }
    },

    logout: (navigate) => {
      set((state: State) => {
        state.token = null;
        state.user = null;
      });
      navigate('/auth/login', { replace: true });
    },
  })),
);
