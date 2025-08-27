'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import CountsInfo from './CountsInfo';
import summaryCondition from '../posts/lib/summaryCondition';
import { Comment, PostEntity } from '@/features/feeds/types/post';
import RecommentList from '../comments/ui/RecommentList';
import YoutubeFrame from './YoutubeFrame';
import useRoutings from '@/shared/hooks/useRoutings';
import UserProfileImage from './UserProfileImage';
import UserInfo from './UserInfo';
import { memo } from 'react';
import dynamic from 'next/dynamic';
const Linkify = dynamic(() => import('react-linkify'), { ssr: false });

const PostCard = memo(function PostCard({ post }: { post: PostEntity }) {
  const { goPostDetail } = useRoutings();
  const path = usePathname();

  function isComment(post: PostEntity): post is Comment {
    return post.type === 'comment';
  }

  function navDetail() {
    if (post.type === 'post') {
      sessionStorage.setItem('scrollToPostId', String(post.id));
      goPostDetail(post.id);
    }
    if (isComment(post) && path.includes('profile')) {
      goPostDetail(post.postId);
    }
  }

  return (
    <div className="flex flex-col w-full" data-post-id={post.id}>
      <div className="flex mx-6 my-2">
        <div
          className={clsx(
            'flex w-full bg-containerColor p-4 gap-2 cursor-pointer rounded-2xl',
            path === '/main' &&
              'hover:-translate-y-1 hover:shadow-md transition-transform duration-100'
          )}
          onClick={navDetail}
        >
          <UserProfileImage id={post.userId} profileUrl={post.userProfileUrl} />
          <div className="w-full flex flex-col gap-2 text-textColor">
            <UserInfo post={post} />
            <div>
              {post.content && (
                <div
                  className={clsx(
                    'w-full text-sm overflow-hidden cursor-pointer break-all whitespace-pre-wrap',
                    !path.includes('post') && 'line-clamp-2 text-ellipsis'
                  )}
                >
                  {/(https?:\/\/|www\.|@)/i.test(post.content) ? (
                    <Linkify
                      componentDecorator={(href, text) => (
                        <a
                          href={href}
                          className="underline text-myBlue"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {text}
                        </a>
                      )}
                    >
                      {post.content}
                    </Linkify>
                  ) : (
                    <span className="whitespace-pre-wrap break-all">
                      {post.content}
                    </span>
                  )}
                </div>
              )}
              <div className="flex w-full overflow-hidden rounded-lg">
                {post.type === 'post' &&
                  'imageUrl' in post &&
                  post.imageUrl && (
                    <Image
                      src={post.imageUrl}
                      alt="이미지"
                      className="w-full h-auto object-cover rounded-lg"
                      width={0}
                      height={0}
                      priority
                      sizes="100vw"
                    />
                  )}
                <YoutubeFrame post={post} />
              </div>
            </div>
            {post.type === 'post' &&
              'youtubeUrl' in post &&
              post.youtubeUrl &&
              (post.youtubeSummary ? (
                <div className="text-xs text-textColor">
                  {summaryCondition({ summary: post.youtubeSummary })}
                </div>
              ) : (
                <div className="text-xs text-textColor">
                  유튜브 요약본이 아직 생성되지 않았거나 없습니다.
                </div>
              ))}
            <CountsInfo post={post} />
          </div>
        </div>
      </div>
      <RecommentList commentId={post.id} />
    </div>
  );
});

export default PostCard;
