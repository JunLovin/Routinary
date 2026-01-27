import { useAuth } from '@/shared/hooks/useAuth';
import { toTitleCase } from '@/shared/utils/utils';
import { ChevronUp, PanelRight, SquarePen } from 'lucide-react';

export default function Sidenav() {
  const { user } = useAuth();

  return (
    <>
      <nav className="w-full h-dvh bg-zinc-950 p-4 text-zinc-400 flex flex-col gap-6">
        <div className="nav-top w-full flex flex-col justify-center items-center gap-6">
          <div className="sidenav-btn w-full flex items-center justify-end">
            <button className="rounded-full cursor-pointer hover:bg-zinc-800 transition p-2 hover:text-orange-500">
              <PanelRight />
            </button>
          </div>
          <div className="new-chat-btn w-full">
            <button className="w-full hover:bg-zinc-800 border border-zinc-400/20 rounded-lg p-2 cursor-pointer hover:text-orange-500 transition flex items-center justify-start gap-2">
              <SquarePen />
              New Chat
            </button>
          </div>
        </div>
        <div className="chats flex flex-col gap-4 flex-1">
          <span className="text-sm font-semibold select-none">Your chats</span>
          <div className="chats-rows flex flex-col gap-2 items-center justify-center">
          </div>
        </div>
        <div className="user select-none border-t border-t-zinc-400/20 flex justify-center items-center w-full">
          <div className="container flex gap-2 items-center w-full relative hover:bg-zinc-800 rounded-lg transition p-1 mt-2 cursor-pointer">
            <ChevronUp className="absolute right-2 top-5" size={20} />
            <div className="user-avatar select-none">
              <span className="text-sm font-semibold bg-zinc-800 size-14 rounded-full flex items-center justify-center">user</span>
            </div>
            <div className="user-info flex flex-col gap-1 items-start justify-center w-full overflow-x-hidden">
              <span className="text-slate-100 text-sm">{toTitleCase(user?.name || 'User')}</span>
              <span className="text-sm">{user?.email}</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
