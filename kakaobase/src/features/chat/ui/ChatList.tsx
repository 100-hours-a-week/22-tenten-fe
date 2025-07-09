'use client';
import { useEffect, useState } from 'react';
import MyChat from './MyChat';
import BotChat from './BotChat';

export default function ChatList() {
  const [isMine, setMine] = useState(true);

  useEffect(() => {
    const sc = document.querySelector<HTMLElement>('[data-scroll-area]');
    sc?.scrollTo({ top: sc.scrollHeight, behavior: 'auto' });
  }, []);

  return (
    <div className="flex flex-col py-4">
      <BotChat />
      <BotChat />
      <BotChat />
      <BotChat />
      <BotChat />
      <BotChat />
      <BotChat />
      <BotChat />
      <BotChat />
      <BotChat />
      <BotChat />
      <BotChat />
      <BotChat />
      <BotChat />
      <BotChat />
      <BotChat />
      <BotChat />
      <BotChat />
      <MyChat />
    </div>
  );
}
