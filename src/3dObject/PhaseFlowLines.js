import {
  Group,
  Vector3,
  BufferGeometry,
  BufferAttribute,
  Line,
  LineBasicMaterial
} from "three";
import { asVector3, asVertices } from "../utils/Convertor";
import { gennerateRandomPoints } from "../utils/DataGennerator";
import { computPhaseFlow_tensor } from "../utils/ODESolver";

export class PhaseFlowLines extends Group {
  constructor(
    vectorField,
    initial_time,
    duration,
    count = 10,
    minPoint = new Vector3(-5, -5, -5),
    maxPoint = new Vector3(5, 5, 5),
    lineMaterial = new LineBasicMaterial()
  ) {
    super();

    const randomPoint = gennerateRandomPoints(minPoint, maxPoint, count);

    const history = computPhaseFlow_tensor(
      vectorField.get_vectors_tensor,
      initial_time,
      duration,
      randomPoint
    );

    for (let i = 0; i < count; i++) {
      const geometry = new BufferGeometry();
      const points = asVector3(history.gather(i, 2).transpose());

      geometry.setFromPoints(points);

      const line = new Line(geometry, lineMaterial);

      this.add(line);
    }
  }
}
