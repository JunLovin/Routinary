import Auth from './pods/auth/Auth';
import ProtectedRoutes from './pods/auth/components/ProtectedRoutes';
import Login from './pods/auth/login/Login';
import Register from './pods/auth/register/Register';
import Main from './pods/main/Main';
import Landing from './pods/landing/Landing';
import Dashboard from './pods/main/dashboard/Dashboard';

const routes = [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/main/:userId',
        element: <Main />,
        children: [
          { path: 'dashboard', element: <Dashboard /> },
        ],
      },
    ],
  },
];

export default routes;
