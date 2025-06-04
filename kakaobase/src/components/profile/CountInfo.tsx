function CountItem({ label, count }: { label: string; count: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-bold">{label}</div>
      <div>{count}</div>
    </div>
  );
}

export default function CountInfo() {
  return (
    <div className="flex text-sm gap-4">
      <CountItem label="게시글" count="10" />
      <CountItem label="팔로워" count="12" />
      <CountItem label="팔로잉" count="14" />
    </div>
  );
}
