import Header from '@/widgets/header/Header';
import NavBar from '@/widgets/navbar/NavBar';
import UserFollowerList from '@/features/follows/ui/UserFollowerList';
import { followQueries } from '@/features/follows/api/followQueries';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import makeQueryClient from '@/shared/api/serverQeuryClient';

export default async function Page({ params }: { params: { userId: number } }) {
  const qc = makeQueryClient();
  await qc.prefetchInfiniteQuery(followQueries.followers(params.userId));
  return (
    <div className="flex flex-col h-screen scroll-none">
      <Header label="팔로워 목록" />
      <div
        className="flex overflow-y-auto flex-grow flex-col my-8 mx-6 p-2 rounded-lg bg-containerColor"
        data-scroll-area
      >
        <HydrationBoundary state={dehydrate(qc)}>
          <UserFollowerList userId={params.userId} />
        </HydrationBoundary>
      </div>
      <NavBar />
    </div>
  );
}
