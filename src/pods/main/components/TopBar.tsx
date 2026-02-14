import { useRoutineStore } from '@/shared/stores/routine.store';
import { Github } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function TopBar() {
  const location = useLocation();
  const pathname = location.pathname.split('/');
  const breadcrum = pathname[pathname.length - 1];

  const currentRoutine = useRoutineStore((state) => state.currentRoutine);

  const generateTitle = () => {
    if (breadcrum === 'new') {
      return 'New Chat';
    }

    if (currentRoutine) {
      return currentRoutine.title;
    }

    return '';
  };

  useEffect(() => {
    generateTitle();
  }, [currentRoutine]);

  return (
    <>
      <div className="top-bar w-full h-12 flex items-center justify-center relative">
        <h1 className="text-slate-100 font-semibold text-lg">{generateTitle()}</h1>
        <Link
          to="https://github.com/JunLovin/Routinary"
          target="_blank"
          className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <Github size={18} className="inline-block mr-1" />
          View on GitHub
        </Link>
      </div>
    </>
  );
}
