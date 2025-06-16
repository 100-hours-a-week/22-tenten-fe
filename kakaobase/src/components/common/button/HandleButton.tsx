export default function HandleButton({
  isActive,
  activeLabel,
  idleLabel,
  onClick,
}: {
  isActive: boolean;
  activeLabel: string;
  idleLabel: string;
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
        {isActive ? (
          <div className="text-sm">{activeLabel}</div>
        ) : (
          <div className="text-sm">{idleLabel}</div>
        )}
      </div>
    </button>
  );
}
