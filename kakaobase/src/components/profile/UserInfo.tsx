'use client';
import { User } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function UserInfo() {
  const [image, setImage] = useState('');
  useEffect(() => {
    const imageUrl = localStorage.getItem('profile');
    if (imageUrl) setImage(imageUrl);
  }, []);
  return (
    <div className="flex bg-containerColor px-8 py-4 my-4 rounded-xl flex flex-col items-center gap-4 w-full max-w-sm">
      {image === '' || image === 'null' ? (
        <User width={120} height={120} className="rounded-xl" />
      ) : (
        <Image
          alt="프로필 이미지"
          width={120}
          height={120}
          src={image}
          className="rounded-xl"
        />
      )}
      <div className="flex flex-col items-center">
        <div className="font-bold">김도현</div>
        <div className="text-sm">daisy.kim</div>
      </div>
      <div className="text-sm">
        <div>카카오테크 부트캠프 2기</div>
        <a
          href="https://github.com/okiidokim"
          className="cursor-pointer underline"
        >
          github.com/okiidokim
        </a>
      </div>
    </div>
  );
}
