'use client';
import { useLayoutEffect, useRef } from 'react';
import MyChat from './MyChat';
import BotChat from './BotChat';
import LoadingSmall from '@/shared/ui/LoadingSmall';
import { useInfiniteQuery } from '@tanstack/react-query';
import { chatQueries } from '../api/chatQueries';
import { Chat } from '../types/Chat';
import Image from 'next/image';
import { useChatStore } from '../stores/chatStore';
import useScrollHook from '@/shared/hooks/useScrollHook';

export default function ChatList() {
  const {
    data,
    isPending,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    fetchNextPage,
  } = useInfiniteQuery(chatQueries.chat());
  const { isStreaming, isLoading, streamingChat } = useChatStore();
  const { observerRef } = useScrollHook({
    hasNextPage,
    isFetchingNextPage,
    refetch,
    fetchNextPage,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const prevPageCountRef = useRef<number>();
  const prevScrollHeightRef = useRef<number>();

  useLayoutEffect(() => {
    const sc = scrollRef.current;
    if (!sc || !data) return;

    const currentPageCount = data.pages.length;
    const newScrollHeight = sc.scrollHeight;
    const prevPageCount = prevPageCountRef.current;
    const prevScrollHeight = prevScrollHeightRef.current ?? newScrollHeight;

    if (prevPageCount === undefined) {
      sc.scrollTop = newScrollHeight;
    } else if (currentPageCount > prevPageCount) {
      sc.scrollTop = newScrollHeight - prevScrollHeight;
    } else {
      sc.scrollTop = newScrollHeight;
    }

    prevPageCountRef.current = currentPageCount;
    prevScrollHeightRef.current = newScrollHeight;
  }, [data, isStreaming, isLoading]);

  if (!data || data.pages.flat().length === 0)
    return (
      <div className="flex flex-col w-full h-screen items-center text-sm justify-center gap-4">
        <div className="relative flex w-24 h-24 object-fit">
          <Image src="/roro.png" alt="로로프로필" fill className="rounded-xl" />
        </div>
        로로와 채팅을 시작하세요.
      </div>
    );
  if (isPending)
    return (
      <div className="flex flex-col w-full h-screen">
        <LoadingSmall />
      </div>
    );
  return (
    <div
      className="flex-grow flex flex-col h-screen items-center w-full overflow-y-auto"
      ref={scrollRef}
      data-scroll-area
    >
      <div className="flex flex-col w-full h-screen">
        <div className="h-[1px]" ref={observerRef}></div>
        {data.pages
          .slice()
          .reverse()
          .flat()
          .map((chat: Chat) =>
            chat.sender_id === 1213 ? (
              <BotChat
                key={chat.chat_id}
                text={chat.content}
                time={chat.timestamp}
              />
            ) : (
              <MyChat
                key={chat.chat_id}
                text={chat.content}
                time={chat.timestamp}
              />
            )
          )}
        {isLoading && (
          <BotChat text="로딩 중..." time={new Date().toISOString()} />
        )}
        {isStreaming && (
          <BotChat text={streamingChat} time={new Date().toISOString()} />
        )}
      </div>
    </div>
  );
}
