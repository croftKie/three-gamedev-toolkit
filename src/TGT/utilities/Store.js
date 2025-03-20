import { createStore } from "zustand/vanilla";

export const store = createStore(() => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
  };
});
