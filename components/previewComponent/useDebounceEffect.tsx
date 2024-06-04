import { useEffect, DependencyList } from "react";
import ReactCrop, { PixelCrop } from "react-image-crop";
export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn();
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps);
}
