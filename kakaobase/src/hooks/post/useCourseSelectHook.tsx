import { Course } from '@/types/shared/Course';
import { courseMapReverse } from '@/lib/courseMap';
import { useUserStore } from '@/stores/userStore';

export default function useCourseSelectHook() {
  const { course, selectedCourse, setUserInfo } = useUserStore();
  const courseLabel = course === 'ALL' ? '자유' : courseMapReverse[course];

  const handleCurrentCourse = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCourse = e.target.value as Course;
    setUserInfo({
      selectedCourse: newCourse,
    });
  };

  return {
    courseLabel,
    course,
    selectedCourse,
    handleCurrentCourse,
  };
}
