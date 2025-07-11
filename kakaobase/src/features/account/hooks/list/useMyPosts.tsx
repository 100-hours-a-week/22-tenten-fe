import { useInfiniteQuery } from '@tanstack/react-query';
import { accountQueries } from '../../api/accountQueries';

export default function useMyPosts({ userId }: { userId: number }) {
  const methods = useInfiniteQuery(accountQueries.myPosts(userId));
  return { ...methods };
}
