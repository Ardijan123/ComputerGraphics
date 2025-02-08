// Import Three.js libraries
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';



const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 5);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1, 0);
controls.update();

const classroomGeometry = new THREE.BoxGeometry(10, 5, 10);
const classroomMaterials = [
    new THREE.MeshBasicMaterial({ color: 0xcccccc }), 
    new THREE.MeshBasicMaterial({ color: 0xcccccc }), 
    new THREE.MeshBasicMaterial({ color: 0xeeeeee }), 
    new THREE.MeshBasicMaterial({ color: 0x888888 }), 
    new THREE.MeshBasicMaterial({ color: 0xcccccc }), 
    new THREE.MeshBasicMaterial({ color: 0xcccccc }), 
];
const classroom = new THREE.Mesh(classroomGeometry, classroomMaterials);
classroom.material.forEach(mat => mat.side = THREE.BackSide);
scene.add(classroom);


const windowTexture = new THREE.TextureLoader().load('textures/window.jpg');
const window1Geometry = new THREE.PlaneGeometry(6, 3);
const window1Material = new THREE.MeshBasicMaterial({ map: windowTexture });
const window1 = new THREE.Mesh(window1Geometry, window1Material);
window1.position.set(-4.9, 0, -2);
window1.rotation.y = Math.PI / 2;
scene.add(window1);





const blackboardGeometry = new THREE.PlaneGeometry(8, 3);
const blackboardMaterial = new THREE.MeshBasicMaterial({ color: 0x88888888 });
const blackboard = new THREE.Mesh(blackboardGeometry, blackboardMaterial);
blackboard.position.set(0, 0, -4.9);
scene.add(blackboard);



const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(0, 4.5, 0);
scene.add(pointLight);


const loader = new GLTFLoader();
loader.load('models/desk_chair.glb', (gltf) => {
    const deskAndChair = gltf.scene;
    deskAndChair.scale.set(0.2, 0.2, 0.2);

    
    const pairs = [
        { x: 5, z: -10 },
        { x: 8, z: -10 },
        { x: 8, z: -7 },
        { x: 5, z: -7 },
        
    ];

    pairs.forEach((pair) => {
        const deskClone = deskAndChair.clone();
        deskClone.position.set(pair.x, -2.6, pair.z);
        deskClone.rotation.y = -55;
        scene.add(deskClone);
    });




function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

})