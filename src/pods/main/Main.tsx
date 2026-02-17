import { Outlet, useNavigate } from 'react-router-dom';
import { KBarProvider, type Action } from 'kbar';
import { useMemo } from 'react';
import Sidenav from './components/Sidenav';
import TopBar from './components/TopBar';
import { useAuth } from '@/shared/hooks/useAuth';
import { useRoutineStore } from '@/shared/stores/routine.store';

export default function Main() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const setCurrentRoutine = useRoutineStore((state) => state.setCurrentRoutine);

  const actions: Action[] = useMemo(
    () => [
      {
        id: 'new-chat',
        name: 'New Chat',
        shortcut: ['n', 'c'],
        keywords: 'new chat conversation routine create start',
        section: 'Navigation',
        perform: () => {
          setCurrentRoutine(null);
          navigate(`/main/${user?.id}/chat/new`);
        },
      },
      {
        id: 'help-center',
        name: 'Help Center',
        shortcut: ['g', 'h'],
        keywords: 'help articles support documentation guide',
        section: 'Navigation',
        perform: () => {
          navigate(`/main/${user?.id}/help`);
        },
      },
      {
        id: 'landing',
        name: 'Go to Landing Page',
        shortcut: ['g', 'l'],
        keywords: 'home landing page main',
        section: 'Navigation',
        perform: () => {
          navigate('/');
        },
      },
      {
        id: 'settings',
        name: 'Settings',
        shortcut: ['g', 's'],
        keywords: 'settings preferences configuration account',
        section: 'Navigation',
        perform: () => {
          navigate(`/main/${user?.id}/settings`);
        },
      },
      {
        id: 'logout',
        name: 'Logout',
        shortcut: ['l', 'o'],
        keywords: 'logout signout sign out exit leave',
        section: 'Account',
        perform: () => {
          logout(navigate);
        },
      },
    ],
    [navigate, user?.id, logout, setCurrentRoutine],
  );

  return (
    <>
      <KBarProvider actions={actions}>
        <section className="h-dvh flex items-center bg-zinc-900 overflow-hidden font-inter">
          <div className="sidenav">
            <Sidenav />
          </div>
          <div className="outlet h-full w-full p-4">
            <div className="top-bar">
              <TopBar />
            </div>
            <div className="main-content h-full w-full overflow-y-hidden">
              <Outlet />
            </div>
          </div>
        </section>
      </KBarProvider>
    </>
  );
}
