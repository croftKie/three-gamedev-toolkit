import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import TweakPane from "./pane";
export default class Game {
  constructor(width = window.innerWidth, height = window.innerHeight) {
    this._width = width;
    this._height = height;
    this._THREE = THREE;
    this._scene = null;
    this._cam = null;
    this._canvas = null;
    this._renderer = null;
    this._pane = null;
    this._controls = null;
    this._clock = null;
    this._currentTime = null;
    this._prevTime = 0;
    this._deltaTime = null;
    this._groups = [];
    this._meshes = [];
  }
  init() {
    this._scene = new this._THREE.Scene();
    this._cam = new this._THREE.PerspectiveCamera(
      35,
      this._width / this._height,
      0.1,
      200
    );
    this._cam.position.z = 10;
    this._canvas = document.querySelector("body");
    this._renderer = new this._THREE.WebGLRenderer({
      antialias: true,
    });
    this._renderer.setSize(this._width, this._height);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this._renderer.setAnimationLoop(this.renderLoop.bind(this));
    document.body.appendChild(this._renderer.domElement);
    window.addEventListener("resize", () => {
      this._cam.aspect = this._width / this._height;
      this._cam.updateProjectionMatrix();
      this._renderer.setSize(this._width, this._height);
    });

    this._clock = new this._THREE.Clock();
  }
  initControls() {
    this._controls = new OrbitControls(this._cam, this._canvas);
    this._controls.enableDamping = true;
  }

  addToScene() {
    this._meshes.forEach((mesh) => {
      this._scene.add(mesh._mesh);
    });
  }

  activatePane() {
    this._pane = new TweakPane();
  }

  addToPane(inputs) {
    this._pane.addInputs(inputs);
  }

  renderLoop() {
    this._currentTime = this._clock.getElapsedTime();
    this._deltaTime = this._currentTime - this._prevTime;
    this._prevTime = this._currentTime;

    // GROUP UPDATES
    // MESH UPDATES
    this._meshes.forEach((mesh) => {
      mesh.update();
    });

    this._controls.update();

    // REDRAW SCENE
    this._renderer.render(this._scene, this._cam);
  }

  addMesh(mesh) {
    this._meshes.push(mesh);
  }

  // GETTERS AND SETTERS

  getThree() {
    return this._THREE;
  }
}
