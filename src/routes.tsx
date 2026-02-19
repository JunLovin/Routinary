import Auth from './pods/auth/Auth';
import ProtectedRoutes from './pods/auth/components/ProtectedRoutes';
import Login from './pods/auth/login/Login';
import Register from './pods/auth/register/Register';
import Main from './pods/main/Main';
import Landing from './pods/landing/Landing';
import Chat from './pods/main/chat/Chat';
import Help from './pods/main/help/Help';
import Categories from './pods/main/help/components/Categories';
import Article from './pods/main/help/components/articles/Article';
import Settings from './pods/main/settings/Settings';
import Account from './pods/main/settings/account/Account';
import Appearance from './pods/main/settings/appearance/Appearance';
import Security from './pods/main/settings/security/Security';
import { Navigate } from 'react-router-dom';

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
          {
            path: 'help',
            element: <Help />,
            children: [
              {
                path: '',
                element: <Categories />,
              },
              {
                path: ':categoryId',
                element: <Categories />,
              },
            ],
          },
          {
            path: 'article/:articleId',
            element: <Article />,
          },
          {
            path: 'chat',
            children: [
              { path: 'new', element: <Chat /> },
              { path: ':chatId', element: <Chat /> },
            ],
          },
          {
            path: 'settings',
            element: <Settings />,
            children: [
              { index: true, element: <Navigate to="account" replace /> },
              { path: 'account', element: <Account /> },
              { path: 'appearance', element: <Appearance /> },
              { path: 'security', element: <Security /> },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
