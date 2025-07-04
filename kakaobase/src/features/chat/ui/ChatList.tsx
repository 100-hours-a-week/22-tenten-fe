'use client';
import { useEffect, useState } from 'react';
import MyChat from './MyChat';
import BotChat from './BotChat';
import MessageInput from './MessageInput';

export default function ChatList() {
  const [isMine, setMine] = useState(true);
  useEffect(() => {
    const sc = document.querySelector<HTMLElement>('[data-scroll-area]');
    sc?.scrollTo({ top: sc.scrollHeight, behavior: 'auto' });
  }, []);
  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto">
      <div
        className="flex flex-col w-full h-screen overflow-y-auto"
        data-scroll-area
      >
        <BotChat />
      </div>
      <MessageInput />
    </div>
  );
}
