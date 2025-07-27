'use client';
import { useUserStore } from '@/entities/users/stores/userStore';
import useRoutings from '@/shared/hooks/useRoutings';
import { PlusCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function GoNewPost() {
  const { goEditor } = useRoutings();
  const path = usePathname();
  const { course, selectedCourse } = useUserStore();

  if (!path.includes('main')) return null;

  return (
    <div
      onClick={goEditor}
      className="flex pointer-events-auto rounded-full cursor-pointer hover:-translate-y-[0.125rem] hover:shadow-md duration-100"
    >
      {(selectedCourse === course || selectedCourse === 'ALL') && (
        <div className="w-8 h-8 rounded-full bg-textColor text-bgColor flex items-center justify-center">
          <PlusCircle />
        </div>
      )}
    </div>
  );
}
