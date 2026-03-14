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
  const response = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Something went wrong:');
  }

  return await response.json();
};

export const loginService = async (data: LoginFields): Promise<LoginResponse> => {
  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Something went wrong:');
  }

  const res = await response.json();

  return res;
};
