'use client';

import { CircleArrowUp } from 'lucide-react';

export default function GoUp() {
  function goUp() {
    const sc = document.querySelector<HTMLElement>('[data-scroll-area]');
    sc?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="sticky inset-0 pointer-events-none">
      <div className="flex">
        <div className="hidden lg:flex flex-col w-[48%]"></div>
        <div className="flex justify-center max-w-[480px] w-full mx-auto lg:ml-12 lg:self-start">
          <div
            onClick={goUp}
            className="absolute pointer-events-auto bottom-8 right-8 cursor-pointer"
          >
            <div className="w-8 h-8 bg-textColor text-bgColor rounded-full flex items-center justify-center">
              <CircleArrowUp />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
