'use client';

import GoNewPost from './GoNewPost';
import GoUp from './GoUp';

export default function FloatingButtonGroup() {
  return (
    <div className="sticky inset-0 pointer-events-none h-screen">
      <div className="flex">
        <div className="hidden lg:flex flex-col w-[48%] lg:w-0"></div>
        <div className="flex justify-center w-[480px] w-full mx-auto self-start my-6">
          <div className="flex flex-col gap-4 w-full items-end mr-8">
            <GoUp />
            <GoNewPost />
          </div>
        </div>
      </div>
    </div>
  );
}
