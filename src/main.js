import Game from "./game";
import Mesh from "./mesh";

function main() {
  const game = new Game();
  game.init();
  game.initControls();

  const cubeMesh = new Mesh(game);
  cubeMesh.init();
  game.addMesh(cubeMesh);

  game.addToScene();
  // game.addToPane([
  //   {
  //     property: cubeMesh._mesh.scale,
  //     name: "x",
  //     values: { min: 0, max: 10, step: 0.1, label: "Scale X" },
  //   },
  // ]);
  game.renderLoop();
}

main();
