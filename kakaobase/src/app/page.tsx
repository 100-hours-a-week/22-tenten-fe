import HeaderMain from '@/shared/ui/header/HeaderMain';
import LoginModal from '@/shared/ui/LoginModal';
import NavBar from '@/shared/ui/NavBar';
import ListRouter from '@/entities/feeds/components/ListRouter';
import PostCourseSelector from '@/features/posts/components/PostCourseSelector';

export default function Home() {
  return (
    <main className="flex flex-col h-screen scroll-none">
      <LoginModal />
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
