import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import TweakPane from "./pane";
export default class Game {
  constructor(width = window.innerWidth, height = window.innerHeight) {
    this._width = width;
    this._height = height;
    this._THREE = THREE;
    this._scenes = [];
    this._activeScene = null;
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
  init(cameraType = "perspective") {
    // Initialise base scene
    this._scene.push({
      _id: Math.random() * 10000,
      scene: new this._THREE.Scene(),
    });
    this._activeScene = this._scenes[0];

    // Initialise camera (Perspective or Orthographic)
    if (cameraType == "perspective") {
      this._cam = new this._THREE.PerspectiveCamera(
        35,
        this._width / this._height,
        0.1,
        200
      );
    } else if (cameraType == "ortho") {
      this._cam = new this._THREE.OrthographicCamera(
        this._width / -2,
        this._width / 2,
        this._height / 2,
        this._height / -2,
        0.1,
        200
      );
    }
    // provide initial camera offset
    this._cam.position.z = 10;

    // query html for selector to render canvas
    this._canvas = document.querySelector("body");

    // initialise renderer, default to WebGL.
    this._renderer = new this._THREE.WebGLRenderer({
      antialias: true,
    });
    // set screen size, pixel ratio and initialise render loop
    this._renderer.setSize(this._width, this._height);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this._renderer.setAnimationLoop(this.renderLoop.bind(this));

    // append domElement of renderer to selected canvas
    document.body.appendChild(this._renderer.domElement);

    // initialise support event for handling screen resizing
    window.addEventListener("resize", () => {
      this._cam.aspect = this._width / this._height;
      this._cam.updateProjectionMatrix();
      this._renderer.setSize(this._width, this._height);
    });

    // initialise an internal clock for use with deltatime.
    this._clock = new this._THREE.Clock();
  }

  initControls() {
    this._controls = new OrbitControls(this._cam, this._canvas);
    this._controls.enableDamping = true;
  }
  initPane() {
    this._pane = new TweakPane();
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
    this._renderer.render(this._activeScene.scene, this._cam);
  }

  //
  // ADD METHODS
  // Used to add content to active scene, selected scene, add to pane, or to add mesh to the array of meshes
  addToActiveScene() {
    this._meshes.forEach((mesh) => {
      this._activeScene.scene.add(mesh.mesh._mesh);
    });
  }

  addToPane(inputs) {
    this._pane.addInputs(inputs);
  }

  addMesh(mesh) {
    this._meshes.push({
      activeSceneId: this._activeScene._id,
      mesh: mesh,
    });
  }
}
