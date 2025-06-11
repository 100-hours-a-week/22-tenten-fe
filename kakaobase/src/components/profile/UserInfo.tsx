'use client';
import { Profile } from '@/types/user/Profile';
import { User } from 'lucide-react';
import Image from 'next/image';

export default function UserInfo({ data }: { data: Profile }) {
  return (
    <div className="flex bg-containerColor px-8 py-4 mt-4 rounded-xl flex flex-col items-center gap-4 w-full max-w-sm">
      {data.image_url === '' || data.image_url === null ? (
        <User width={120} height={120} className="rounded-xl" />
      ) : (
        <Image
          alt="프로필 이미지"
          width={120}
          height={120}
          src={data.image_url}
          className="rounded-xl"
        />
      )}
      <div className="flex flex-col items-center">
        <div className="font-bold">{data.name}</div>
        <div className="text-sm">{data.nickname}</div>
      </div>
      <div className="flex flex-col items-center text-xs">
        <div>{data.class_name}</div>
        <a
          href="https://github.com/okiidokim"
          className="cursor-pointer underline"
        >
          {data.github_url}
        </a>
      </div>
    </div>
  );
}
