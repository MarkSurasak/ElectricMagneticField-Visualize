import { MagneticField } from "./MagneticField";
import { Solenoid } from "../curves/Solenoid";
import { tensor } from "@tensorflow/tfjs-core";
import { Vector3 } from "three";
import { VectorField } from "../VectorField";

const solenoid = new Solenoid(5, 8, 2);
const field = new MagneticField(solenoid, 1, 100);

const position = tensor([
  [1, 0, 0],
  [1, 0, 0]
]).transpose();

position.print();

field.getVectors(0, position).print();

const minPosition = new Vector3(-1, -1, -1);
const mixPosition = new Vector3(1, 1, 1);

const [positions, directions] = field.getSampleChunk(
  0,
  minPosition,
  mixPosition,
  4,
  true
);

positions.print(true);
directions.print(true);
