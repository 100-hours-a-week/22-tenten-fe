import Header from '@/widgets/header/Header';
import NavBar from '@/widgets/navbar/NavBar';
import UserLikeList from '@/features/likes/components/UserLikeList';

export default function Page({
  params,
}: {
  params: { postId: number; postType: string };
}) {
  return (
    <div className="flex flex-col h-screen">
      <Header label="좋아요 목록" />
      <UserLikeList postId={params.postId} postType={params.postType} />
      <NavBar />
    </div>
  );
}
