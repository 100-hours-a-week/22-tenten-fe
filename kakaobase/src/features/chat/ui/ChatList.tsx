'use client';
import { useState } from 'react';
import MyChat from './MyChat';
import YourChat from './YourChat';

export default function ChatList() {
  const [isMine, setMine] = useState(true);
  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto">
      <MyChat />
      <YourChat />
      <MyChat />
      <YourChat />
      <MyChat />
      <YourChat />
      {isMine ? <MyChat /> : <YourChat />}
      {isMine ? <MyChat /> : <YourChat />}
      {isMine ? <MyChat /> : <YourChat />}
      {isMine ? <MyChat /> : <YourChat />}
      {isMine ? <MyChat /> : <YourChat />}
      {isMine ? <MyChat /> : <YourChat />}
      {/* 메시지 전송하는 부분 */}
    </div>
  );
}
