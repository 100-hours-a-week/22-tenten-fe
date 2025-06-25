import { useEffect, useRef, useState } from 'react';
import { banners } from '../data/banners';

export default function useBannerHook() {
  const extended = [...banners, banners[0]];
  const [current, setCurrent] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % extended.length);
    }, 3000);
    return () => clearInterval(timerRef.current);
  }, []);

  const onTransitionEnd = () => {
    if (current === banners.length) {
      setWithTransition(false);
      setCurrent(0);
    }
  };

  useEffect(() => {
    if (!withTransition) {
      requestAnimationFrame(() => setWithTransition(true));
    }
  }, [withTransition]);
  return { onTransitionEnd, current, extended, withTransition };
}
