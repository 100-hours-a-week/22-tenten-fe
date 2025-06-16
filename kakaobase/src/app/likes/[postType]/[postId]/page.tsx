import Header from '@/components/common/header/Header';
import NavBar from '@/components/common/NavBar';
import UserLikeList from '@/components/social/UserLikeList';

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
