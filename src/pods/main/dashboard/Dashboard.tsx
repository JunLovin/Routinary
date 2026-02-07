import { useAuth } from '@/shared/hooks/useAuth';
import type { Routine } from '@/shared/models/routine.model';
import { createRoutineService } from '@/shared/services/routine.services';
import { useState } from 'react';
import type { Message as MessageType } from '@/shared/components/Message';
import Message from '@/shared/components/Message';

export default function Dashboard() {
  const { token } = useAuth();

  const [prompt, setPrompt] = useState('');
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);

  const handleSendMessage = async () => {
    if (!prompt.trim()) return;

    setMessages((prev) => {
      const newMessage: MessageType = {
        sender: 'user',
        content: prompt,
        timestamp: new Date().toLocaleTimeString('en-EN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      };

      return ([...prev, newMessage]);
    });

    const routine = await createRoutineService(prompt, token!);

    if (!routine) {
      console.error('Something went wrong saving routine');
      return;
    }

    setMessages((prev) => {
      const newAIMessage: MessageType = {
        sender: 'ai',
        content: routine.icsContent as any,
        timestamp: new Date().toLocaleTimeString('en-EN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      };

      return ([...prev, newAIMessage]);
    });

    setRoutine(routine.icsContent);
  };

  return (
    <>
      <section className="new-chat h-full w-full flex flex-col items-center justify-center gap-10">
        <div className="messages-container h-[75dvh] w-2xl flex flex-col gap-4 overflow-y-auto">
          {messages.length > 0 ? (
            <>
              {messages.map((m, i) => (
                <Message
                  key={i}
                  sender={m.sender}
                  content={m.content}
                  timestamp={m.timestamp}
                />
              ))}
            </>
          ) : (
            <h2 className="text-slate-100 text-4xl font-semibold tracking-wide max-w-[45ch] mx-auto text-center">Small habits, big impact. What routine are we architecting today?</h2>
          )}
        </div>
        <div className="input w-2xl bg-zinc-950 rounded-xl h-max">
          <textarea
            className="w-full resize-none min-h-24 rounded-xl p-4 outline-0 placeholder:text-zinc-600 text-zinc-100"
            placeholder="Write your perfect day"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="cursor-pointer p-2 rounded-xl bg-zinc-950 text-zinc-100"
          >
          Send
          </button>
        </div>
      </section>
    </>
  );
}
