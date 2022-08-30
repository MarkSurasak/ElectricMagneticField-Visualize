import { ParametricCurve } from "./ParametricCurve";

import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops";
import { Vector3 } from "three";

export class Solenoid extends ParametricCurve {
  constructor(radius = 5, period = 5, length = 5) {
    super();

    this.radius = radius;
    this.period = period;
    this.length = length;

    this.name = "Solenoid";
    this.parameters = [
      { name: "radius", min: 1, max: 30 },
      { name: "period", min: 1, max: 30 },
      { name: "length", min: 1, max: 30 }
    ];
  }

  getPointsTensor(t) {
    return tf.tidy(() => {
      const x = tf.sin(t.mul(2 * Math.PI * this.period)).mul(this.radius);
      const y = tf.cos(t.mul(2 * Math.PI * this.period)).mul(this.radius);
      const z = t.mul(this.length);

      return tf.stack([x, y, z], 0);
    });
  }

  getDerivativesTensor(t) {
    return tf.tidy(() => {
      const x = tf.sin(t.mul(2 * Math.PI * this.period));
      const y = tf.cos(t.mul(2 * Math.PI * this.period));
      const z = tf.fill([t.size, 1], 1).flatten().mul(this.length);

      return tf.stack([x, y, z], 0);
    });
  }

  getPoint(t, optionalTerget = new Vector3()) {
    const x = this.radius * Math.cos(2 * Math.PI * this.period * t);
    const y = this.radius * Math.sin(2 * Math.PI * this.period * t);
    const z = this.length * t;

    return optionalTerget.set(x, y, z);
  }

  getDerivative(t, optionalTerget = new Vector3()) {
    const x =
      this.radius *
      Math.sin(2 * Math.PI * this.period * t) *
      2 *
      Math.PI *
      this.period *
      -1;
    const y =
      this.radius *
      Math.cos(2 * Math.PI * this.period * t) *
      2 *
      Math.PI *
      this.period;
    const z = this.length;

    return optionalTerget.set(x, y, z);
  }
}

export class Line extends ParametricCurve {

  constructor(length = 5) {
    super();

    this.length = length;

    this.name = "Line";
    this.parameters = [
      { name: "length", min: 1, max: 30 }
    ];
  }

  get_points_tensor(time_span) {
    return tf.tidy(() => {
      const x = tf.zerosLike(time_span)
      const y = time_span.mul(this.length)
      const z = tf.zerosLike(time_span)

      return tf.stack([x, y, z], 0);
    });
  }

  get_derivatives_tensor(time_span) {
    return tf.tidy(() => {
      const x = tf.zerosLike(time_span)
      const y = tf.fill(time_span.shape, this.length)
      const z = tf.zerosLike(time_span)

      return tf.stack([x, y, z], 0);
    });
  }

  getPoint(t, optionalTaget = new Vector3()) {
    return optionalTaget.set(0, this.length*t, 0)
  }

  getDerivative(t, optionalTaget = new Vector3()) {
    return optionalTaget.set(0, this.length, 0)
  }

}