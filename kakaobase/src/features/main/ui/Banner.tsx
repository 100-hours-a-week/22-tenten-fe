'use client';

import Image from 'next/image';
import useBannerHook from '../hooks/ useBannerHook';

export default function Banner() {
  const { extended, withTransition, onTransitionEnd, current } =
    useBannerHook();

  return (
    <div className="w-full">
      <div className="bg-containerColor m-6 rounded-xl overflow-hidden">
        <div
          className={`flex transform${
            withTransition
              ? 'transition-transform duration-500 ease-in-out'
              : ''
          }`}
          style={{ transform: `translateX(-${current * 100}%)` }}
          onTransitionEnd={onTransitionEnd}
        >
          {extended.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-full flex items-center p-4 gap-6"
            >
              <div className="relative w-40 aspect-video">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 160px"
                  className="object-cover rounded"
                />
              </div>
              <div className="mt-2 text-sm flex flex-col">
                <span className="font-bold">[{item.id}조]</span>
                <a
                  href={item.url}
                  className="underline break-all whitespace-pre-wrap"
                >
                  {item.name} 바로가기
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
