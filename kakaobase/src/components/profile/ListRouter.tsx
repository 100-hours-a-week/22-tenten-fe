'use client';

import LikeList from './list/LikeList';
import { profileListType } from './Toggle';
import PostList from './list/PostList';
import CommentList from './list/CommentList';

export default function ListRouter({
  type,
  userId,
}: {
  type: profileListType;
  userId: number;
}) {
  if (type === '게시글') {
    return <PostList userId={userId} />;
  } else if (type === '댓글') {
    return <CommentList userId={userId} />;
  } else {
    return <LikeList userId={userId} />;
  }
}
