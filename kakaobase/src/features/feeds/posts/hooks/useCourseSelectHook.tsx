import { Course } from '@/shared/types/Course';
import { useUserStore } from '@/entities/users/stores/userStore';

export default function useCourseSelectHook() {
  const { course, selectedCourse, setUserInfo } = useUserStore();

  const handleCurrentCourse = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCourse = e.target.value as Course;
    setUserInfo({
      selectedCourse: newCourse,
    });
  };

  return {
    course,
    selectedCourse,
    handleCurrentCourse,
  };
}
