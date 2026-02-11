import type { Routine } from '../models/routine.model';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchRoutineService = async (token: string): Promise<Routine[]> => {
  try {
    const response = await fetch(`${API_URL}/api/routines/me`, {
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

export const createRoutineService = async (prompt: string, token: string): Promise<Routine> => {
  try {
    if (!API_URL) {
      console.warn('No API URL found in .env variables');
    }
    const response = await fetch(`${API_URL}/api/routines/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      console.error('Error generating create routine');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating create routine:', error);
    throw error;
  }
};
