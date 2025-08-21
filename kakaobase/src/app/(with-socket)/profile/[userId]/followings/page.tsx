import Header from '@/widgets/header/Header';
import NavBar from '@/widgets/navbar/NavBar';
import UserFollowingList from '@/features/follows/ui/UserFollowingList';
import makeQueryClient from '@/shared/api/serverQeuryClient';
import { followQueries } from '@/features/follows/api/followQueries';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Page({ params }: { params: { userId: number } }) {
  const qc = makeQueryClient();
  await qc.prefetchInfiniteQuery(followQueries.followings(params.userId));
  return (
    <div className="flex flex-col h-screen scroll-none">
      <Header label="팔로잉 목록" />
      <div
        className="flex overflow-y-auto flex-grow flex-col my-8 mx-6 p-2 rounded-lg bg-containerColor"
        data-scroll-area
      >
        <HydrationBoundary state={dehydrate(qc)}>
          <UserFollowingList userId={params.userId} />
        </HydrationBoundary>
      </div>
      <NavBar />
    </div>
  );
}
