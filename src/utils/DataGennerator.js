import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops";

import { Vector3 } from "three";
import { meshGrid3d } from "./LinearAlgebra";
import { asVector3 } from "./Convertor";

export const gennerateDataChuck = (
  minPoint = new Vector3(-5, -5, -5),
  maxPoint = new Vector3(5, 5, 5),
  density = 10
) => {
  const x_span = tf.linspace(minPoint.x, maxPoint.x, density);
  const y_span = tf.linspace(minPoint.y, maxPoint.y, density);
  const z_span = tf.linspace(minPoint.z, maxPoint.z, density);

  const [xx, yy, zz] = meshGrid3d(x_span, y_span, z_span);

  return tf.stack([xx.flatten(), yy.flatten(), zz.flatten()], 0);
};

export const gennerateRandomPoints = (
  minPoint = new Vector3(-1, -1, -1),
  maxPoint = new Vector3(1, 1, 1),
  count = 50
) => {
  const length = tf.tensor2d(maxPoint.sub(minPoint).toArray(), [3, 1]);
  const min_tensor = tf.tensor2d(minPoint.toArray(), [3, 1]);

  const normal_random_points = tf.randomUniform([3, count]);

  return normal_random_points.mul(length).add(min_tensor);
};
