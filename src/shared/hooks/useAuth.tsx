import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '@/shared/models/user.model';
import type { NavigateFunction } from 'react-router-dom';
import { loginService, registerService, type LoginFields, type RegisterFields } from '@/shared/services/auth.services';

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

  const register = async (data: RegisterFields, navigate: NavigateFunction) => {
    try {
      const user = await registerService(data);
      if (!user) return;
      setUser(user);
      navigate('/auth/login', { replace: true });
    } catch (error) {
      console.error('Register failed:', error);
      throw error;
    }
  };

  const login = async (data: LoginFields, navigate: NavigateFunction) => {
    try {
      const { token, user } = await loginService(data);
      if (!token || !user) {
        return;
      }
      setToken(token);
      setUser(user);
      navigate(`/main/${user.id}/dashboard`, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
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
