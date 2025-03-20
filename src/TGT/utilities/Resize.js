import { store } from "./Store";
export default class Resize {
  constructor() {
    this.setState = store.setState;
    window.addEventListener("resize", () => {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      });
    });
  }
}
