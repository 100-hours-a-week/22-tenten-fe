import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserState {
  userId: number;
  email: string;
  name: string;
  nickname: string;
  course: string;
  githubUrl: string;
  profileImageUrl: string;
  setUserInfo: (user: Partial<UserState>) => void;
  reset: () => void;
}
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: 0,
      email: '',
      name: '',
      nickname: '',
      course: '',
      githubUrl: '',
      profileImageUrl: '',
      setUserInfo: (user) => set((state) => ({ ...state, ...user })),
      reset: () =>
        set({
          userId: 0,
          email: '',
          name: '',
          nickname: '',
          course: '',
          githubUrl: '',
          profileImageUrl: '',
        }),
    }),
    {
      name: 'user-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      // whitelist: ['userId','email',…],  // 선택적으로 저장할 필드 지정 가능
    }
  )
);
