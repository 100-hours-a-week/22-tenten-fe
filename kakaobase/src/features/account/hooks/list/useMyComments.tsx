import { useInfiniteQuery } from '@tanstack/react-query';
import { accountQueries } from '../../api/accountQueries';

export default function useMyComments({ userId }: { userId: number }) {
  const methods = useInfiniteQuery(accountQueries.myComments(userId));
  return { ...methods };
}
