import { Outlet } from 'react-router-dom';
import Sidenav from './components/Sidenav';
import TopBar from './components/TopBar';

export default function Main() {
  return (
    <>
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
    </>
  );
}
