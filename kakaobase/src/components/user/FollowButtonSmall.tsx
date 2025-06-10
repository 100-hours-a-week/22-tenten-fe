import { useFollowToggle } from '@/hooks/user/useFollowHook';

export default function FollowButtonSmall({
  isFollowing,
  id,
}: {
  isFollowing: boolean;
  id: number;
}) {
  const { following, toggleFollow } = useFollowToggle(isFollowing, id);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFollow();
      }}
      className={`h-4 px-2 min-w-fit align-center rounded-full flex justify-center ${
        following
          ? 'bg-myLightBlue text-textOnLight'
          : 'bg-myBlue text-textOnBlue'
      }`}
    >
      <div className="flex justify-self-center text-[0.625rem]">
        {following ? '언팔로우' : '팔로우'}
      </div>
    </button>
  );
}
