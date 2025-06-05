'use client';
import { useRouter } from 'next/navigation';
import SubmitButton from '../common/button/SubmitButton';
import CountInfo from './CountInfo';
import UserInfo from './UserInfo';
import { useEffect, useState } from 'react';
import Toggle from './Toggle';
import PostList from '../post/list/PostList';

export default function Wrapper() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) setUserId(id);
  });
  function navEdit() {
    router.push(`${userId}/edit`);
  }
  return (
    <div className="flex flex-col items-center self-center text-textColor min-h-0 mb-[4rem] mt-[5rem] gap-4 ">
      <UserInfo />
      <CountInfo />
      <div className="flex gap-4">
        <SubmitButton text="프로필 편집" onClick={navEdit} />
        <SubmitButton text="프로필 공유" />
      </div>
      <div className="flex flex-col gap-2 items-center min-h-0">
        <Toggle />
        <div
          data-scroll-area
          className="flex overflow-y-auto flex-grow flex-col"
        >
          <PostList />
        </div>
      </div>
    </div>
  );
}
