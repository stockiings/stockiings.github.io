import * as THREE from
  'https://cdn.jsdelivr.net/npm/three@0.180/build/three.module.js';
const scene= new THREE.Scene()
const camera= new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer= new THREE.WebGLRenderer();

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);
document.body.appendChild(renderer.domElement);

const geometry= new THREE.BoxGeometry(
  1, //l
  1, //w
  1  //h
);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000
});

const cube = new THREE.Mesh(
  geometry,
  material
);

const ground_geometry = new THREE.planeGeometry(
  20, //l
  20  //h
);

const ground_material = new THREE.meshBasicMaterial({
  color: 0x228822,
  side: THREE.DoubleSide
});

scene.add(cube);
camera.position.z=5

function animate(){
  requestAnimationFrame(animate);
  cube.rotation.y+=0.01;

  renderer.render(
    scene,
    camera
                 
  );
};
animate();
