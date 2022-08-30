import { Vector3, ArrowHelper } from "three";

export const asVector3 = (tensor) => {
  return tensor
    .transpose()
    .arraySync()
    .map((item) => {
      return new Vector3(item[0], item[1], item[2]);
    });
};

export const gennerateArrowFromTensor = (positions, directions) => {
  const directions_vector = asVector3(directions);

  return asVector3(positions).map((position, index) => {
    return new ArrowHelper(directions_vector[index].normalize(), position, 1);
  });
};

export const asVertices = (tensor) => {
  return tensor.transpose().flatten().arraySync();
};

export const asTensor = (vertice) => {
  return tensor.reshape([3]);
};
