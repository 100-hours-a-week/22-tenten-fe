'use client';
import { useEffect } from 'react';
import MyChat from './MyChat';
import BotChat from './BotChat';
import LoadingSmall from '@/shared/ui/LoadingSmall';
import { useInfiniteQuery } from '@tanstack/react-query';
import { chatQueries } from '../api/chatQueries';
import { Chat } from '../types/Chats';

export default function ChatList() {
  const { data, isPending } = useInfiniteQuery(chatQueries.chat());

  useEffect(() => {
    const sc = document.querySelector<HTMLElement>('[data-scroll-area]');
    sc?.scrollTo({ top: sc.scrollHeight, behavior: 'auto' });
  }, []);

  if (!data)
    return (
      <div className="flex flex-col w-full h-screen">채팅 내역이 없습니다.</div>
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
