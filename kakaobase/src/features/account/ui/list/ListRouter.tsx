'use client';

import dynamic from 'next/dynamic';
import { profileListType } from './Toggle';

const PostList = dynamic(() => import('./PostList'), { ssr: false });
const CommentList = dynamic(() => import('./CommentList'), { ssr: false });
const LikeList = dynamic(() => import('./LikeList'), { ssr: false });

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
