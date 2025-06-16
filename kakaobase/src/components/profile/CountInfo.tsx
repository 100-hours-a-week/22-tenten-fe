import { Profile } from '@/types/user/Profile';
import { useRouter } from 'next/navigation';

function CountItem({
  label,
  count,
  onClick,
}: {
  label: string;
  count: number;
  onClick?: () => void;
}) {
  return (
    <div className="flex flex-col items-center cursor-pointer">
      <div className="font-bold text-lg">{label}</div>
      <div className="text-sm" onClick={onClick}>
        {count}
      </div>
    </div>
  );
}

export default function CountInfo({ data }: { data: Profile }) {
  const router = useRouter();
  function navFollowers() {
    router.push(`${data.id}/followers`);
  }
  function navFollowings() {
    router.push(`${data.id}/followings`);
  }
  return (
    <div className="flex gap-12">
      <CountItem label="게시글" count={data.post_count} />
      <CountItem
        label="팔로워"
        count={data.follower_count}
        onClick={navFollowers}
      />
      <CountItem
        label="팔로잉"
        count={data.following_count}
        onClick={navFollowings}
      />
    </div>
  );
}
