import Banner from '@/features/banner/ui/Banner';
import PostByCourse from '@/features/main/ui/PostByCourse';
import HeaderMain from '@/widgets/header/HeaderMain';
import NavBar from '@/widgets/navbar/NavBar';

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <HeaderMain />
      <div className="h-screen">
        <Banner />
        <PostByCourse />
      </div>
      <NavBar />
    </div>
  );
}
