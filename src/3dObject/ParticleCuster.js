import { Group, Vector3 } from "three";
import { Particle } from "./Particle";

class ParticleCuster extends Group {
  constructor(geometry, material, clock, vectorField, spawn_geometry) {
    super();

    var vertices = spawn_geometry.attributes.position.array;

    for (let i = 0; i < vertices.length; i = i + 3) {
      //a vertex' position is (vertices[i],vertices[i+1],vertices[i+2])

      const vertex = new Vector3(vertices[i], vertices[i + 1], vertices[i + 2]);

      this.add(new Particle(geometry, material, clock, vectorField, vertex));
    }
  }
}

export { ParticleCuster };
