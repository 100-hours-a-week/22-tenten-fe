import { create } from 'zustand';
import { Chat } from '../types/Chats';

export interface ChatState {
  isLoading: boolean;
  isStreaming: boolean;
  chatList: Chat[];
  streamingChat: string;
  streamingId: string;
  setChatState: (
    updater: Partial<ChatState> | ((prev: ChatState) => Partial<ChatState>)
  ) => void;
  clear: () => void;
}
export const useChatStore = create<ChatState>()((set) => ({
  isLoading: false,
  isStreaming: false,
  chatList: [],
  streamingChat: '',
  streamingId: '',
  setChatState: (updater) =>
    set((state) => {
      const updates = typeof updater === 'function' ? updater(state) : updater;
      return { ...state, ...updates };
    }),
  clear: () =>
    set({
      isLoading: false,
      isStreaming: false,
      streamingChat: '',
      chatList: [],
      streamingId: '',
    }),
}));
