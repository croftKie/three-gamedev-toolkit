import * as THREE from "three";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import assetStore from "./assetsToLoad";
export default class AssetLoader {
  constructor() {
    this.assetStore = assetStore;

    this.instantiateLoaders();
    this.startLoading();
  }

  instantiateLoaders() {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    this.gltfLoader = new GLTFLoader();
    this.gltfLoader.setDRACOLoader(dracoLoader);
    this.textureLoader = new THREE.TextureLoader();
  }

  startLoading() {
    this.assetStore.getState().assetsToLoad.forEach((asset) => {
      if (asset.type === "texture") {
        console.log("hi");
        this.textureLoader.load(asset.path, (loadedAsset) => {
          this.assetStore.getState().addLoadedAsset(loadedAsset, asset.id);
        });
      }
      if (asset.type === "model") {
        this.gltfLoader.load(asset.path, (loadedAsset) => {
          this.assetStore.getState().addLoadedAsset(loadedAsset, asset.id);
        });
      }
    });
  }
}
