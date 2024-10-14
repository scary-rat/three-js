import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { GLTFLoader, RGBELoader } from 'three/examples/jsm/Addons.js';


// using hdri light and adding 3d models

/* 
    hami yesma lightings ko lagi hdri use garxam (.hdr file) ani yesma euta hamro 3d model pani import garxam (.glb file)
    
    modal load garna ko lagi hamile import { GLTFLoader, RGBELoader } from 'three/examples/jsm/Addons.js'; garnu parxa

    modal ko lagi GLTFLoader ani hdri ko lagi RGBELoader

*/

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(69, window.innerWidth / window.innerHeight, 0.1, 100)

camera.position.z = 5

scene.add(camera)


//  ---- lightings haru ----
// lightning ko lagi chai hami hdri use garni yesma RGEBLoader use garnu parxa

const hdriLoader = new RGBELoader()

// hamro hdri file ko path diyo, tyo chai as texture call back function ko argument ma janxa
hdriLoader.load("./hdri/mud_road_puresky_1k.hdr", function (texture) {

    // ani we will have to do texture.mapping THREE.EquirectangularReflectionMapping
    // ani scene.environment = texture grey paxi tyo hamro hdri ko color haru hamro 3d object ma pauxa
    // ani scene.background = texxture garyo vani chai tyo complete hdri scene dekhinxa
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = texture
    // scene.background = texture
})


//  ---- lightings haru end ----

// aba hami euta modal loader banau ni
// gltf loader
// ani tesle hami hamro modal loade garni 
// aba hamile deko path chai as argument tyo function ma janxa as gltf ani hamile sceen ma tyo gltf ko sceen add garnu parxa to render hamro model

const modalLoader = new GLTFLoader()
modalLoader.load("./models/dragon_glass.glb", function (gltf) {
    scene.add(gltf.scene)
})


const canvas = document.querySelector('#canvas');

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);




const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true
// controls.autoRotate = true
controls.dampingFactor = 0.01





window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

function animate() {
    window.requestAnimationFrame(animate)
    renderer.render(scene, camera)

    controls.update()

}

window.requestAnimationFrame(animate)
