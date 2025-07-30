import Image from 'next/image';

export default function Surfing() {
  return (
    <Image
      src="/chunsik.png"
      alt="surfing"
      fill
      sizes="(max-width : 1024px) 10vw, 96px"
      className="surfing object-contain hidden lg:block"
    />
  );
}
