import { create } from 'zustand';
import type { User } from '../models/user.model';
import { immer } from 'zustand/middleware/immer';
import { deleteUserService, fetchUserService, updateUserService } from '../services/user.services';

type State = {
  user: User | null;

  isLoading: boolean;
  error: string | null;
}

type Actions = {
  setUser: (user: User | null) => void;

  // INFO: Async functions

  loadUser: (token: string) => Promise<User>;
  updateUser: (userId: string, token: string, data: Partial<User>) => Promise<User>;
  deleteUser: (userId: string, token: string) => Promise<void>;
};

export const useUserStore = create<State & Actions>()(
  immer((set, get) => ({
    user: null,
    isLoading: false,
    error: null,

    setUser: (user) => {
      set((state: State) => {
        state.user = user;
      });
    },

    loadUser: async (token) => {
      try {
        set((state: State) => { state.isLoading = true; state.error = null; });

        const user = await fetchUserService(token);

        set((state: State) => {
          state.user = user;
          state.isLoading = false;
        });

        return user;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        console.error('Error loading user information:', err);
        set((state: State) => {
          state.error = err.message;
          state.isLoading = false;
        });
        throw error;
      }
    },

    updateUser: async (userId, token, data) => {
      try {
        set((state: State) => { state.isLoading = true; state.error = null; });

        const user = get().user;

        if (!user) {
          throw new Error('No user loaded');
        }

        const updatedUser = await updateUserService(userId, token, data);

        set((state: State) => {
          state.user = updatedUser;
          state.isLoading = false;
        });

        return updatedUser;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        console.error('Error updating user information:', err);
        set((state: State) => {
          state.error = err.message;
          state.isLoading = false;
        });
        throw error;
      }
    },

    deleteUser: async (userId, token) => {
      try {
        set((state: State) => { state.isLoading = true; state.error = null; });

        const user = get().user;

        if (!user) {
          throw new Error('No user loaded');
        }

        await deleteUserService(userId, token);

        set((state: State) => {
          state.user = null;
          state.isLoading = false;
        });
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        console.error('Error deleting user account:', err);
        set((state: State) => {
          state.error = err.message;
          state.isLoading = false;
        });
        throw error;
      }
    },
  })),
);
