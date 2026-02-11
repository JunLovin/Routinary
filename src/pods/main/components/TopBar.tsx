import { useRoutineStore } from '@/shared/stores/routine.store';
import { useLocation } from 'react-router-dom';

export default function TopBar() {
  const location = useLocation();
  const pathname = location.pathname.split('/');
  const breadcrum = pathname[pathname.length - 1];

  const { routines } = useRoutineStore((state) => state);

  const generateTitle = () => {
    if (breadcrum === 'new') {
      return 'New Chat';
    }

    const routine = routines.find((r) => r.id === breadcrum);
    if (routine) {
      return routine.title;
    }
  };

  return (
    <>
      <div className="top-bar w-full h-12 flex items-center justify-center">
        <h1 className="text-slate-100 font-semibold text-lg">{generateTitle()}</h1>
      </div>
    </>
  );
}
