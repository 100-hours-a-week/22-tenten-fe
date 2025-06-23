'use client';
import { courseMapEngToKor } from '@/shared/lib/courseMap';
import { Profile } from '../types/Profile';
import { User } from 'lucide-react';
import Image from 'next/image';
import CountInfo from './CountInfo';

export default function UserInfo({ data }: { data: Profile }) {
  const imgWidth = 60;
  return (
    <div className="flex flex-col gap-4 mt-4 px-9 pt-6 pb-4 rounded-xl bg-containerColor items-center w-full">
      <div className="flex gap-4 w-full">
        {data.image_url === '' || data.image_url === null ? (
          <User
            width={imgWidth}
            height={imgWidth}
            className="rounded-xl border-innerContainerColor border-2 p-3"
          />
        ) : (
          <Image
            alt="프로필 이미지"
            width={imgWidth}
            height={imgWidth}
            src={data.image_url}
            className="rounded-xl aspect-square border-innerContainerColor border-2"
          />
        )}
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
