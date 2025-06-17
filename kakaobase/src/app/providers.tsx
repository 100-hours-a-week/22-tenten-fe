'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { ToastProvider } from './ToastContext';
import Toast from '@/shared/ui/Toast';
import { queryClient } from '@/shared/api/queryClient';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toast />
        </QueryClientProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
