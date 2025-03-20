import App from "../TGT";
export default class Updater {
  constructor() {
    this.app = new App();
    this.camera = this.app.camera;
    this.renderer = this.app.renderer;
    this.world = this.app.world;
    this.loop();
  }

  loop() {
    console.log("loop");
    this.world.update();
    this.camera.update();
    this.renderer.update();
    window.requestAnimationFrame(() => this.loop());
  }
}
