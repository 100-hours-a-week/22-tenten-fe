import { Course } from '@/shared/types/Course';
import { courseMapReverse } from '@/shared/lib/courseMap';
import { useUserStore } from '@/entities/users/stores/userStore';

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
