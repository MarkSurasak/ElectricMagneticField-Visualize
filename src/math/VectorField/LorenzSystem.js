import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops";

import { VectorField } from "../VectorField";
import { Vector3 } from "three";

const sigma = 10;
const rho = 28;
const beta = 8 / 3;

export class LorenzSystem extends VectorField {
  get_vectors_tensor(time, state) {
    const x = state.gather(0, 0);
    const y = state.gather(1, 0);
    const z = state.gather(2, 0);

    const x_dot = y.sub(x).mul(sigma);
    const y_dot = x.mul(tf.sub(rho, z)).sub(y);
    const z_dot = tf.sub(tf.mul(x, y), tf.mul(beta, z));

    return tf.stack([x_dot, y_dot, z_dot], 0);
  }

  getVector(time, state) {
    // const x_dot = state.x * state.y - beta * state.z;
    // const y_dot = state.x * (rho - state.z) - state.y;
    // const z_dot = sigma * (state.y - state.x);

    const x_dot = sigma * (state.y - state.x);
    const y_dot = state.x * (rho - state.z) - state.y;
    const z_dot = state.x * state.y - beta * state.z;

    return new Vector3(x_dot, y_dot, z_dot);
  }
}
