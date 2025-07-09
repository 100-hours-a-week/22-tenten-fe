import { create } from 'zustand';

interface commentFormState {
  isRecommentOpen: boolean;
  isWritingRecomment: boolean;
  commentId: number;
  commentWriter: string;
  setWritingObjectState: (commentState: Partial<commentFormState>) => void;
  writeRecomment: ({ id, name }: { id: number; name: string }) => void;
  stopRecomment: () => void;
  showRecomment: ({ id }: { id: number }) => void;
  hideRecomment: () => void;
  clear: () => void;
}

export const recommentFormStateStore = create<commentFormState>((set) => ({
  isRecommentOpen: false,
  isWritingRecomment: false,
  commentId: 0,
  commentWriter: '',
  setWritingObjectState: (commentState) =>
    set((state) => ({ ...state, ...commentState })),

  writeRecomment: ({ id, name }) =>
    set((state) => ({
      ...state,
      isRecommentOpen: true,
      isWritingRecomment: true,
      commentId: id,
      commentWriter: name,
    })),

  stopRecomment: () =>
    set((state) => ({
      ...state,
      isWritingRecomment: false,
      commentId: 0,
      commentWriter: '',
    })),

  showRecomment: ({ id }) =>
    set((state) => ({
      ...state,
      commentId: id,
      isRecommentOpen: true,
    })),

  hideRecomment: () =>
    set((state) => ({
      ...state,
      isRecommentOpen: false,
    })),

  clear: () =>
    set(() => ({
      isWritingRecomment: false,
      isRecommentOpen: false,
      commentId: 0,
      commentWriter: '',
    })),
}));
