import { create } from 'zustand';

interface SignupStore {
  email: string;
  isVerified: boolean;
  password: string;
  setSignupStep1Info: (user: Partial<SignupStore>) => void;
  clear: () => void;
}

export const useSignupStore = create<SignupStore>((set) => ({
  email: '',
  isVerified: false,
  password: '',
  setSignupStep1Info: (info) => set((state) => ({ ...state, ...info })),
  clear: () =>
    set({
      email: '',
      isVerified: false,
      password: '',
    }),
}));
