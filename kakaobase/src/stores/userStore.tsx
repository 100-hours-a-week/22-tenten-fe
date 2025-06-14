import { Course } from '@/types/shared/Course';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserState {
  userId: number;
  name: string;
  nickname: string;
  course: Course;
  selectedCourse: Course;
  githubUrl: string;
  imageUrl: string;
  setUserInfo: (user: Partial<UserState>) => void;
  reset: () => void;
}
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: 0,
      name: '',
      nickname: '',
      course: 'ALL',
      selectedCourse: 'ALL',
      githubUrl: '',
      imageUrl: '',
      setUserInfo: (user) => set((state) => ({ ...state, ...user })),
      reset: () =>
        set({
          userId: 0,
          name: '',
          nickname: '',
          course: 'ALL',
          selectedCourse: 'ALL',
          githubUrl: '',
          imageUrl: '',
        }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userId: state.userId,
        name: state.name,
        nickname: state.nickname,
        course: state.course,
        selectedCourse: state.selectedCourse,
        githubUrl: state.githubUrl,
        imageUrl: state.imageUrl,
      }),
    }
  )
);
