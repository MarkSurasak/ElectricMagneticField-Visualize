import { Group } from "three";
import { gennerateArrowFromTensor, asVector3 } from "../utils/Convertor";

class ArrowField extends Group {
  constructor(dataChunk, vectorField, time = 0) {
    super();

    this.datachunk = dataChunk;

    const arrows = gennerateArrowFromTensor(
      this.datachunk,
      vectorField.get_vectors_tesnsor(time, dataChunk)
    );

    arrows.forEach((arrow) => this.add(arrow));
  }

  update() {
    const direction_vectors = asVector3(
      this.vectorField.getVector(this.datachunk)
    );

    this.childen.forEach((child, index) => {
      child[index].setDirection(direction_vectors[index]);
    });
  }
}

export { ArrowField };
