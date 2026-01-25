import Background from '@/assets/background.avif';
import { Outlet } from 'react-router-dom';

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
        <div className="outlet flex h-full flex-col justify-center items-center">
          <Outlet />
        </div>
      </section>
    </>
  );
}
