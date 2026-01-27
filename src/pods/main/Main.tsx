import { Outlet } from 'react-router-dom';
import Sidenav from './components/Sidenav';
import TopBar from './components/TopBar';

export default function Main() {
  return (
    <>
      <section className="h-dvh flex items-center bg-zinc-900">
        <div className="sidenav w-83">
          <Sidenav />
        </div>
        <div className="outlet h-full w-full p-4 overflow-hidden">
          <div className="top-bar">
            <TopBar />
          </div>
          <div className="main-content h-full w-full">
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
}
