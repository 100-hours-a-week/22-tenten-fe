import HeaderMain from '@/components/common/header/HeaderMain';
import LoginModal from '@/components/common/LoginModal';
import NavBar from '@/components/common/NavBar';
import ListRouter from '@/components/post/ListRouter';
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
