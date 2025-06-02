import ReadOnlyUserInfo from './ReadOnlyUserInfo';
import ImageInput from './ImageInput';

export default function TopArea() {
  return (
    <div className="flex flex-col w-full">
      <div className="text-xs text-redHeart">helpertext</div>
      <div className="flex gap-4">
        <ImageInput />
        <div className="flex flex-col gap-3">
          <ReadOnlyUserInfo label="이름" value="daisy.kim(김도현)" />
          <ReadOnlyUserInfo label="과정명" value="카카오테크 부트캠프 2기" />
        </div>
      </div>
    </div>
  );
}
