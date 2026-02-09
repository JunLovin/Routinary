import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Routine } from '../models/routine.model';
import { createRoutineService, fetchRoutineService } from '../services/routine.services';

type State = {
  routines: Routine[];
  isLoading: boolean;
  error: string | null;
}

type Action = {
  addRoutine: (routine: Routine) => void;
  getRoutine: (id: string) => Routine | undefined;
  updateRoutine: (id: string, data: Partial<Routine>) => void;
  deleteRoutine: (id: string) => void;

  // INFO: Async Actions
  fetchRoutines: (token: string) => Promise<Routine[]>;
  createRoutine: (prompt: string, token: string) => Promise<Routine>;
}

export const useRoutineStore = create<State & Action>()(
  immer((set, get) => ({
    routines: [],
    isLoading: false,
    error: null,

    addRoutine: (routine) => {
      set((state: State) => {
        state.routines.push(routine);
      });
    },

    getRoutine: (id) => {
      return get().routines.find((r) => r.id === id);
    },

    updateRoutine: (id, data) => {
      set((state: State) => {
        const routine = state.routines.find((r) => r.id === id);
        if (routine) {
          Object.assign(routine, data);
        }
      });
    },

    deleteRoutine: (id) => {
      set((state: State) => {
        state.routines = state.routines.filter((r) => r.id !== id);
      });
    },

    fetchRoutines: async (token) => {
      set((state: State) => { state.isLoading = true; state.error = null; });

      try {
        const routines = await fetchRoutineService(token);

        set((state: State) => {
          state.routines = routines;
          state.isLoading = false;
        });

        return routines;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        set((state: State) => { state.error = err.message; state.isLoading = false; });
        console.error('Error fetching routines in routine store:', error);
        throw error;
      }
    },

    createRoutine: async (prompt, token) => {
      set((state: State) => { state.isLoading = true; state.error = null; });

      try {
        const routine = await createRoutineService(prompt, token);

        set((state: State) => {
          state.routines.push(routine);
          state.isLoading = false;
        });

        return routine;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        set((state: State) => { state.error = err.message; state.isLoading = false; });
        console.error('Error creating routine in routine store:', error);
        throw error;
      }
    },
  })),
);
