import Image from 'next/image';

export default function AlarmProfile({ sender }: { sender: any }) {
  const imageUrl = sender.image_url;

  if (imageUrl === null)
    return (
      <div>
        <Image
          src="/logo_square.svg"
          alt="프로필"
          fill
          className="object-fit flex rounded-xl border-innerContainerColor border-2 p-1"
        />
      </div>
    );
  else
    return (
      <div>
        <Image
          src={imageUrl}
          alt="프로필"
          fill
          className="object-fit flex rounded-xl"
        />
      </div>
    );
}
