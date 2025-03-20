import * as THREE from "three";

import Camera from "./Camera";
import Renderer from "./Renderer";
import Updater from "./utilities/Updater";
import World from "./world/World";
import Resize from "./utilities/Resize";
import AssetLoader from "./utilities/AssetLoader";
import Preloader from "./utilities/Preloader";

let instance = null;

export default class TGT {
  constructor(canvas = document.querySelector("body")) {
    if (instance) return instance;
    instance = this;

    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.assetLoader = new AssetLoader();
    this.preloader = new Preloader();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
    this.updater = new Updater();
    this.resize = new Resize();
  }
}
