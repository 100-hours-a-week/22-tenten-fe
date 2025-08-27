import HeaderMain from '@/widgets/header/HeaderMain';
import PostCourseSelector from '@/features/feeds/posts/ui/PostCourseSelector';
import FloatingButtonGroup from '@/widgets/buttons/FloatingButtonGroup';
import PostList from '@/features/feeds/posts/ui/PostList';

export default function Page() {
  return (
    <main className="flex flex-col h-screen scroll-none">
      <HeaderMain />
      <div className="flex overflow-y-auto flex-grow flex-col" data-scroll-area>
        <PostCourseSelector />
        <PostList />
      </div>
      <FloatingButtonGroup />
    </main>
  );
}
