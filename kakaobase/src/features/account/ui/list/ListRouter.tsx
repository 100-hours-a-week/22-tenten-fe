'use client';

import LikeList from './LikeList';
import { profileListType } from './Toggle';
import PostList from './PostList';
import CommentList from './CommentList';

const profileListMap = {
  게시글: PostList,
  댓글: CommentList,
  좋아요: LikeList,
};

export default function ListRouter({
  type,
  userId,
}: {
  type: profileListType;
  userId: number;
}) {
  const SelectedList = profileListMap[type];
  return <SelectedList userId={userId} />;
}
