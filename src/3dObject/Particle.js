import { Mesh } from "three";

import { runge_kutta_4 } from "../utils/ODESolver";

class Particle extends Mesh {
  constructor(geometry, material, clock, vectorField, intial_position) {
    super(geometry, material);

    this.clock = clock;
    this.vectorField = vectorField;
    this.position.copy(intial_position);
    this.frustumCulled = false;
  }

  onAfterRender(renderer, scene, camera, geometry, material, group) {
    this.position.copy(
      runge_kutta_4(
        this.vectorField.getVector,
        this.clock.getElapsedTime,
        this.position,
        0.01
      )
    );
  }
}

export { Particle };
