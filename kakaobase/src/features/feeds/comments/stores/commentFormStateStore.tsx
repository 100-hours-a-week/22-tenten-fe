import { create } from 'zustand';

interface commentFormState {
  isWritingRecomment: boolean;
  commentId: number;
  commentWriter: string;
  setWritingObjectState: (commentState: Partial<commentFormState>) => void;
  clear: () => void;
}

export const commentFormStateStore = create<commentFormState>((set) => ({
  isWritingRecomment: false,
  commentId: 0,
  commentWriter: '',
  setWritingObjectState: (commentState) =>
    set((state) => ({ ...state, ...commentState })),
  clear: () =>
    set({
      isWritingRecomment: false,
      commentId: 0,
      commentWriter: '',
    }),
}));
