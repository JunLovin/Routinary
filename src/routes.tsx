import Auth from './pods/auth/Auth';
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
];

export default routes;
