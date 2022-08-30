import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops";

import { VectorField } from "../VectorField";
import { big_cross } from "../Utils"

class MagneticField extends VectorField {
  constructor(curve, current, percision) {
    super();

    this.curve = curve;
    this.current = current;
    this.percision = percision;
    this.delta = 1 / this.percision;

    this.time_span = tf.range(0, 1, this.delta);

    this.updateSample();
  }

  updateSample() {
    this.samplePoints = this.curve.getPointsTensor(this.time_span);
    this.sampleDerivatives = this.curve.getDerivativesTensor(this.time_span);
  }

  getVectors(time, positions) {
    const positions_expand_tile = positions.expandDims(2).tile([1, 1, this.percision]);
    const points_expand_tile = this.samplePoints.expandDims(1).tile([1, positions.shape[1], 1]);
    const derivatives_expand_tile = this.sampleDerivatives.expandDims(1).tile([1, positions.shape[1], 1]);

    const directions = positions_expand_tile.sub(points_expand_tile);
    const distances = directions.norm("euclidean", 0).pow(3);

    const derivatives_cross_distances = big_cross(derivatives_expand_tile, directions);

    return derivatives_cross_distances.div(distances).sum(2).mul(this.delta);
  }
}

export { MagneticField };
