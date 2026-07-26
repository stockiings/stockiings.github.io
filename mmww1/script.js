import * as THREE from
  'https://cdn.jsdelivr.net/npm/three@0.180/build/three.module.js';

//setup stuff
const keys={} //stores keys
let mouse_x=0
let mouse_y=0
const look_sensitivity=0.002
let yaw =0
let pitch=0
const direction = new THREE.Vector3();
const textureLoader = new THREE.TextureLoader();
const target_texture = textureLoader.load(
    "https://stockiings.github.io/main_assets/images/34e27b589385f3f9e421b5bf41e05c8f-removebg-preview.png"
);



document.body.addEventListener("click", () => {
    document.body.requestPointerLock();
});

window.addEventListener("keydown", (event) => {
    keys[event.key] = true //logs keydown
});

window.addEventListener("keyup", (event) => {
    keys[event.key] = false; // logs keyup
});

document.addEventListener("mousemove", (event) =>{
  if (document.pointerLockElement === document.body){

    
    yaw-= event.movementX * look_sensitivity
    pitch-= event.movementY * look_sensitivity
    pitch = Math.max(
      -Math.PI / 2,
      Math.min(Math.PI / 2, pitch)
    )
  };
});

//scene setup
  const clock = new THREE.Clock();
  const axes = new THREE.AxesHelper(5);
  const scene= new THREE.Scene() //makes the 3d scene
  const camera= new THREE.PerspectiveCamera( //makes the 3d camera
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

//load all GAME variables
const player_speed=5;
const player = new THREE.Object3D();
scene.add(player);
player.add(camera);

const target_geometry= new THREE.PlaneGeometry(
  2,
  2
)
const target_material = new THREE.MeshBasicMaterial({
  map: target_texture,
  transparent: true
});

const target_plane = new THREE.Mesh(
  target_geometry,
  target_material
);
scene.add(target_plane);

const ground_geometry = new THREE.PlaneGeometry( //plane geometry (GROUND)
  20, //l
  20  //h
);

const ground_material = new THREE.MeshBasicMaterial({ //plane material
  color: 0x228822,
  side: THREE.DoubleSide
});

const ground= new THREE.Mesh( //plane object (GROUND)
  ground_geometry,
  ground_material
);


player.position.z=6

scene.add(ground); //adds the ground

ground.rotation.x = Math.PI / 2;



camera.position.y = 1.7;
target_plane.position.y=1;


scene.add(axes);

function update(){
  const delta = clock.getDelta();

  const forward = new THREE.Vector3();
  const right =  new THREE.Vector3();
  const movement = new THREE.Vector3();

  camera.getWorldDirection(forward);
  forward.y=0
  forward.normalize();
  right.crossVectors(
    camera.up,
    forward
  );
  
  if (keys["w"]){
    movement.add(forward);
    console.log(player.position.x , player.position.z)
  };
  if (keys["s"]){
    movement.sub(forward);
    console.log(player.position.x , player.position.z)
  };
  if (keys["a"]){
    movement.add(right);
    console.log(player.position.x , player.position.z)
  };
  if (keys["d"]){
    movement.sub(right);
    console.log(player.position.x , player.position.z)
  };
  
  player.rotation.y=yaw;
  camera.rotation.x=pitch;

    player.position.add(
        movement.multiplyScalar(player_speed * delta)
    );
  

    
}

function draw(){
  requestAnimationFrame(draw);
  update();
  

  renderer.render(
    scene,
    camera
                 
  );
};
update();
draw();
