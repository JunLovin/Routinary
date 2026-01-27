import { toTitleCase } from '@/shared/utils/utils';
import { useLocation } from 'react-router-dom';

export default function TopBar() {
  const location = useLocation();
  const pathname = location.pathname.split('/');
  const breadcrum = pathname[pathname.length - 1];

  return (
    <>
      <div className="top-bar w-full h-12 flex items-center justify-center">
        <h1 className="text-slate-100 font-semibold text-lg">{toTitleCase(breadcrum)}</h1>
      </div>
    </>
  );
}
