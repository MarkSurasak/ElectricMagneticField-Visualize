import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops";

export const big_cross = (a, b) => {
  const ax = a.gather(0, 0);
  const ay = a.gather(1, 0);
  const az = a.gather(2, 0);

  const bx = b.gather(0, 0);
  const by = b.gather(1, 0);
  const bz = b.gather(2, 0);

  const x = ay.mul(bz).sub(az.mul(by));
  const y = az.mul(bx).sub(ax.mul(bz));
  const z = ax.mul(by).sub(ay.mul(bx));

  return tf.stack([x, y, z]);
};

export const meshGrid3d = (x_span, y_span, z_span) => {
  const x_len = x_span.size;
  const y_len = y_span.size;
  const z_len = z_span.size;

  const xx = x_span.expandDims(0).expandDims(0).tile([z_len, y_len, 1]);
  const yy = x_span.expandDims(1).expandDims(0).tile([z_len, 1, x_len]);
  const zz = x_span.expandDims(1).expandDims(2).tile([1, y_len, x_len]);

  return [xx, yy, zz];
};
