import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import type Message from '../models/message.model';
import Markdown from 'react-markdown';

export function Message(props: Partial<Message & { loading: boolean }>) {
  const [isHover, setIsHover] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    if (props.loading) return;
    try {
      navigator.clipboard.writeText(props.content!).catch((err) => console.error(err));
      setIsCopied(true);

      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      console.error('Error copying in clipboard');
      throw error;
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

  const formattedText = props.content?.replace(/\\n/g, '\n');

  return (
    <>
      <div className={`message flex w-full ${props.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
        <div className="relative flex items-center gap-3">
          {isHover && props.sender === 'USER' && (
            <button
              className="cursor-pointer p-2 rounded-full text-zinc-500 hover:bg-zinc-100 transition-colors shrink-0"
              onClick={copyToClipboard}
            >
              {!isCopied ? <Copy /> : <Check />}
            </button>
          )}

          <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setTimeout(() => setIsHover(false), 500)}
            className="bg-zinc-950 justify-start h-auto w-max overflow-hidden max-w-md text-zinc-100 relative p-2 pb-12 flex rounded-xl items-center"
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
            >
              {!isCopied ? <Copy /> : <Check />}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
