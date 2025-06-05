import { useQRCode } from 'next-qrcode';

interface QrCodeDisplayProps {
  url: string;
  size?: number;
}

export default function QrCode({ url, size = 150 }: QrCodeDisplayProps) {
  const { SVG } = useQRCode();

  return (
    <div>
      <SVG
        text={url}
        options={{
          errorCorrectionLevel: 'M',
          margin: 1,
          scale: Math.floor(size / 25),
          width: size,
        }}
      />
    </div>
  );
}
