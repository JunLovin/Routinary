import { useRoutineStore } from '@/shared/stores/routine.store';
import { KBarAnimator, KBarPortal, KBarPositioner, KBarSearch, KBarResults, useMatches, useKBar } from 'kbar';
import { MessageSquare, CircleQuestionMark, Home, LogOut, Settings, SquarePen, Search, Command } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function RenderResults() {
  const { results } = useMatches();

  const iconMap: Record<string, React.ReactNode> = {
    'new-chat': <SquarePen size={18} />,
    'help-center': <CircleQuestionMark size={18} />,
    'landing': <Home size={18} />,
    'logout': <LogOut size={18} />,
    'settings': <Settings size={18} />,
  };

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div className="kbar-group-name">{item}</div>
        ) : (
          <div
            className="kbar-result"
            aria-selected={active}
          >
            <div className="kbar-result-name">
              <div className="kbar-result-icon">
                {iconMap[item.id] || <MessageSquare size={18} />}
              </div>
              <span>{item.name}</span>
            </div>
            {item.shortcut?.length && (
              <div className="kbar-result-shortcut">
                {item.shortcut.map((sc) => (
                  <kbd key={sc} className="kbar-result-kbd">
                    {sc}
                  </kbd>
                ))}
              </div>
            )}
          </div>
        )
      }
    />
  );
}

export default function TopBar() {
  const location = useLocation();
  const pathname = location.pathname.split('/');
  const breadcrum = pathname[pathname.length - 1];
  const { query } = useKBar();
  const [isMac, setIsMac] = useState(false);

  const currentRoutine = useRoutineStore((state) => state.currentRoutine);

  useEffect(() => {
    setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent));
  }, []);

  const generateTitle = () => {
    switch (breadcrum) {
      case 'new':
        return 'New Chat';
      case 'help':
        return 'Help Center';
      case 'settings':
        return 'Settings';
      case 'account':
        return 'Account Settings';
      case 'appearance':
        return 'Appearance Settings';
      case 'security':
        return 'Security Settings';
      default:
        if (currentRoutine) {
          return currentRoutine.title;
        }
        break;
    }
  };

  return (
    <>
      <div className="top-bar w-full h-12 flex items-center justify-between relative px-4">
        <h1 className="text-slate-100 font-semibold text-lg flex-1">{generateTitle()}</h1>

        <button
          onClick={() => query.toggle()}
          className="flex items-center gap-3 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-orange-500/30 rounded-lg transition-all cursor-pointer group max-w-md"
        >
          <Search size={16} className="text-zinc-400 group-hover:text-orange-500 transition-colors shrink-0" />
          <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
            Search a command...
          </span>
          <div className="flex items-center gap-1 ml-auto">
            <kbd className="px-2 py-1 bg-zinc-900 border border-zinc-600 rounded text-xs text-zinc-400 font-semibold flex items-center gap-1">
              {isMac ? (
                <>
                  <Command size={12} />
                  <span>K</span>
                </>
              ) : (
                <>
                  <span>Ctrl</span>
                  <span>K</span>
                </>
              )}
            </kbd>
          </div>
        </button>

        <KBarPortal>
          <KBarPositioner className="kbar-positioner">
            <KBarAnimator className="kbar-animator">
              <KBarSearch className="kbar-search" placeholder="Type a command or search..." />
              <div className="kbar-results">
                <RenderResults />
              </div>
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>
      </div>
    </>
  );
}
