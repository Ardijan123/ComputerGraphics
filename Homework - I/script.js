import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(15, 20, 15);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);


const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

const grassGeometry = new THREE.PlaneGeometry(40, 40);
const grassMaterial = new THREE.MeshLambertMaterial({ color: 0x00a000 });
const grass = new THREE.Mesh(grassGeometry, grassMaterial);
grass.rotation.x = -Math.PI / 2;
scene.add(grass);

const roadGeometry = new THREE.PlaneGeometry(4, 40);
const roadMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.rotation.x = -Math.PI / 2;
road.position.set(0, 0.01, 0); 
scene.add(road);

function createBuilding(x, y, z, width, height, depth, color) {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshPhongMaterial({ color, shininess: 50 });
  const building = new THREE.Mesh(geometry, material);
  building.position.set(x, height / 2, z); 
  scene.add(building);
  return building;
}

createBuilding(-6, 4, -2, 2, 8, 2, 0xffffff); 
createBuilding(0, 3, -6, 2, 6, 2, 0x0000ff);  
createBuilding(-3, 2.5, 3, 2, 5, 3, 0x555555); 
createBuilding(3, 3.5, 3, 3, 7, 2, 0x777777); 

const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-4, 0.5, -4);
scene.add(sphere);

gsap.to(sphere.position, {
  x: 5 * Math.cos(Math.PI * 2),
  z: 5 * Math.sin(Math.PI * 2),
  duration: 5,
  repeat: -1,
  ease: "power1.inOut",
  modifiers: {
    x: gsap.utils.unitize(x => 5 * Math.cos(x)),
    z: gsap.utils.unitize(z => 5 * Math.sin(z))
  }
});

function createTree(x, z) {
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1, 12), new THREE.MeshBasicMaterial({ color: 0x8b4513 }));
  trunk.position.set(x, 0.5, z);
  scene.add(trunk);

  const foliage = new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 12), new THREE.MeshBasicMaterial({ color: 0x228b22 }));
  foliage.position.set(x, 1.5, z);
  scene.add(foliage);
}

createTree(-3, -3);
createTree(-3, 3);
createTree(3, -3);
createTree(3, 3);

function animate() {
  requestAnimationFrame(animate);
  controls.update(); 
  renderer.render(scene, camera);
}
animate();
