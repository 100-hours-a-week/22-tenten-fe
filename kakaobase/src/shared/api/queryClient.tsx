import { QueryClient } from '@tanstack/react-query';

const fiveMin = 5 * 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      gcTime: fiveMin,
    },
  },
});
