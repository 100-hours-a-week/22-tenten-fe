import { QueryClient } from '@tanstack/react-query';
import { fiveMin, thirtyMin } from './queryClient';

export default function makeQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { staleTime: fiveMin, gcTime: thirtyMin } },
  });
}
