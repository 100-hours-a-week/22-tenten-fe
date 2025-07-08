'use client';

import { CircleArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function GoUp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sc = document.querySelector<HTMLElement>('[data-scroll-area]');
    if (!sc) return;

    const handleScroll = () => {
      setIsVisible(sc.scrollTop > 200);
    };

    sc.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => sc.removeEventListener('scroll', handleScroll);
  }, []);

  function goUp() {
    const sc = document.querySelector<HTMLElement>('[data-scroll-area]');
    if (sc && sc.scrollTop > 0) {
      sc.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  if (!isVisible) return null;

  return (
    <div
      onClick={goUp}
      className="flex pointer-events-auto rounded-full cursor-pointer animate-slide-in duration-100 hover:-translate-y-[0.125rem] hover:shadow-md duration-100"
    >
      <div className="w-8 h-8 bg-textColor text-bgColor rounded-full flex items-center justify-center">
        <CircleArrowUp />
      </div>
    </div>
  );
}
