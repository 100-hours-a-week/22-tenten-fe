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
  function goProfileEdit(userId: number) {
    router.push(`/profile/${userId}/edit`);
  }
  function goFollowers(userId: number) {
    router.push(`${userId}/followers`);
  }
  function goFollowings(userId: number) {
    router.push(`${userId}/followings`);
  }
  function goPasswordEdit(userId: number) {
    router.push(`/profile//${userId}/edit/password`);
  }
  function goWithdraw(userId: number) {
    router.push(`/profile//${userId}/edit/withdraw`);
  }
  function goPostDetail(postId: number) {
    router.push(`/post/${postId}`);
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
  return {
    goLogin,
    goHome,
    goProfile,
    goProfileEdit,
    goFollowers,
    goFollowings,
    goPasswordEdit,
    goWithdraw,
    goPostDetail,
    goSignupStep2,
    goBack,
    goMain,
    goLikes,
    goEditor,
  };
}
