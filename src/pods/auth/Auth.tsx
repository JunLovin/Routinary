import Background from '@/assets/background.avif';
import { ArrowLeft } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

export default function Auth() {
  return (
    <>
      <section
        className="h-dvh w-full flex justify-between *:w-1/2 items-center bg-neutral-100 max-lg:*:w-full"
      >
        <div
          style={{ backgroundImage: `url(${Background})` }}
          className="background h-full bg-fixed bg-contain bg-no-repeat max-lg:hidden"
        />
        <Link
          to="/"
          className="absolute left-6 top-6 flex items-center gap-1 text-neutral-100 hover:text-white transition-colors font-medium"
        >
          <ArrowLeft size={24} />
        Landing Page
        </Link>
        <div className="outlet flex h-full flex-col justify-center items-center">
          <Outlet />
        </div>
      </section>
    </>
  );
}
