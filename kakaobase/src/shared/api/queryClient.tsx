import { QueryClient } from '@tanstack/react-query';

export const fiveMin = 5 * 60 * 1000;
export const thirtyMin = 30 * 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: fiveMin,
      gcTime: thirtyMin,
    },
  },
});
