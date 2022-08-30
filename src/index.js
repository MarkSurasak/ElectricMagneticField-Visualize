import * as THREE from "three";
import { GUI } from "dat.gui";
import Stats from "three/examples/jsm/libs/stats.module";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Clock } from "three";

import { Solenoid, Line } from "./math/Curves.js";

import * as controllers from "./controller/Controllers";

export const clock = new Clock();

// initialize
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(20, 5, 20);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const stats = Stats();
document.body.appendChild(stats.dom);

//setup gui
export const gui = new GUI();

const setting = {
  current_curve: "Solenoid",
  current_curve_index: 0,
  particle: {
    generate_particle: generateParticle,
    clear_all_particle: clearParticle,
    particle_count: 10
  }
};

const grid = new THREE.GridHelper(50, 50);
const axis = new THREE.AxesHelper(5);

//creating object geo material yada yada
const copper_material = new THREE.MeshPhongMaterial({ color: "orange" });

//curves
const curves = [new Solenoid(), new Line()];

let particle_menues, curve_menues;

const curve_names = curves.map((curve) => {
  return curve.name;
});

//Curves Geometries
const curves_geometries = curves.map((curve) => {
  return new THREE.TubeGeometry(curve, 1000, 0.05, 8);
});

//Curves Mesh
const curves_meshes = curves_geometries.map((curve) => {
  return new THREE.Mesh(curve, copper_material);
});

const curves_group = new THREE.Group();
curves_meshes.forEach((mash) => {
  curves_group.add(mash);
});

function onCurvePropertyChange() {
  let curve = curves[setting.current_curve_index];

  curves_group.children[
    setting.current_curve_index
  ].geometry = new THREE.TubeGeometry(curve, 1000, 0.05, 8);
}

function onCurveChange() {
  for (let i = 0; i < curves.length; i++) {
    const curve = curves_group.children[i];
    const menu = curve_menues[i];

    if (i !== setting.current_curve_index) {
      curve.visible = false;
      menu.hide();
    } else {
      curve.visible = true;
      menu.show();
    }
  }
}

function generateParticle() {}

function clearParticle() {}

function initialGUI() {
  //add gui
  gui.add(grid, "visible").name("show grid");
  gui.add(axis, "visible").name("show axis");

  particle_menues = gui.addFolder("Particle");

  particle_menues.add(setting.particle, "particle_count");
  particle_menues.add(setting.particle, "generate_particle");

  gui
    .add(setting, "current_curve", curve_names)
    .name("curve")
    .onFinishChange((value) => {
      setting.current_curve_index = curve_names.indexOf(setting.current_curve);
      onCurveChange();
    });

  curve_menues = curves.map((curve) => {
    return controllers.addCurveController(curve, onCurvePropertyChange);
  });
}

function initialScene() {
  //add lights
  const ambiant = new THREE.AmbientLight(0x404040);
  const light = new THREE.PointLight(0xff0000, 1, 100);
  light.position.set(5, 5, 5);

  // set control poperties
  controls.enableDamping = true;

  // add mesh to the scene
  scene.add(ambiant);
  scene.add(light);
  scene.add(grid, axis);
  scene.add(curves_group);
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  stats.update();
  renderer.render(scene, camera);
}

function onResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
}

initialScene();
initialGUI();
animate();
onCurvePropertyChange();
onCurveChange();

console.log(this);

window.addEventListener("resize", onResize);
window.addEventListener("visibilitychange", () => {
  if (clock.running) {
    clock.stop();
  } else {
    clock.start();
  }
});
