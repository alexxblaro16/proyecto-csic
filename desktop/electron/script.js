
import * as THREE from "three";
import { HDRLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// Image
const imagePath = './src/assets/glasshouse_interior_2k.hdr';

// Renderer creation and upload
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Scene creation
const scene = new THREE.Scene();

// Camera creation
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// 360 Image loader
new HDRLoader().load(imagePath, function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
});

// Camera controls
const orbit = new OrbitControls(camera, renderer.domElement)
orbit.enableZoom=false;
orbit.enablePan=false;

// Does not work if set to 0, 0, 0
// The AxesHelper Object doesnt appear if too close to 0, 0, 0
camera.position.set(0, 0, 0.01);
orbit.update();

// Test Box
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeometry, boxMaterial)
scene.add(box);
box.position.set(-2,7,-10);
function show() {
    box.position.set(-2,0,-10);
}

// Test Sprite
const map = new THREE.TextureLoader().load( './src/assets/smile.png' );
const material = new THREE.SpriteMaterial( { map: map, transparent: true} );
const sprite = new THREE.Sprite( material );
scene.add( sprite );
sprite.position.set(-2,0,-10);
sprite.scale.set(5,5,5);

// To keep track of mouse
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

// Runs when the mouse moves
// Gets its position
window.addEventListener('mousemove', function(e){
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Runs when clicking the mouse
// dblclick can also be used
window.addEventListener('click', function(){

    raycaster.setFromCamera(mouse, camera);
    var list = [box];
    
    // Checks if it found any of the objects in the list
    // Or, just use the name directly (has to be array form)
    if (raycaster.intersectObjects(list).length > 0)
    {
    sprite.position.set(-2, -7, -10);
    }

    if (raycaster.intersectObjects([sprite]).length > 0)
    {
    sprite.position.set(-2, 0, -10);
    }
});

// Run loop
function animate() {
    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate);