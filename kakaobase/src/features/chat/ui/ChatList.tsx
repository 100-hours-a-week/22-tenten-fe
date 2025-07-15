'use client';
import { useEffect } from 'react';
import MyChat from './MyChat';
import BotChat from './BotChat';
import LoadingSmall from '@/shared/ui/LoadingSmall';
import { useInfiniteQuery } from '@tanstack/react-query';
import { chatQueries } from '../api/chatQueries';
import { Chat } from '../types/Chat';
import Image from 'next/image';

export default function ChatList() {
  const { data, isPending } = useInfiniteQuery(chatQueries.chat());
  useEffect(() => {
    const sc = document.querySelector<HTMLElement>('[data-scroll-area]');
    sc?.scrollTo({ top: sc.scrollHeight, behavior: 'auto' });
  }, []);

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
    <div className="flex flex-col w-full h-screen">
      {data.pages
        .flat()
        .map((chat: Chat) =>
          chat.sender_id === 1213 ? (
            <BotChat key={chat.chat_id} />
          ) : (
            <MyChat key={chat.chat_id} />
          )
        )}
    </div>
  );
}
