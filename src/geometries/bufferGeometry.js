import * as THREE from "three";

export default class BufferGeometry {
  constructor() {}

  static buildGeometry(vertices = []) {
    const verts_flat = [];
    vertices.forEach((set) => {
      verts_flat.push(...set);
    });
    const verts = new Float32Array(verts_flat);
    const buffer_att = new THREE.BufferAttribute(verts, vertices[0].length);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", buffer_att);
    return geo;
  }
}
