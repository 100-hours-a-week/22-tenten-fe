import HeaderMain from '@/widgets/header/HeaderMain';
import ListRouter from '@/features/feeds/ui/ListRouter';
import PostCourseSelector from '@/features/feeds/posts/ui/PostCourseSelector';
import FloatingButtonGroup from '@/widgets/buttons/FloatingButtonGroup';

export default function Page() {
  return (
    <main className="flex flex-col h-screen scroll-none">
      <HeaderMain />
      <div className="flex overflow-y-auto flex-grow flex-col" data-scroll-area>
        <PostCourseSelector />
        <ListRouter />
      </div>
      <FloatingButtonGroup />
    </main>
  );
}
