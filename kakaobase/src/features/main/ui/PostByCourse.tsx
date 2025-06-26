'use client';

import { useUserStore } from '@/entities/users/stores/userStore';
import { courseMapEngToKor } from '@/shared/lib/courseMap';
import { Course, CourseList } from '@/shared/types/Course';
import { useRouter } from 'next/navigation';

export default function PostByCourse() {
  const { setUserInfo } = useUserStore();
  const router = useRouter();
  function navMain({ course }: { course: string }) {
    setUserInfo({ selectedCourse: course as Course });
    router.push('/main');
  }
  return (
    <div className="w-full">
      <div className="mx-6 my-4">
        <div className="text-lg font-bold">게시판</div>
        <div className="bg-containerColor rounded-xl">
          <div className="p-4 flex items-center flex-col gap-2">
            {CourseList.map((opt, idx) => (
              <div
                className="flex gap-4 text-md cursor-pointer"
                key={idx}
                onClick={() => navMain({ course: opt })}
              >
                <div>{opt === 'ALL' ? '자유' : courseMapEngToKor[opt]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
