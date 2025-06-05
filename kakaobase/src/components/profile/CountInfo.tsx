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
    <div className="flex flex-col items-center" onClick={onClick}>
      <div className="font-bold">{label}</div>
      <div>{count}</div>
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
    <div className="flex text-sm gap-4">
      <CountItem label="게시글" count="10" />
      <CountItem label="팔로워" count="12" onClick={navFollowers} />
      <CountItem label="팔로잉" count="14" onClick={navFollowings} />
    </div>
  );
}
