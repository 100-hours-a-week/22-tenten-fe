export default function FollowButtonLarge({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick}>
      <div
        className={`flex items-center justify-center w-[9rem] h-[1.75rem] rounded-lg ${
          isActive
            ? 'bg-myLightBlue text-textOnLight'
            : 'bg-myBlue text-textOnBlue'
        }`}
      >
        <div className="text-sm">{isActive ? '언팔로우' : '팔로우'}</div>
      </div>
    </button>
  );
}
