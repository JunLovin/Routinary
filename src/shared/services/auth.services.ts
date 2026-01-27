import type { User } from '@/shared/models/user.model';

export interface LoginResponse {
  token: string;
  user: User;
}

export interface LoginFields {
  email: string;
  password: string;
}

export type RegisterFields = LoginFields & { name?: string };

export const registerService = async (data: RegisterFields): Promise<User> => {
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
    console.error(error);
    throw error;
  }
};

export const loginService = async (data: LoginFields): Promise<LoginResponse> => {
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
    console.error(error);
    throw error;
  }
};
