import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { fetchMessagesService, sendMessageService } from '../services/message.services';
import type { Message } from '../models/message.model';

type State = {
  currentRoutineId: string | null;
  messages: Message[];

  isLoading: boolean;
  isSending: boolean;
  error: string | null;
}

type Actions = {
  addMessage: (message: Message) => void;
  updateMessage: (tempId: string, message: Message) => void;
  removeMessage: (messageId: string) => void;
  setRoutineId: (id: string | null) => void;
  clearMessages: () => void;

  // INFO: Async Actions
  loadMessages: (routineId: string, token: string) => Promise<Message[]>;
  sendMessage: (routineId: string, sender: 'USER' | 'AI', content: string, token: string, userId?: string) => Promise<Message>;
}

export const useChatStore = create<State & Actions>()(
  immer((set) => ({
    currentRoutineId: null,
    messages: [],
    isLoading: false,
    isSending: false,
    error: null,

    addMessage: (message) => {
      set((state: State) => {
        state.messages.push(message);
      });
    },

    setRoutineId: (id) => {
      set((state: State) => {
        state.currentRoutineId = id;
      });
    },

    updateMessage: (tempId, message) => {
      set((state: State) => {
        const index = state.messages.findIndex((m) => m.id === tempId);
        if (index !== -1) {
          state.messages[index] = message;
        }
      });
    },

    removeMessage: (messageId) => {
      set((state: State) => {
        state.messages = state.messages.filter((m) => m.id !== messageId);
      });
    },

    clearMessages: () => {
      set((state: State) => {
        state.messages = [];
      });
    },

    loadMessages: async (routineId, token) => {
      try {
        set((state: State) => { state.isLoading = true; state.error = null; });

        const messages = await fetchMessagesService(routineId, token);

        set((state: State) => {
          state.messages = messages;
          state.currentRoutineId = routineId;
          state.isLoading = false;
        });

        return messages as Message[];
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        console.error('Error fetching messages:', err);
        set((state) => { state.error = err.message; state.isLoading = false; });
        throw error;
      }
    },

    sendMessage: async (routineId, sender, content, token, userId) => {
      try {
        if (sender === 'USER' && !userId) {
          throw new Error('User ID is required to send a message');
        }
        set((state: State) => { state.isSending = true; state.error = null; });

        let aiMessage = await sendMessageService({ routineId, sender, content, token, userId });

        if (aiMessage.content.includes('BEGIN:VCALENDAR')) {
          aiMessage = {
            ...aiMessage,
            isICS: true,
          };
        }

        set((state: State) => {
          state.messages.push(aiMessage);
          state.isSending = false;
        });

        return aiMessage;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        console.error('Error sending message:', err);
        set((state: State) => { state.error = err.message; state.isSending = false; });
        throw error;
      }
    },
  })),
);
