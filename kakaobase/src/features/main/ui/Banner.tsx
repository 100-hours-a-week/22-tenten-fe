'use client';

import useBannerHook from '../hooks/useBannerHook';
import dynamic from 'next/dynamic';

const BannerItem = dynamic(() => import('./BannerItem'));

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
            <BannerItem item={item} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
