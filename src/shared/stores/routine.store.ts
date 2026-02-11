import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Routine } from '../models/routine.model';
import { createRoutineService, fetchRoutineByIdService, fetchRoutineService, type CreateRoutine } from '../services/routine.services';

type State = {
  routines: Routine[];
  currentRoutine: Routine | null;

  isLoading: boolean;
  error: string | null;
}

type Actions = {
  addRoutine: (routine: Routine) => void;
  getRoutine: (id: string) => Routine | undefined;
  setCurrentRoutine: (routine: Routine | null) => void;
  updateRoutine: (id: string, data: Partial<Routine>) => void;
  deleteRoutine: (id: string) => void;

  // INFO: Async Actions
  fetchRoutines: (token: string) => Promise<Routine[]>;
  fetchRoutine: (id: string, token: string) => Promise<Routine>;
  createRoutine: (data: CreateRoutine) => Promise<Routine>;
}

export const useRoutineStore = create<State & Actions>()(
  immer((set, get) => ({
    routines: [],
    currentRoutine: null,
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

    setCurrentRoutine: (routine) => {
      set((state: State) => {
        state.currentRoutine = routine;
      });
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

    fetchRoutine: async (id, token) => {
      set((state: State) => { state.isLoading = true; state.error = null; });

      try {
        const routine = await fetchRoutineByIdService(id, token);

        if (!routine) {
          throw new Error('Routine not found');
        }

        set((state: State) => {
          state.currentRoutine = routine;
          state.isLoading = false;
        });

        return routine;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        set((state: State) => { state.error = err.message; state.isLoading = false; });
        console.error('Error fetching routine by ID in routine store:', error);
        throw error;
      }
    },

    createRoutine: async (data) => {
      set((state: State) => { state.isLoading = true; state.error = null; });

      try {
        const routine = await createRoutineService(data);

        set((state: State) => {
          state.currentRoutine = routine;
          state.routines.unshift(routine);
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
