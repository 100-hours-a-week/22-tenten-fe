import {
  infiniteQueryOptions,
  QueryFunctionContext,
  queryOptions,
} from '@tanstack/react-query';
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
      queryFn: (ctx: QueryFunctionContext) => {
        const cursor = ctx.pageParam as number | undefined;
        const raw = getPosts({ limit, cursor, course });
        return raw;
      },
      getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
      initialPageParam: undefined,
    }),

  comments: (postId: number, limit = 6) =>
    infiniteQueryOptions({
      queryKey: feedQueries.commentsKey(postId),
      queryFn: ({ pageParam }: { pageParam?: number }) => {
        const response = getComments(postId, { limit, cursor: pageParam });
        return response;
      },
      getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
      initialPageParam: undefined,
    }),

  recomments: (commentId: number, limit = 6) =>
    infiniteQueryOptions({
      queryKey: feedQueries.recommentsKey(commentId),
      queryFn: ({ pageParam }: { pageParam?: number }) => {
        const response = getRecomments(commentId, { limit, cursor: pageParam });
        return response;
      },
      getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
      initialPageParam: undefined,
    }),

  postDetail: (postId: number, postType: Course) =>
    queryOptions({
      queryKey: feedQueries.postKey(postId),
      queryFn: () => {
        const response = getPost({ postType, id: postId });
        return response;
      },
    }),
};
