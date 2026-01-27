import { ArrowRight, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <header className="w-4xl h-18 items-center bg-white font-medium px-4 rounded-xl flex justify-between z-10 max-xl:w-[95%] max-xl:mx-auto">
        <div className="header-logo text-black">
          <Link to="/">
            <CalendarDays size={36} />
          </Link>
        </div>
        <div className="header-links flex items-center gap-6 *:hover:text-neutral-700 *:transition max-sm:hidden">
          <Link to="/">
            Features
          </Link>
          <Link to="/">
            Formats
          </Link>
          <Link to="https://github.com/JunLovin/Routinary" target="_blank">
            GitHub
          </Link>
          <Link to="/">
            FAQ
          </Link>
        </div>
        <div className="header-cta">
          <Link to="/auth/login">
            <button className="rounded-md h-10 relative pl-4 pr-1 cursor-pointer py-2 bg-linear-to-r from-orange-400 to-orange-600 text-white flex gap-4 items-center">
        Get Started
              <div className="next-icon w-max h-max rounded-md bg-white p-1 text-orange-400">
                <ArrowRight />
              </div>
            </button>
          </Link>
        </div>
      </header>
    </>
  );
}
