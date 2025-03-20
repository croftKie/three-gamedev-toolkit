import assetStore from "./assetsToLoad";

export default class Preloader {
  constructor() {
    this.assetStore = assetStore;
    this.assetStore.subscribe((state) => {
      this.numberAssetsLoaded = Object.keys(state.loadedAssets).length;
      this.numberAssetsToLoad = Object.keys(state.assetsToLoad).length;
      this.progress = this.numberAssetsLoaded / this.numbersAssetsToLoad;
    });
  }
}
