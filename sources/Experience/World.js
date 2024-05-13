import * as THREE from 'three';
import Experience from './Experience.js';
import gsap from 'gsap';
import Cloud from './Cloud.js';

export default class World {
  constructor(_options) {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;

    this.resources.on('groupEnd', (_group) => {
      if (_group.name === 'base') {
        //this.setDummy();
        this.setScene();
        this.createClouds();
      }
    });
  }

  setDummy() {
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({ color: 0xff0000 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    this.scene.add(cube);
  }

  setScene() {
    const map = this.resources.items.scene.scene;
    map.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // child.material = new THREE.MeshNormalMaterial();
      }
    });
    console.log(map);
    map.scale.set(0.1, 0.1, 0.1);
    this.scene.add(map);
  }

  createClouds() {
    this.clouds = [];
    for (let i = 0; i < 40; i++) {
      this.cloud = new Cloud();
      this.clouds.push(this.cloud);
    }
  }

  resize() {}

  update() {
    if (this.clouds) {
      for (let i = 0; i < this.clouds.length; i++) {
        this.clouds[i].update();
      }
    }
  }

  destroy() {}
}
