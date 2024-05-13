import * as THREE from 'three';
import Experience from './Experience.js';

export default class Cloud {
  constructor(_options) {
    this.experience = new Experience();
    this.time = this.experience.time;
    this.scene = this.experience.scene;

    this.upPosition = new THREE.Vector3(0, 2, 0);
    this.downPosition = new THREE.Vector3(0, -2, 0);

    this.createCloud();
  }

  createCloud() {
    this.clouds = new THREE.Group();
    this.cloudsshadow = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({
      transparent: true,
      color: 'white',
      alphaTest: 0.5,
    });
    const numClouds = 3 + Math.random() * (6 - 3);

    this.offset = Math.random() * 100;

    for (let i = 0; i < numClouds; i++) {
      const c1 = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 0), material);
      // c1.castShadow = true;
      c1.material.opacity = Math.random();

      const size = Math.random();
      c1.scale.set(size, size, size);
      c1.position.set(Math.random() * 4 - 2, Math.random(), Math.random());
      c1.rotation.set(0, Math.random() * Math.PI * 2, 0);

      this.clouds.add(c1);
    }

    this.clouds.rotation.set(
      0, // random rotation around x-axis
      Math.random() * Math.PI * 2, // random rotation around y-axis
      0 // random rotation around z-axis
    );

    this.clouds.position.set(
      Math.random() * 100 - 50,
      Math.random() * 10 + 10,
      Math.random() * (100 - -150) + -150
    );

    const s = 3 * Math.random();
    this.clouds.scale.set(s, s, s);

    this.scene.add(this.clouds);

    const chopBottom = (geo, bottom) => {
      const positionAttr = geo.getAttribute('position');

      for (let i = 0; i < positionAttr.count; i++) {
        const y = positionAttr.getY(i); // Get the y-coordinate of the vertex
        if (y < bottom) {
          positionAttr.setY(i, bottom); // Set the y-coordinate to the bottom value
        }
      }

      positionAttr.needsUpdate = true; // Notify Three.js that the attribute has been updated
    };
    this.clouds.children.forEach((m, i) => {
      chopBottom(m.geometry, 0);
    });
  }

  update() {
    const t = this.time.elapsed / 1000;

    const newPosition = new THREE.Vector3(
      this.clouds.position.x,
      this.clouds.position.y + 0.005 * Math.sin(t + this.offset),
      this.clouds.position.z
    );

    // Update sphere position
    this.clouds.position.copy(newPosition);
  }
}
