import Banner from '@/features/main/ui/Banner';
import PostByCourse from '@/features/main/ui/PostByCourse';
import HeaderMain from '@/widgets/header/HeaderMain';

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <HeaderMain />
      <div className="h-screen">
        <Banner />
        <PostByCourse />
      </div>
    </div>
  );
}
