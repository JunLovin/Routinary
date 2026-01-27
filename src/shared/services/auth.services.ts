import type { User } from '../models/user.model';

interface LoginResponse {
  token: string;
  user: User;
}

export const registerService = async (data: { name?: string; email: string; password: string }): Promise<User> => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Something went wrong:', errorData);
      throw errorData;
    }

    const resJson: Promise<User> = await response.json();
    return resJson;
  } catch (error) {
    throw error;
  }
};

export const loginService = async (data: { email: string; password: string }): Promise<LoginResponse> => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Something went wrong:', errorData);
      throw errorData;
    }

    const resJson: Promise<LoginResponse> = await response.json();
    return resJson;
  } catch (error) {
    throw error;
  }
};
