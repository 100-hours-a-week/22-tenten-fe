'use client';

import { usePathname } from 'next/navigation';
import RecommentList from '../comments/ui/RecommentList';
import CommentList from '../comments/ui/CommentList';
import PostList from '../posts/ui/PostList';

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
