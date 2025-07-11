import { Course } from '@/shared/types/Course';
import { useUserStore } from '@/entities/users/stores/userStore';
import { queryClient } from '@/shared/api/queryClient';
import { feedQueries } from '../../api/feedQueries';

export default function useCourseSelectHook() {
  const { course, selectedCourse, setUserInfo } = useUserStore();

  const handleCurrentCourse = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCourse = e.target.value as Course;
    queryClient.invalidateQueries({
      queryKey: feedQueries.postsKey(newCourse),
    });
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
