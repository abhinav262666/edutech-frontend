import { create } from 'zustand';
import { Message } from '@/types';

interface ChatState {
  sessionId: string | null;
  messages: Message[];
  isLoading: boolean;
  ncertContent: string;

  setSessionId: (id: string) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  setLoading: (loading: boolean) => void;
  setNcertContent: (content: string) => void;
  loadChatHistory: (sessionId: string) => void;
  saveChatHistory: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  sessionId: null,
  messages: [],
  isLoading: false,
  ncertContent: '',

  setSessionId: (id) => set({ sessionId: id }),

  addMessage: (message) => {
    set((state) => ({ messages: [...state.messages, message] }));
    get().saveChatHistory();
  },

  clearMessages: () => set({ messages: [] }),

  setLoading: (loading) => set({ isLoading: loading }),

  setNcertContent: (content) => set({ ncertContent: content }),

  loadChatHistory: (sessionId) => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`chat_${sessionId}`);
      if (stored) {
        try {
          const messages = JSON.parse(stored);
          set({ messages, sessionId });
        } catch (error) {
          console.error('Failed to load chat history:', error);
        }
      }
    }
  },

  saveChatHistory: () => {
    const { sessionId, messages } = get();
    if (typeof window !== 'undefined' && sessionId) {
      localStorage.setItem(`chat_${sessionId}`, JSON.stringify(messages));
    }
  },
}));
