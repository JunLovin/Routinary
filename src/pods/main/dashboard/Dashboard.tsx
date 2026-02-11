import { useAuth } from '@/shared/hooks/useAuth';
import { createRoutineService } from '@/shared/services/routine.services';
import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import type { Message as MessageType } from '@/shared/components/Message';
import Message from '@/shared/components/Message';
import { SendHorizontal, Paperclip, Image as ImageIcon } from 'lucide-react';

export default function Dashboard() {
  const { token } = useAuth();

  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop =
        textareaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [prompt]);

  const handleSendMessage = async () => {
    if (!prompt.trim()) return;

    try {
      setIsLoading(true);
      const userMessage: MessageType = {
        sender: 'user',
        content: prompt,
        timestamp: new Date().toString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setPrompt('');

      const response = await createRoutineService(prompt, token!);
      if (response) {
        const aiMessage: MessageType = {
          sender: 'ai',
          content: response.icsContent as any,
          timestamp: new Date().toString(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="h-full w-full flex flex-col items-center justify-between pb-8 pt-4">
      <div className="messages-container w-full max-w-4xl flex flex-col gap-6 overflow-y-auto px-4 custom-scrollbar">
        {messages.length > 0 ? (
          messages.map((m, i) => (
            <>
              <Message key={i} sender={m.sender} content={m.content} timestamp={m.timestamp} />
              {isLoading && <Message loading={isLoading} />}
            </>
          ))
        ) : (
          <div className="h-[60dvh] flex items-center justify-center">
            <h2 className="text-zinc-500 text-3xl font-medium text-center max-w-md">
              What routine are we architecting today?
            </h2>
          </div>
        )}
      </div>

      <div className="w-full max-w-4xl px-4 mt-4">
        <div className="relative bg-zinc-900 rounded-3xl border border-zinc-800 p-2 focus-within:ring-1 focus-within:ring-zinc-700 transition-all">
          <textarea
            ref={textareaRef}
            rows={1}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write your perfect day..."
            className="w-full bg-transparent resize-none outline-none text-zinc-100 py-3 pl-4 pr-30 max-h-50 min-h-14 placeholder:text-zinc-500 block"
          />

          <div className="absolute right-3 bottom-3 flex items-center gap-1">
            <button className="p-2 cursor-pointer text-zinc-400 hover:text-zinc-100 transition-colors">
              <ImageIcon size={20} />
            </button>
            <button className="p-2 cursor-pointer text-zinc-400 hover:text-zinc-100 transition-colors">
              <Paperclip size={20} />
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!prompt.trim()}
              className="ml-1 cursor-pointer p-2.5 bg-zinc-100 text-zinc-950 rounded-full disabled:bg-zinc-800 disabled:text-zinc-600 transition-all active:scale-95"
            >
              <SendHorizontal size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
        <p className="text-[10px] text-zinc-600 text-center mt-3">
          AI could have errors, please review before do something.
        </p>
      </div>
    </section>
  );
}
