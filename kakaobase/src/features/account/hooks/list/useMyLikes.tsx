import { useInfiniteQuery } from '@tanstack/react-query';
import { accountQueries } from '../../api/accountQueries';

export default function useMyLikes({ userId }: { userId: number }) {
  const methods = useInfiniteQuery(accountQueries.myLikes(userId));
  return { ...methods };
}
