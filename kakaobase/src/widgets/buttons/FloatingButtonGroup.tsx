'use client';
import GoNewPost from './GoNewPost';
import GoUp from './GoUp';

export default function FloatingButtonGroup() {
  return (
    <div className="sticky inset-0 pointer-events-none">
      <div className="flex">
        <div className="hidden lg:flex flex-col w-[48%]"></div>
        <div className="flex justify-center max-w-[480px] w-full mx-auto lg:ml-12 lg:self-start">
          <div className="absolute flex flex-col bottom-8 right-8 gap-4">
            <GoUp />
            <GoNewPost />
          </div>
        </div>
      </div>
    </div>
  );
}
