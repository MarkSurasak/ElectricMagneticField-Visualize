import { gui } from "../index";

export const addCurveController = (curve, callBack) => {
  const folder = gui.addFolder(curve.name);

  for (let parameter of curve.parameters) {
    folder
      .add(curve, parameter.name, parameter.min, parameter.max)
      .name(parameter.name)
      .onFinishChange(callBack);
  }

  return folder;
};
