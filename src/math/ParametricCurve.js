import { Curve, Vector3, CatmullRomCurve3 } from "three"

import { asVector3 } from "../utils/Convertor"

import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops";

class ParametricCurve extends Curve {
  
  //return a tensor of derivatives
  //param: time_span type = tensor with shape [n,1]
  //param: every element in time_span must between 0 and 1
  //return: tensor with shape [3,n]
  get_points_tensor(time_span) {}

  //return a tensor of derivatives
  //param: time_span type = tensor with shape [n,1]
  //param: every element in time_span must between 0 and 1
  //return: tensor with shape [3,n]
  get_derivatives_tensor(time_span) {}

  getPoint(t, optionalTaget = new Vector3()) {}

  getDerivative(t, optionalTaget = new Vector3()) {}

  getDerivatives(division = 5) {
    const time_span = tf.linspace(0,1, division)
    return asVector3(this.get_derivatives_tensor(time_span))
  }

  getPoints(division = 5) {
    const time_span = tf.linspace(0,1, division)
    return asVector3(this.get_point_tensor(time_span))
  }

  getTangent(t, optionalTaget = new Vector3()) {
    return optionalTaget.copy(this.getDerivative(t).normalize())
  }

  asCatmullRomCurve3(division = 5) {
    return new CatmullRomCurve3(this.gerPoints(division))
  }
}

export { ParametricCurve };
