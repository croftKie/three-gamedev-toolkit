import { createStore } from "zustand/vanilla";

const assetsToLoad = [
  {
    path: "textures/2k_earth_daymap_jpg",
    id: "earth",
    type: "texture",
  },
  {
    path: "textures/2k_earth_daymap_jpg",
    id: "mars",
    type: "texture",
  },
  {
    path: "textures/2k_earth_daymap_jpg",
    id: "mercury",
    type: "texture",
  },
  {
    path: "textures/2k_earth_daymap_jpg",
    id: "sun",
    type: "texture",
  },
];

const assetStore = createStore((set) => ({
  assetsToLoad,
  loadedAssets: {},
  addLoadedAssets: (asset, id) =>
    set((state) => {
      console.log(state);
      return {
        loadedAssets: {
          ...state.loadedAssets,
          [id]: asset,
        },
      };
    }),
}));

export default assetStore;
