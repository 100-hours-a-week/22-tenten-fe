'use client';

import { Course, CourseList } from '@/shared/types/Course';
import useCourseSelectHook from '../hooks/useCourseSelectHook';
import clsx from 'clsx';
import { courseMapEngToKor } from '@/shared/lib/courseMap';

function Button({
  label,
  course,
  onSelect,
  isActive,
}: {
  label: string;
  course: Course;
  onSelect: (course: Course) => void;
  isActive: boolean;
}) {
  return (
    <div
      className={clsx(
        'rounded-full cursor-pointer whitespace-nowrap px-4 py-1 text-sm',
        isActive
          ? 'bg-myBlue text-textOnBlue'
          : 'text-textColor hover:bg-textOpacity50'
      )}
      onClick={() => onSelect(course)}
    >
      {label}
    </div>
  );
}

export default function PostCourseSelector() {
  const { selectedCourse, handleCurrentCourse } = useCourseSelectHook();

  const onCourseSelect = (course: Course) => {
    const fakeEvent = {
      target: { value: course },
    } as React.ChangeEvent<HTMLSelectElement>;
    handleCurrentCourse(fakeEvent);
  };

  return (
    <div className="shadow-sm px-6 pt-4 bg-bgColor text-textColor">
      <div
        className="flex gap-2 bg-containerColor px-1 py-1 rounded-full
                      overflow-x-scroll overflow-y-hidden scrollbar-hide flex-nowrap"
      >
        {CourseList.map((opt) => (
          <Button
            key={opt}
            label={opt === 'ALL' ? '자유' : courseMapEngToKor[opt]}
            course={opt}
            onSelect={onCourseSelect}
            isActive={opt === selectedCourse}
          />
        ))}
      </div>
    </div>
  );
}
