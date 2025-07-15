'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { ToastProvider } from '@/shared/hooks/ToastContext';
import { queryClient } from '@/shared/api/queryClient';
import useSocket from '@/features/socket/hooks/useSocket';

export function Providers({ children }: { children: React.ReactNode }) {
  useSocket();
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
