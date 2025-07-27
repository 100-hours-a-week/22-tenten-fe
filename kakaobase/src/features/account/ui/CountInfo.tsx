import useRoutings from '@/shared/hooks/useRoutings';
import { Profile } from '../types/Profile';

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
      <div className="font-bold text-md">{label}</div>
      <div className="text-sm" onClick={onClick}>
        {count}
      </div>
    </div>
  );
}

export default function CountInfo({ data }: { data: Profile }) {
  const { goFollowers, goFollowings } = useRoutings();
  return (
    <div className="flex gap-8">
      <CountItem label="게시글" count={data.post_count} />
      <CountItem
        label="팔로워"
        count={data.follower_count}
        onClick={() => goFollowers(data.id)}
      />
      <CountItem
        label="팔로잉"
        count={data.following_count}
        onClick={() => goFollowings(data.id)}
      />
    </div>
  );
}
