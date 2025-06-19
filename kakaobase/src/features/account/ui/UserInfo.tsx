'use client';
import { Profile } from '../types/Profile';
import { User } from 'lucide-react';
import Image from 'next/image';

export default function UserInfo({ data }: { data: Profile }) {
  return (
    <div className="flex bg-containerColor p-4 mt-4 rounded-xl justify-center items-center gap-4 max-w-sm">
      {data.image_url === '' || data.image_url === null ? (
        <User width={120} height={120} className="rounded-xl" />
      ) : (
        <Image
          alt="프로필 이미지"
          width={120}
          height={120}
          src={data.image_url}
          className="rounded-xl aspect-square"
        />
      )}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="font-bold">{data.name}</div>
          <div className="text-sm">{data.nickname}</div>
        </div>
        <div className="flex flex-col text-xs">
          <div>{data.class_name}</div>
          <a href={data.github_url} className="cursor-pointer underline">
            {data.github_url}
          </a>
        </div>
      </div>
    </div>
  );
}
