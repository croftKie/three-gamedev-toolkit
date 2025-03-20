import * as THREE from "three";
import App from "../TGT";
export default class World {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.groups = null;
    this.meshes = null;
  }

  addMesh() {}
  removeMesh() {}
  addGroup() {}
  removeGroup() {}

  update(cb = () => {}) {
    cb();
  }
}
