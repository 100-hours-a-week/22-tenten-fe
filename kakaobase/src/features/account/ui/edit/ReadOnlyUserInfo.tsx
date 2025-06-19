export default function ReadOnlyUserInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col text-textColor">
      <div className="flex text-sm">{label}</div>
      <div className="flex text-xs">{value}</div>
    </div>
  );
}
