import * as THREE from "three";
import BufferGeometry from "./geometries/bufferGeometry";

export default class Mesh {
  constructor(game) {
    this._game = game;
    this._geometry = null;
    this._material = null;
    this._mesh = null;
  }
  init(
    geometry = new THREE.BoxGeometry(1, 1, 1),

    material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    })
  ) {
    // this._geometry = geometry;

    this._geometry = BufferGeometry.buildGeometry([
      [0, 0, 0],
      [0, 2, 0],
      [2, 0, 0],
    ]);

    this._material = material;

    this._mesh = new THREE.Mesh(this._geometry, material);
  }

  update() {
    this._mesh.rotation.y +=
      THREE.MathUtils.degToRad(10) * this._game._deltaTime * 4;
    this._mesh.position.x = Math.sin(this._game._currentTime);
  }

  getMesh() {
    return this._mesh;
  }
}
