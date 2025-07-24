'use client';
import { courseMapEngToKor } from '@/shared/lib/courseMap';
import { Profile } from '../types/Profile';
import { User } from 'lucide-react';
import Image from 'next/image';
import CountInfo from './CountInfo';

export default function UserInfo({ data }: { data: Profile }) {
  return (
    <div className="flex flex-col gap-4 mt-4 px-9 pt-6 pb-4 rounded-xl bg-containerColor items-center w-full">
      <div className="flex gap-4 w-full">
        <div className="relative w-16 h-16 rounded-xl aspect-square border-innerContainerColor border-2">
          {data.image_url === '' || data.image_url === null ? (
            <User
              height={60}
              className="flex object-contain justify-self-center"
            />
          ) : (
            <Image
              alt="프로필 이미지"
              fill
              src={data.image_url}
              sizes="(max-width : 480px) 64px, 13vw"
              className="object-cover rounded-xl"
            />
          )}
        </div>
        <div className="flex flex-col text-xs gap-1">
          <div className="font-bold text-sm">
            {data.name} / {data.nickname}
          </div>
          <div>{courseMapEngToKor[data.class_name]}</div>
          <a href={data.github_url} className="cursor-pointer underline">
            {data.github_url}
          </a>
        </div>
      </div>
      <CountInfo data={data} />
    </div>
  );
}
