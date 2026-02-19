import { useAuth } from '@/shared/hooks/useAuth';
import { useRoutineStore } from '@/shared/stores/routine.store';
import { toTitleCase } from '@/shared/utils/utils';
import { ChevronUp, PanelRight, SquarePen, MessageSquare, CircleQuestionMark } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Dropdown from '@/shared/components/ui/dropdown/Dropdown';
import { useChatStore } from '@/shared/stores/chat.store';

export default function Sidenav() {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isSending = useChatStore((state) => state.isSending);
  const currentRoutine = useRoutineStore((state) => state.currentRoutine);
  const routines = useRoutineStore((state) => state.routines);

  const setCurrentRoutine = useRoutineStore((state) => state.setCurrentRoutine);
  const fetchRoutines = useRoutineStore((state) => state.fetchRoutines);
  const fetchRoutine = useRoutineStore((state) => state.fetchRoutine);

  const [isOpen, setIsOpen] = useState(true);

  const sidenavRef = useRef<HTMLElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const pathname = location.pathname;

  useEffect(() => {
    if (!token) {
      navigate('/auth/login', { replace: true });
      return;
    }
    fetchRoutines(token);
  }, [fetchRoutines, user, token]);

  useEffect(() => {
    if (!user) {
      logout(navigate);
    }
  }, [logout, navigate, user]);

  const goToRoutine = async (id: string) => {
    if (!isOpen) return;
    if (!token) return;

    try {
      const routine = await fetchRoutine(id, token);
      if (routine) {
        navigate(`/main/${user?.id}/chat/${routine.id}`);
      }
    } catch (error) {
      console.error('Error fetching routine', error);
    }
  };

  const handleNewChat = () => {
    setCurrentRoutine(null);
    navigate(`/main/${user?.id}/chat/new`);
  };

  const toggleSidenav = () => {
    const sidenav = sidenavRef.current;
    const textContent = textContentRef.current;

    if (!sidenav || !textContent) return;

    if (isOpen) {
      const tl = gsap.timeline({
        onComplete: () => setIsOpen(false),
      });

      tl.to(textContent, {
        opacity: 0,
        duration: 0.15,
        ease: 'power2.out',
      })
        .to(sidenav, {
          width: '5rem',
          duration: 0.25,
          ease: 'power3.inOut',
        }, '+=0.05');

    } else {
      setIsOpen(true);

      const tl = gsap.timeline();

      tl.to(sidenav, {
        width: '16rem',
        duration: 0.25,
        ease: 'power3.inOut',
      })
        .to(textContent, {
          opacity: 1,
          duration: 0.2,
          ease: 'power2.in',
        }, '+=0.1');
    }
  };

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <nav
      ref={sidenavRef}
      className="h-dvh bg-zinc-950 text-zinc-400 flex flex-col transition-all relative border-r border-zinc-800"
      style={{ width: '16rem' }}
    >
      <div className="p-3 flex flex-col gap-3 border-b border-zinc-800">
        <div className="flex items-center justify-end">
          <button
            onClick={toggleSidenav}
            className={`rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors p-2 hover:text-orange-500 ${!isOpen ? 'w-full flex items-center justify-center' : ''}`}
            title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-expanded={isOpen}
          >
            <PanelRight size={20} className="transition-all" />
          </button>
        </div>

        <button
          onClick={handleNewChat}
          className={`w-full hover:bg-zinc-800 border border-zinc-700/50 rounded-lg p-2.5 cursor-pointer hover:text-orange-500 hover:border-orange-500/30 ${pathname.includes('new') ? 'bg-zinc-800 text-orange-500 border-orange-500/30' : ''} transition-all flex items-center ${isOpen ? 'justify-start' : 'justify-center'} gap-3`}
          title="New Chat"
          disabled={isSending}
        >
          <SquarePen size={20} className="shrink-0" />
          {isOpen && <span className="text-sm font-medium whitespace-nowrap">New Chat</span>}
        </button>

        <Link
          to={`/main/${user?.id}/help`}
          className={`w-full hover:bg-zinc-800 border border-zinc-700/50 rounded-lg p-2.5 cursor-pointer ${pathname.includes('help') ? 'bg-zinc-800 text-orange-500 border-orange-500/30' : ''} hover:text-orange-500 hover:border-orange-500/30 transition-all flex items-center ${isOpen ? 'justify-start' : 'justify-center'} gap-3 ${isSending ? 'pointer-events-none' : ''} `}
          title="Help Center"
          onClick={(e) => {
            if (isSending) {
              e.preventDefault();
            }
          }}
          aria-disabled={isSending}
          tabIndex={isSending ? -1 : 0}
        >
          <CircleQuestionMark size={20} className="shrink-0" />
          {isOpen && <span className="text-sm font-medium whitespace-nowrap">Help Center</span>}
        </Link>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div ref={textContentRef} className="flex-1 flex flex-col p-3">
          <div className="flex-1 flex flex-col gap-3 min-h-0">
            <span className="text-xs select-none font-semibold text-zinc-500 uppercase tracking-wider px-2">
              Your Chats
            </span>

            <div className="flex-1 overflow-y-auto overflow-x-hidden max-h-190 pb-2">
              <div className="flex flex-col gap-1.5">
                {routines.length === 0 ? (
                  <div className="flex items-center justify-center py-8">
                    <p className="text-zinc-600 text-sm text-center px-4">
                      Start your first routine!
                    </p>
                  </div>
                ) : (
                  routines.map((routine) => (
                    <button
                      key={routine.id}
                      onClick={() => goToRoutine(routine.id)}
                      className={`w-full ${!isOpen ? 'cursor-default!' : ''} select-none text-left hover:bg-zinc-800 rounded-lg p-2.5 cursor-pointer hover:text-orange-500 transition-all flex items-center gap-3 group ${
                        currentRoutine?.id === routine.id
                          ? 'bg-zinc-800 text-orange-500'
                          : 'text-zinc-400'
                      } ${isSending ? 'pointer-events-none' : ''}`}
                      title={!isOpen ? '' : routine.title}
                      disabled={isSending}
                    >
                      <MessageSquare size={18} className="shrink-0" />
                      <span className="text-sm truncate flex-1">
                        {routine.title}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dropdown
        className="p-3 border-t border-zinc-800"
        verticalPosition="above"
        matchTriggerWidth
        disabled={isSending}
      >
        <Dropdown.Trigger
          className={`flex items-center w-full gap-3 hover:bg-zinc-800 rounded-lg transition-all p-2 cursor-pointer group relative ${isOpen ? '' : 'justify-center'}`}
        >
          <div className="relative shrink-0">
            <div
              className="size-10 select-none rounded-full bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-semibold text-sm"
              draggable={false}
            >
              {getUserInitials()}
            </div>
            <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-zinc-950"></div>
          </div>

          {isOpen && (
            <div ref={(el) => {
              if (el && !isOpen) {
                gsap.set(el, { opacity: 0 });
              }
            }} className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-100 truncate">
                {toTitleCase(user?.name || 'User')}
              </p>
              <p className="text-xs text-zinc-500 truncate">
                {user?.email || ''}
              </p>
            </div>
          )}

          {isOpen && (
            <ChevronUp size={16} className="shrink-0 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
          )}

        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item
            onClick={() => {
              logout(navigate);
              setCurrentRoutine(null);
            }}
          >
              Logout
          </Dropdown.Item>
          <Dropdown.Item
            className="w-full"
            as={Link}
            onClick={() => setCurrentRoutine(null)}
            to={`/main/${user?.id}/settings/account`}
          >
              Settings
          </Dropdown.Item>
          <Dropdown.Item
            className="w-full"
            as={Link}
            to="/"
          >
              Landing
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </nav>
  );
}
