import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { getPost } from './post';
import { Course } from '@/shared/types/Course';
import { getComments, getPosts, getRecomments } from './list';

export const feedQueries = {
  all: () => ['feeds'],
  postsKey: (course: Course) => [...feedQueries.all(), 'posts', course],
  commentsKey: (postId: number) => [...feedQueries.all(), 'comments', postId],
  recommentsKey: (commentId: number) => [
    ...feedQueries.all(),
    'recomments',
    commentId,
  ],
  postKey: (postId: number) => [...feedQueries.all(), 'post', postId],

  posts: (course: Course, limit = 6) =>
    infiniteQueryOptions({
      queryKey: feedQueries.postsKey(course),
      queryFn: ({ pageParam }: { pageParam?: number }) =>
        getPosts({ limit, cursor: pageParam, course }),
      getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
      initialPageParam: undefined,
    }),

  comments: (postId: number, limit = 6) =>
    infiniteQueryOptions({
      queryKey: feedQueries.commentsKey(postId),
      queryFn: ({ pageParam }: { pageParam?: number }) =>
        getComments(postId, { limit, cursor: pageParam }),
      getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
      initialPageParam: undefined,
    }),

  recomments: (commentId: number, limit = 6) =>
    infiniteQueryOptions({
      queryKey: feedQueries.recommentsKey(commentId),
      queryFn: ({ pageParam }: { pageParam?: number }) =>
        getRecomments(commentId, { limit, cursor: pageParam }),
      getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
      initialPageParam: undefined,
    }),

  postDetail: (postId: number, postType: Course) =>
    queryOptions({
      queryKey: feedQueries.postKey(postId),
      queryFn: () => getPost({ postType, id: postId }),
    }),
};
