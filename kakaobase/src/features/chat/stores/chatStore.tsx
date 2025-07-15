import { create } from 'zustand';

const initialChatState = {
  isLoading: false,
  isStreaming: false,
  streamingChat: '',
  streamId: 0,
};

export interface ChatState {
  isLoading: boolean;
  isStreaming: boolean;
  streamingChat: string;
  streamId: number;
  startLoading: () => void;
  startStreaming: (id: number) => void;
  setStreamingChat: (chunk: string) => void;
  stopStreaming: () => void;
  clear: () => void;
}

export const useChatStore = create<ChatState>()((set) => ({
  ...initialChatState,
  startLoading: () => set({ isLoading: true }),
  startStreaming: (id) =>
    set({
      isLoading: false,
      isStreaming: true,
      streamId: id,
    }),
  setStreamingChat: (chunk) =>
    set((prev) => ({ streamingChat: prev.streamingChat + chunk })),
  stopStreaming: () => set({ isStreaming: false, streamingChat: '' }),
  clear: () => set({ ...initialChatState }),
}));
