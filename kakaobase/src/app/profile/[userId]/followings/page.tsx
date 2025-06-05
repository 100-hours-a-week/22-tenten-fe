import Header from '@/components/common/header/Header';
import NavBar from '@/components/common/NavBar';
import UserList from '@/components/likeFollow/UserList';

export default function Page({ params }: { params: { userId: number } }) {
  return (
    <div className="flex flex-col h-screen">
      <Header label="팔로잉 목록" />
      <UserList userId={params.userId} />
      <NavBar />
    </div>
  );
}
