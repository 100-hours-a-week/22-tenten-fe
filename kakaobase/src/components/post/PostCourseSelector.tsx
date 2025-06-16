'use client';

import useCourseSelectHook from '@/hooks/post/useCourseSelectHook';

export default function PostCourseSelector() {
  const { course, selectedCourse, handleCurrentCourse, courseLabel } =
    useCourseSelectHook();

  return (
    <div className="border-b-[1px] border-textOpacity50 shadow-sm px-6 py-6 mt-20 bg-bgColor text-textColor">
      <select
        name="post-course"
        className="bg-transparent focus:outline-none font-bold"
        value={selectedCourse}
        onChange={handleCurrentCourse}
      >
        <option value="ALL">자유</option>
        {course !== 'ALL' && <option value={course}>{courseLabel}</option>}
      </select>
    </div>
  );
}
