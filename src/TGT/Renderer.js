import * as THREE from "three";
import App from "./TGT.js";
import { store } from "./utilities/Store.js";
export default class Renderer {
  constructor() {
    this.app = new App();
    this.stateStore = store;
    this.store = store.getState();
    this.setRendererInstance();
    this.setResizeListener();
  }
  setRendererInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.app.canvas,
      antialias: true,
    });
    this.instance.setSize(this.store.width, this.store.height);
    this.instance.setPixelRatio(Math.min(this.store.pixelRatio, 2));
  }
  setResizeListener() {
    this.stateStore.subscribe((store) => {
      this.instance.setSize(store.width, store.height);
      this.instance.setPixelRatio(store.pixelRatio);
    });
  }

  update() {
    this.instance.render(this.app.scene, this.app.camera.instance);
  }
}
