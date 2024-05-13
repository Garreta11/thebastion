import * as THREE from 'three';
import Experience from './Experience.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import gsap from 'gsap';

export default class Camera {
  constructor(_options) {
    // Options
    this.experience = new Experience();
    this.config = this.experience.config;
    this.debug = this.experience.debug;
    this.time = this.experience.time;
    this.sizes = this.experience.sizes;
    this.targetElement = this.experience.targetElement;
    this.scene = this.experience.scene;

    // Set up
    this.mode = 'debug'; // defaultCamera \ debugCamera

    this.setInstance();
    this.setModes();
  }

  setInstance() {
    // Set up
    this.instance = new THREE.PerspectiveCamera(
      75,
      this.config.width / this.config.height,
      0.1,
      10000
    );
    this.instance.rotation.reorder('YXZ');

    this.scene.add(this.instance);
  }

  setModes() {
    this.modes = {};

    // Default
    this.modes.default = {};
    this.modes.default.instance = this.instance.clone();
    this.modes.default.instance.rotation.reorder('YXZ');

    // Debug
    this.modes.debug = {};
    this.modes.debug.instance = this.instance.clone();
    this.modes.debug.instance.rotation.reorder('YXZ');
    this.modes.debug.instance.position.set(0, 10, 50);
    // this.modes.debug.instance.position.set(0, 0, 10);

    this.modes.debug.orbitControls = new OrbitControls(
      this.modes.debug.instance,
      this.targetElement
    );
    this.modes.debug.orbitControls.enabled = this.modes.debug.active;
    this.modes.debug.orbitControls.enableDamping = true;
    this.modes.debug.orbitControls.minDistance = 30;
    this.modes.debug.orbitControls.maxDistance = 90;
    this.modes.debug.orbitControls.enablePan = false;
    this.modes.debug.orbitControls.autoRotate = true;
    this.modes.debug.orbitControls.autoRotateSpeed = 0.3;
    this.modes.debug.orbitControls.maxPolarAngle = Math.PI / 2 - 0.15;
  }

  resize() {
    this.instance.aspect = this.config.width / this.config.height;
    this.instance.updateProjectionMatrix();

    this.modes.default.instance.aspect = this.config.width / this.config.height;
    this.modes.default.instance.updateProjectionMatrix();

    this.modes.debug.instance.aspect = this.config.width / this.config.height;
    this.modes.debug.instance.updateProjectionMatrix();
  }

  update() {
    // Update debug orbit controls
    if (this.modes.debug.orbitControls) this.modes.debug.orbitControls.update();

    // Apply coordinates
    this.instance.position.copy(this.modes[this.mode].instance.position);
    this.instance.quaternion.copy(this.modes[this.mode].instance.quaternion);
    this.instance.updateMatrixWorld(); // To be used in projection
  }

  destroy() {
    this.modes.debug.orbitControls.destroy();
  }
}
