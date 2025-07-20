import { infiniteQueryOptions } from '@tanstack/react-query';
import getChatList from './chatList';

export const chatQueries = {
  all: () => ['chat'],
  chatsKey: () => [...chatQueries.all(), 'list'],
  chat: () =>
    infiniteQueryOptions({
      queryKey: chatQueries.chatsKey(),
      queryFn: ({ pageParam }: { pageParam?: number }) =>
        getChatList({ limit: 22, cursor: pageParam }),
      getNextPageParam: (lastPage) => lastPage.at(0)?.chat_id,
      initialPageParam: undefined,
    }),
};
