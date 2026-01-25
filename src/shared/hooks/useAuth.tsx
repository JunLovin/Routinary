import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../models/user.model';
import type { NavigateFunction } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (userData: { email: string; password: string }, navigate: NavigateFunction) => void;
  register: (userData: { name?: string; email: string, password: string }, navigate: NavigateFunction) => void;
  logout: (navigate: NavigateFunction) => void;
}

const AuthContext = createContext<AuthContextType| null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const isAuthenticated = user !== null && token !== null;

  const register = async (data: { name?: string; email: string; password: string }, navigate: NavigateFunction) => {
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
        return;
      }

      const user = await response.json();
      setUser(user);
      navigate('/auth/login', { replace: true });

      console.log('USER REGISTERED:', user);
    } catch (error) {
      console.error('Something went wrong:', (error as Error).message);
    }
  };

  const login = async (data: { email: string, password: string }, navigate: NavigateFunction) => {
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
        return;
      }

      const responseData = await response.json();

      setToken(responseData.token);
      setUser(responseData.user);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Something went wrong:', (error as Error).message);
    }
  };

  const logout = (navigate: NavigateFunction) => {
    setToken(null);
    setUser(null);
    navigate('/auth/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, token, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth must be wrapped within AuthContextProvider');
  return context;
};
