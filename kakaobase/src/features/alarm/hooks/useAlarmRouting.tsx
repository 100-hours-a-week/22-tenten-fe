import { useRouter } from 'next/navigation';

export default function useAlarmRouting({ data }: { data: any }) {
  const router = useRouter();

  function goToPost() {
    router.push(`/post/${data.target_id}`);
  }
  function goToProfile() {
    router.push(`/profile/${data.sender.id}`);
  }
  return { goToPost, goToProfile };
}
