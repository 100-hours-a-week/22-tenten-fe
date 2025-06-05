import { useParams, useRouter } from 'next/navigation';

function CountItem({
  label,
  count,
  onClick,
}: {
  label: string;
  count: string;
  onClick?: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={onClick}
    >
      <div className="font-bold text-lg">{label}</div>
      <div className="text-sm">{count}</div>
    </div>
  );
}

export default function CountInfo() {
  const param = useParams();
  const userId = Number(param.userId);
  const router = useRouter();
  function navFollowers() {
    router.push(`${userId}/followers`);
  }
  function navFollowings() {
    router.push(`${userId}/followings`);
  }
  return (
    <div className="flex gap-12">
      <CountItem label="게시글" count="10" />
      <CountItem label="팔로워" count="12" onClick={navFollowers} />
      <CountItem label="팔로잉" count="14" onClick={navFollowings} />
    </div>
  );
}
