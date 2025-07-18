'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import Toast from '../ui/Toast';

interface ToastContextType {
  showToast: (message: string) => void;
  openToast: (message: string) => void;
  hideToast: () => void;
  label: string;
  isOpen: boolean;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
  hideToast: () => {},
  openToast: () => {},
  label: '',
  isOpen: false,
});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState('');

  const showToast = useCallback((message: string) => {
    setLabel(message);
    setIsOpen(true);

    setTimeout(() => setIsOpen(false), 3000);
  }, []);

  const openToast = useCallback((message: string) => {
    setLabel(message);
    setIsOpen(true);
  }, []);

  const hideToast = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ToastContext.Provider
      value={{ showToast, openToast, hideToast, label, isOpen }}
    >
      {children}
      <Toast />
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
