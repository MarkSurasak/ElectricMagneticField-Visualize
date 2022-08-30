import { Points, BufferAttribute, BufferGeometry, PointsMaterial } from "three";
import { asVertices } from "../utils/Convertor";
import { runge_kutta_4_tensor } from "../utils/ODESolver";

import { clock } from "../index";

class PointsParticle extends Points {
  constructor(states, vectorField) {
    const geometry = new BufferGeometry();
    const material = new PointsMaterial({ size: 0.1 });

    const vertices = new Float32Array(asVertices(states));

    geometry.setAttribute("position", new BufferAttribute(vertices, 3));

    super(geometry, material);

    this.states = states;
    this.vectorField = vectorField;
  }

  onAfterRender(renderer, scene, camera, geometry, material, group) {
    const next = runge_kutta_4_tensor(
      this.vectorField.get_vectors_tensor,
      0,
      this.states,
      clock.getDelta()
    );

    this.states = next;

    const vertices = new Float32Array(asVertices(next));

    this.geometry.setAttribute("position", new BufferAttribute(vertices, 3));
  }
}

export { PointsParticle };
