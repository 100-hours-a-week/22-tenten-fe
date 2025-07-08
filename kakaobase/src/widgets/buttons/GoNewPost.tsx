'use client';
import { useUserStore } from '@/entities/users/stores/userStore';
import { PlusCircle } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function GoNewPost() {
  const router = useRouter();
  const path = usePathname();
  const { course, selectedCourse } = useUserStore();
  function navPostEditor() {
    router.push('/post/new');
  }
  return (
    <div
      onClick={navPostEditor}
      className="flex pointer-events-auto rounded-full cursor-pointer hover:-translate-y-[0.125rem] hover:shadow-md duration-100"
    >
      {path.includes('main') &&
        (selectedCourse === course || selectedCourse === 'ALL') && (
          <div className="w-8 h-8 rounded-full bg-textColor text-bgColor flex items-center justify-center">
            <PlusCircle />
          </div>
        )}
    </div>
  );
}
