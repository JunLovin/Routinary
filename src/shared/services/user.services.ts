import type { User } from '../models/user.model';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUserService = async (token: string): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching user information');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching user information:', error);
    throw error;
  }
};

export const updateUserService = async (userId: string, token: string, data: Partial<User>): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error updating user information');
    }

    const updatedUser = await response.json();

    return updatedUser;
  } catch (error) {
    console.error('Error updating user information:', error);
    throw error;
  }
};

export const deleteUserService = async (userId: string, token: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error deleting user account');
    }
  } catch (error) {
    console.error('Error deleting user account:', error);
    throw error;
  }
};
