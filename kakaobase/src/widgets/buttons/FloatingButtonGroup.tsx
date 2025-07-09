'use client';

import GoNewPost from './GoNewPost';
import GoUp from './GoUp';

export default function FloatingButtonGroup() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="flex h-screen items-end">
        <div className="hidden lg:flex h-4 flex-col w-[48%]"></div>
        <div className="flex justify-center max-w-[480px] w-full mx-auto lg:ml-12 mb-24">
          <div className="flex flex-col gap-3 w-full items-end mr-8">
            <GoUp />
            <GoNewPost />
          </div>
        </div>
      </div>
    </div>
  );
}
