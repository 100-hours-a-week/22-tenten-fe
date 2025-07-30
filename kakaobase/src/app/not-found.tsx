'use client';
import useRoutings from '@/shared/hooks/useRoutings';
import SubmitButton from '@/shared/ui/button/SubmitButton';
import Image from 'next/image';

export default function NotFound() {
  const { goHome } = useRoutings();

  return (
    <div className="flex w-full h-screen flex-col items-center justify-center gap-6">
      <div className="w-40 h-40 relative flex">
        <Image
          src="/sad_logo.png"
          alt="not-found"
          fill
          className="object-contain"
          sizes="(max-width:480px) 160px, 40vw"
        />
      </div>
      <div className="text-lg font-bold text-center flex flex-col">
        <div>404 NOT FOUND</div>
        <div>해당 페이지를 찾을 수 없습니다</div>
      </div>
      <SubmitButton text="메인 페이지로 가기" onClick={goHome} />
    </div>
  );
}
