import { useState, type ChangeEvent } from 'react';
import { Outlet } from 'react-router-dom';

export default function Help() {
  const [search, setSearch] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="h-dvh p-4 w-full text-zinc-100 overflow-y-auto">
        <div className="h-full flex flex-col items-center justify-around text-center px-4">
          <div className="top flex flex-col items-center justify-center gap-6">
            <h1 className="font-semibold text-4xl text-center leading-normal">👋
          Hey, Need Any Help?</h1>

            <input
              type="text"
              value={search}
              onChange={handleChange}
              placeholder="Search for help articles..."
              aria-label="Search help articles"
              className="w-md px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 ring-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
            />
          </div>
          <div className="help-articles flex h-140 flex-col items-start justify-start gap-6 w-full">
            <Outlet context={{ search }} />
          </div>
        </div>
      </div>
    </>
  );
}
