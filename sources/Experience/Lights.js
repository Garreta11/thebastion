import * as THREE from 'three';
import Experience from './Experience.js';

export default class Lights {
  constructor(_options) {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setLights();
  }

  setLights() {
    const light = new THREE.AmbientLight(0x404040, 1); // soft white light

    this.scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffccaa, 1);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0.001;
    directionalLight.shadow.camera.far = 10000;
    // directionalLight.position.set(Math.random() * 50, 15, Math.random() * 50);
    directionalLight.position.set(50, 15, 50);

    directionalLight.shadow.camera.left = -150;
    directionalLight.shadow.camera.right = 150;
    directionalLight.shadow.camera.top = 150;
    directionalLight.shadow.camera.bottom = -150;

    directionalLight.shadow.mapSize.width = 2048 * 2;
    directionalLight.shadow.mapSize.height = 2048 * 2;

    directionalLight.shadow.bias = -0.0001;

    this.scene.add(directionalLight);
  }
}
