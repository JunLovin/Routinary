import type { Routine } from '../models/routine.model';

export type CreateRoutine = {
  title: string;
  description?: string;
  token: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export const fetchRoutineService = async (token: string): Promise<Routine[]> => {
  try {
    const response = await fetch(`${API_URL}/routines/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Error fetching routines');
    }

    const data = await response.json();

    return data || [];
  } catch (error) {
    console.error('Error fetching routines:', error);
    throw error;
  }
};

export const fetchRoutineByIdService = async (id: string, token: string): Promise<Routine | undefined> => {
  try {
    const response = await fetch(`${API_URL}/routines/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Error fetching routine');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching routine:', error);
    throw error;
  }
};

export const createRoutineService = async (data: CreateRoutine): Promise<Routine> => {
  try {
    if (!API_URL) {
      console.warn('No API URL found in .env variables');
    }
    const response = await fetch(`${API_URL}/routines/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${data.token}`,
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description || '',
      }),
    });

    if (!response.ok) {
      console.error('Error generating create routine');
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error generating create routine:', error);
    throw error;
  }
};
