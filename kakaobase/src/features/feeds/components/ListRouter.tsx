'use client';

import { usePathname } from 'next/navigation';
import RecommentList from '../comments/components/RecommentList';
import CommentList from '../comments/components/CommentList';
import PostList from '../posts/components/PostList';

export default function ListRouter() {
  const path = usePathname();
  if (path.includes('/comment/')) {
    return <RecommentList />;
  } else if (path.includes('/post/')) {
    return <CommentList />;
  } else {
    return <PostList />;
  }
}
