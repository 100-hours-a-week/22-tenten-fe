export default function HelperText({ errorMessage }: { errorMessage: string }) {
  return <div className="text-redHeart text-xs h-4">{errorMessage}</div>;
}
