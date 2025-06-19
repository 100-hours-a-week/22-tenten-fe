import HeaderMain from '@/widgets/header/HeaderMain';
import RequireLoginModal from '@/widgets/modal/RequireLoginModal';
import NavBar from '@/widgets/navbar/NavBar';
import ListRouter from '@/features/feeds/components/ListRouter';
import PostCourseSelector from '@/features/feeds/posts/components/PostCourseSelector';

export default function Home() {
  return (
    <main className="flex flex-col h-screen scroll-none">
      <RequireLoginModal />
      <HeaderMain />
      <PostCourseSelector />
      <div
        className="flex overflow-y-auto flex-grow flex-col mb-12"
        data-scroll-area
      >
        <ListRouter />
      </div>
      <NavBar />
    </main>
  );
}
