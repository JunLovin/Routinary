import { Calendar, Check, Copy, Download } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { Message } from '../models/message.model';
import Markdown from 'react-markdown';
import { useRoutineStore } from '../stores/routine.store';
import { useAuth } from '../hooks/useAuth';

export function Message(props: Partial<Message>) {
  const { token } = useAuth();

  const [isHover, setIsHover] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const fetchRoutine = useRoutineStore((state) => state.fetchRoutine);

  const copyToClipboard = async () => {
    try {
      if (!props.content) return;

      await navigator.clipboard.writeText(props.content);
      setIsCopied(true);

      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const handleDownloadICS = () => {
    if (!props.isICS || !props.content) return;

    let url: string | null = null;

    try {
      const blob = new Blob([props.content], { type: 'text/calendar' });
      url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `routinary-calendar-${Date.now().toString()}.ics`;
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the ICS file:', error);
    } finally {
      if (url) {
        URL.revokeObjectURL(url);
      }
    }
  };

  const formatDate = (dateStr: Date | string | undefined) => {
    if (!dateStr) return '';
    const d = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const formattedText = useMemo(() => {
    if (!props.content) return '';

    return props.content.replace(/\\n/g, '\n');
  }, [props.content]);

  useEffect(() => {
    if (props.isICS && props.routineId && token) {
      fetchRoutine(props.routineId, token);
    }
  }, [fetchRoutine, token, props.isICS, props.routineId]);

  return (
    <>
      <div className={`message flex w-full ${props.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
        <div className="relative flex items-center gap-3">
          {isHover && props.sender === 'USER' && (
            <button
              className="cursor-pointer p-2 rounded-full text-zinc-500 hover:bg-zinc-100 transition-colors shrink-0"
              onClick={copyToClipboard}
              aria-label={!isCopied ? 'Copy message' : 'Message copied'}
            >
              {!isCopied ? <Copy /> : <Check />}
            </button>
          )}

          <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setTimeout(() => setIsHover(false), 500)}
            className={`bg-zinc-950 ${props.sender === 'AI' ? '!rounded-tl-none !w-xl' : '!rounded-tr-none w-max max-w-md'} justify-start h-auto overflow-x-auto text-zinc-100 relative p-4 pb-12 flex rounded-2xl items-center`}
          >
            <span className="whitespace-pre-line w-full text-left"><Markdown>{formattedText}</Markdown></span>
            <div className="w-max absolute bottom-2 -right-4 -translate-x-1/2">
              <span className="text-zinc-600">{formatDate(props.createdAt)}</span>
            </div>
          </div>

          {isHover && props.sender === 'AI' && (
            <button
              className="cursor-pointer p-2 rounded-full text-zinc-500 hover:bg-zinc-100 transition-colors shrink-0"
              onClick={copyToClipboard}
              aria-label={!isCopied ? 'Copy message' : 'Message copied'}
            >
              {!isCopied ? <Copy /> : <Check />}
            </button>
          )}
        </div>
      </div>

      {props.isICS && (
        <div className="flex flex-col gap-2 mt-2 group">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-xs p-3 rounded-xl rounded-tl-none shadow-lg">

            <div className="flex items-center gap-3 mb-3">
              <div className="bg-orange-500/10 p-2 rounded-lg">
                <Calendar className="text-orange-500 w-5 h-5" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-zinc-200 text-sm font-semibold truncate">
                  Calendar Event
                </span>
                <span className="text-zinc-500 text-xs uppercase tracking-wider">
                  .ics File
                </span>
              </div>
            </div>

            <button
              onClick={handleDownloadICS}
              className="w-full text-zinc-100 text-xs font-bold py-2.5 cursor-pointer
                   bg-zinc-800 hover:bg-zinc-700 active:scale-[0.98]
                   transition-all duration-200 rounded-lg flex items-center
                   justify-center gap-2 uppercase tracking-tight shadow-inner"
            >
              <Download className="w-4 h-4" />
                Download Event
            </button>
          </div>

          <span className="text-[10px] text-zinc-500 ml-1 italic">
          Ready to import into Google or Apple Calendar
          </span>
        </div>
      )}
    </>
  );
}
