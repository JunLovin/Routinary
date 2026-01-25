import Auth from './pods/auth/Auth';
import ProtectedRoutes from './pods/auth/components/ProtectedRoutes';
import Login from './pods/auth/login/Login';
import Register from './pods/auth/register/Register';
import Main from './pods/main/Main';

const routes = [
  {
    path: '/',
    element: <Main />,
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
    path: '/main',
    element: <ProtectedRoutes />,
  }
];

export default routes;
