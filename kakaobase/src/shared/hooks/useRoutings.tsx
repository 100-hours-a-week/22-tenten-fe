import { PostType } from '@/features/feeds/types/post';
import { useRouter } from 'next/navigation';

export default function useRoutings() {
  const router = useRouter();
  function goLogin() {
    router.push('/login');
  }
  function goHome() {
    router.push('/');
  }
  function goProfile(userId: number) {
    router.push(`/profile/${userId}`);
  }
  function goFollowers(userId: number) {
    router.push(`${userId}/followers`);
  }
  function goFollowings(userId: number) {
    router.push(`${userId}/followings`);
  }
  function goPostDetail(postId: number) {
    router.push(`/post/${postId}`);
  }
  function goSignupStep1() {
    router.push('/signup/step1');
  }
  function goSignupStep2() {
    router.push('/signup/step2');
  }
  function goBack() {
    router.back();
  }
  function goMain() {
    router.push('/main');
  }
  function goLikes(type: PostType, id: number) {
    router.push(`/likes/${type}/${id}`);
  }
  function goEditor() {
    router.push('/post/new');
  }
  function goUnauthorized() {
    router.push('/unauthorized');
  }
  function goPath(path: string) {
    router.push(path);
  }
  return {
    goLogin,
    goHome,
    goProfile,
    goFollowers,
    goFollowings,
    goPostDetail,
    goSignupStep1,
    goSignupStep2,
    goBack,
    goMain,
    goLikes,
    goEditor,
    goUnauthorized,
    goPath,
  };
}
