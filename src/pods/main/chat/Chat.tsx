import { useAuth } from '@/shared/hooks/useAuth';
import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { Message as MessageComponent } from '@/shared/components/Message';
import { SendHorizontal, Paperclip, Image as ImageIcon, Mic } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useChatStore } from '@/shared/stores/chat.store';
import { useRoutineStore } from '@/shared/stores/routine.store';
import type { Message } from '@/shared/models/message.model';
import MessageLoadingSpinner from '@/shared/components/MessageLoadingSpinner';
import { useSpeechToText } from '@/shared/hooks/useSpeechToText';

export default function Chat() {
  const { userId, chatId } = useParams<{ userId: string; chatId?: string }>();
  const { token } = useAuth();
  const { isListening, transcript, toggleRecording, setTranscript } = useSpeechToText();
  const navigate = useNavigate();
  const location = useLocation();

  const initialMessage = location.state?.initialMessage || '';

  const messages = useChatStore((state) => state.messages);
  const isSending = useChatStore((state) => state.isSending);

  const addMessage = useChatStore((state) => state.addMessage);
  const removeMessage = useChatStore((state) => state.removeMessage);
  const loadMessages = useChatStore((state) => state.loadMessages);
  const sendMessage = useChatStore((state) => state.sendMessage);
  const clearMessages = useChatStore((state) => state.clearMessages);

  const createRoutine = useRoutineStore((state) => state.createRoutine);

  const [prompt, setPrompt] = useState(initialMessage);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const hasSentInitialMessage = useRef(false);

  useEffect(() => {
    if (isListening && transcript) {
      setPrompt(transcript);
    }
  }, [transcript, isListening]);

  useEffect(() => {
    if (initialMessage && !hasSentInitialMessage.current) {
      hasSentInitialMessage.current = true;
      handleSendMessage(initialMessage);
    }
  }, [initialMessage]);

  useEffect(() => {
    const load = async () => {
      try {
        if (!chatId || !token) {
          navigate('/auth/login', { replace: true });
          return;
        };
        await loadMessages(chatId, token);
      } catch (error) {
        console.error('Error loading messages:', error);
        throw error;
      }
    };

    if (!chatId) {
      clearMessages();
      return;
    };
    load();
  }, [chatId, clearMessages, loadMessages, navigate, token]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [prompt]);

  const handleSendMessage = async (message?: string) => {
    if (!(message || prompt).trim() && !isListening) return;

    const tempId = `temp-${Date.now()}`;
    const messageContent = prompt;

    const optimisticMessage: Message = {
      id: tempId,
      routineId: chatId || 'temp',
      content: message ? message : messageContent,
      sender: 'USER',
      createdAt: new Date(),
    };

    addMessage(optimisticMessage);
    setPrompt('');

    try {
      let actualRoutineId = chatId;

      if (!chatId) {
        const routine = await createRoutine({
          title: `New Chat ${Date.now().toString()}`,
          token: token!,
        });
        actualRoutineId = routine.id;
        navigate(`/main/${userId}/chat/${actualRoutineId}`);
      }

      await sendMessage(
        actualRoutineId!,
        'USER',
        message ? message : messageContent,
        token!,
        userId,
      );
    } catch (error) {
      console.error('Error sending message:', error);
      removeMessage(tempId);
      setPrompt(messageContent);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    setPrompt('');
  }, [chatId]);

  return (
    <section className="h-full w-full flex flex-col items-center justify-between pb-8 pt-4">
      <div
        ref={messagesContainerRef}
        className="messages-container w-full max-w-4xl flex flex-col gap-6 overflow-y-auto px-4 custom-scrollbar"
      >
        {messages.length > 0 ? (
          messages.map((m) => (
            <MessageComponent key={m.id} {...m} />
          ))
        ) : (
          <div className="h-[60dvh] flex items-center justify-center">
            <h2 className="text-zinc-500 text-4xl font-medium text-center w-xl select-none">
              What routine are we architecting today?
            </h2>
          </div>
        )}
        {isSending && <MessageLoadingSpinner />}
      </div>

      <div className="w-full max-w-4xl px-4 mt-4">
        <div className="relative bg-zinc-950 rounded-3xl ring ring-zinc-800 p-2 focus-within:ring-1 focus-within:ring-zinc-700 transition-all">
          <textarea
            ref={textareaRef}
            rows={1}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)! || setTranscript(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? 'Listening...' : 'Type your message here...'}
            className="w-full bg-transparent resize-none outline-none text-zinc-100 py-3 pl-4 pr-30 max-h-50 min-h-14 placeholder:text-zinc-500 block"
          />

          <div className="absolute right-3 bottom-3 flex items-center gap-1">
            <button
              disabled={true}
              aria-label="Attach Image"
              className="p-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <ImageIcon size={20} />
            </button>
            <button
              disabled={true}
              aria-label="Attach File"
              className="p-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <Paperclip size={20} />
            </button>
            <button
              aria-label="Send Audio"
              onClick={toggleRecording}
              className="p-2 cursor-pointer text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <Mic size={20} />
            </button>
            <button
              onClick={() => handleSendMessage()}
              disabled={!prompt.trim() && !isListening}
              className="ml-1 cursor-pointer p-2.5 bg-zinc-100 text-zinc-950 rounded-full disabled:bg-zinc-800 disabled:text-zinc-600 transition-all active:scale-95"
              aria-label="Send Message"
            >
              <SendHorizontal size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
        <p className="text-[10px] text-zinc-600 text-center mt-3">
          AI could have errors, please review before doing something.
        </p>
      </div>
    </section>
  );
}
