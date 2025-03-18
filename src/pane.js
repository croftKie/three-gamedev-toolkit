import { Pane } from "tweakpane";

export default class TweakPane {
  constructor() {
    this._pane = new Pane();
  }

  getPane() {
    return this._pane;
  }

  addInputs(inputs = []) {
    inputs.forEach((input) => {
      this._pane.addBinding(input.property, input.name, input.values);
    });
  }
}
