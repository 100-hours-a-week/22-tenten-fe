import Link from 'next/link';

export default function RoutingButton({
  path,
  text,
}: {
  path: string;
  text: string;
}) {
  return (
    <Link href={path}>
      <button className="flex items-center justify-center w-[9rem] h-[1.75rem] rounded-lg bg-myBlue text-textOnBlue">
        <div className="text-sm">{text}</div>
      </button>
    </Link>
  );
}
