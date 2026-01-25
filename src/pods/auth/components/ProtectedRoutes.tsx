import { useAuth } from '@/shared/hooks/useAuth';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function ProtectedRoutes() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login', { replace: true });
    }
  }, []);

  return <Outlet />;
}
