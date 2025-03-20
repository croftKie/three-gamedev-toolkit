import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import App from "./TGT";
import { store } from "./utilities/Store";

export default class Camera {
  constructor() {
    this.app = new App();
    this.stateStore = store;
    this.store = store.getState();

    this.setCameraInstance();
    this.setControls();
    this.setResizeListener();
  }

  setCameraInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.store.width / this.store.height,
      0.1,
      200
    );
    this.instance.position.z = 5;
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.app.canvas);
    this.controls.enableDamping = true;
  }

  setResizeListener() {
    this.stateStore.subscribe(() => {
      this.instance.aspect = this.store.width / this.store.height;
      this.instance.updateProjectionMatrix();
    });
  }

  update() {
    this.controls.update();
  }
}
