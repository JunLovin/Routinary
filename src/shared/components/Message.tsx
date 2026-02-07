import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export interface Message {
  sender?: 'user' | 'ai';
  content?: string;
  timestamp?: string;
  loading?: boolean;
}

export default function Message(props: Message) {
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

  return (
    <>
      {!props.loading ? (
        <div className={`message flex w-full flex-col ${props.sender === 'user' ? 'items-end!' : 'items-start!'} relative`}>
          <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setTimeout(() => setIsHover(false), 3000)}
            className="bg-zinc-950 justify-end w-sm text-zinc-100 p-2 flex rounded-t-xl items-center"
          >
            <span>{props.content}</span>
          </div>
          <div className="bg-zinc-950 h-10 flex justify-end items-center w-sm rounded-b-xl p-4">
            <span className="text-zinc-600">{formatDate(props.timestamp)}</span>
          </div>
          {isHover && (
            <button
              className={`cursor-pointer p-2 rounded-full absolute top-1/2 -translate-x-1/2 text-zinc-500 ${props.sender === 'user' ? 'left-[51%]' : 'left-[49%]'}`}
              onClick={copyToClipboard}
            >
              {!isCopied ? (
                <Copy />
              ) : (
                <Check />
              )}
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-1.5 px-4 py-6 bg-zinc-950 w-24 rounded-2xl justify-center">
          <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></div>
        </div>
      )}
    </>
  );
}
