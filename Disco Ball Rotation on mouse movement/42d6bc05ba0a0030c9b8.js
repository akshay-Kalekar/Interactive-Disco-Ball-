import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { WireframeGeometry } from "three";
const textureLoader = new THREE.TextureLoader(),
  normalTexture = textureLoader.load("/texture/disco.png"),
  scene = new THREE.Scene(),
  geometry = new THREE.SphereBufferGeometry(0.5, 50, 50),
  material = new THREE.MeshStandardMaterial();
(material.metalness = 0.7),
  (material.roughness = 0.2),
  (material.color = new THREE.Color(2697513)),
  (material.normalMap = normalTexture);
const sphere1 = new THREE.Mesh(geometry, material),
  sphere2 = new THREE.Mesh(geometry, material),
  sphere3 = new THREE.Mesh(geometry, material);
scene.add(sphere1, sphere2, sphere3),
  sphere1.position.set(-2, 1.5, -3.5),
  sphere2.position.set(0, 1, -2),
  sphere3.position.set(2, 1.5, -3.5);
const pointLight1 = new THREE.DirectionalLight(1845207, 10);
pointLight1.position.set(0, -5.46, -2.05),
  (pointLight1.castShadow = !0),
  scene.add(pointLight1),
  (pointLight1.shadow.mapSize.width = 512),
  (pointLight1.shadow.mapSize.height = 512),
  (pointLight1.shadow.camera.near = 0.5),
  (pointLight1.shadow.camera.far = 500),
  scene.add(pointLight1);
const pointLight2 = new THREE.PointLight(11144397, 3.02);
pointLight2.position.set(0.14, 3, -0.75), scene.add(pointLight2);
const sizes = { width: window.innerWidth, height: window.innerHeight };
window.addEventListener("resize", () => {
  (sizes.width = window.innerWidth),
    (sizes.height = window.innerHeight),
    (camera.aspect = sizes.width / sizes.height),
    camera.updateProjectionMatrix(),
    renderer.setSize(sizes.width, sizes.height),
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
(camera.position.x = 0),
  (camera.position.y = -0.75),
  (camera.position.z = 2),
  scene.add(camera);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".webgl"),
});
renderer.setSize(sizes.width, sizes.height),
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
const spaceTexture = new THREE.TextureLoader().load();
scene.background = spaceTexture;
let mouseX = 0,
  mouseY = 0,
  targetX = 0,
  targetY = 0;
const windowHalfX = window.innerWidth / 2,
  windowHalfY = window.innerHeight / 2;
function onDocumentMouseMove(e) {
  (mouseX = e.clientX - windowHalfX), (mouseY = e.clientY - windowHalfY);
}
document.addEventListener("mousemove", onDocumentMouseMove);
const updateSphere = (e) => {
  (sphere1.position.y = 1.5 + 0.002 * window.scrollY),
    (sphere2.position.y = 1 + 0.002 * window.scrollY),
    (sphere3.position.y = 1.5 + 0.002 * window.scrollY);
};
document.addEventListener("scroll", updateSphere);
const clock = new THREE.Clock(),
  tick = () => {
    (targetX = 0.001 * mouseX), (targetY = 0.001 * mouseY);
    const e = clock.getElapsedTime();
    (sphere1.rotation.y = 2 * e * targetX),
      (sphere2.rotation.y = 2 * e * targetX),
      (sphere3.rotation.y = 2 * e * targetX),
      renderer.render(scene, camera),
      window.requestAnimationFrame(tick);
  };
tick();
