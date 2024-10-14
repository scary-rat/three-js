import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


// lil gui

/* 

    aba hami yesma chai lil gui use grera 3d objects lie browser batai control garxam
    lil gui use grera hami folders banauna sakxam which contains properties of that object
    eg:
    material 
    lights
    texture
    yo sab ko properties ko hami folder banau na sakxam ani tesle browser mai hami hamro 3d object ma changes haru garna sakxam

*/


let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(69, window.innerWidth / window.innerHeight, 0.1, 100)

camera.position.z = 5

scene.add(camera)

const textureLoader = new THREE.TextureLoader()

const textureColor = textureLoader.load("./textures/cardboard-texture/paper_0025_color_1k.jpg")
const textureRoughness = textureLoader.load("./textures/cardboard-texture/paper_0025_roughness_1k.jpg")
const textureNormal = textureLoader.load("./textures/cardboard-texture/paper_0025_normal_opengl_1k.jpg")
const textureHeight = textureLoader.load("./textures/cardboard-texture/paper_0025_height_1k.jpg")


let cylinder = new THREE.BoxGeometry(3, 1.8, 2, 100, 100)

let material = new THREE.MeshStandardMaterial({ map: textureColor, roughnessMap: textureRoughness, normalMap: textureNormal, displacementMap: textureHeight, displacementScale: 0.01 })

let mesh = new THREE.Mesh(cylinder, material)

scene.add(mesh)

//  ---- ai lightning ----

// Add studio lighting

// Create an ambient light for overall illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Create a key light (main directional light)
const keyLight = new THREE.DirectionalLight(0xffffff, 1);
keyLight.position.set(5, 5, 5);
scene.add(keyLight);

// Create a fill light (softer light from the opposite side)
const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
fillLight.position.set(-5, 3, -5);
scene.add(fillLight);

// Create a back light for rim lighting effect
const backLight = new THREE.DirectionalLight(0xffffff, 0.7);
backLight.position.set(0, 5, -5);
scene.add(backLight);

// Optional: Add a point light for specular highlights
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(2, 2, 2);
scene.add(pointLight);



// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Add high-intensity directional light
const highIntensityLight = new THREE.DirectionalLight(0xffffff, 2.0);
highIntensityLight.position.set(5, 10, 7).normalize();
scene.add(highIntensityLight);


// Add helper lights

// Add a hemisphere light helper
const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(hemisphereLight);

const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.5);
scene.add(hemisphereLightHelper);

// Add a directional light helper for the key light
const keyLightHelper = new THREE.DirectionalLightHelper(keyLight, 1);
scene.add(keyLightHelper);

// Add a directional light helper for the fill light
const fillLightHelper = new THREE.DirectionalLightHelper(fillLight, 1);
scene.add(fillLightHelper);

// Add a directional light helper for the back light
const backLightHelper = new THREE.DirectionalLightHelper(backLight, 1);
scene.add(backLightHelper);

// Add a point light helper
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper);

// Add a grid helper to visualize the 3D space
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

//  ---- ai lightning end ----


const canvas = document.querySelector('#canvas');

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);




const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true
controls.dampingFactor = 0.01

// --- lil gui folder ---

// Initialize GUI
const gui = new GUI();

// Create folders
// mainly folder chai yo mesh folder jasto hunxa, yo sab mahile ai le banako code ho but yo mesh folder jasto hunxa mostly
// yesma k greko vani hamile k k value haru browser ma set garnu xa teslie hamile folder ma add greko 
const meshFolder = gui.addFolder('Mesh');

// Position
meshFolder.add(mesh.position, 'x', -5, 5, 0.1).name('Position X');
meshFolder.add(mesh.position, 'y', -5, 5, 0.1).name('Position Y');
meshFolder.add(mesh.position, 'z', -5, 5, 0.1).name('Position Z');

// Rotation
meshFolder.add(mesh.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotation X');
meshFolder.add(mesh.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotation Y');
meshFolder.add(mesh.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotation Z');

// Scale
meshFolder.add(mesh.scale, 'x', 0.1, 2, 0.1).name('Scale X');
meshFolder.add(mesh.scale, 'y', 0.1, 2, 0.1).name('Scale Y');
meshFolder.add(mesh.scale, 'z', 0.1, 2, 0.1).name('Scale Z');

// Material properties
meshFolder.add(mesh.material, 'roughness', 0, 1, 0.01).name('Roughness');
meshFolder.add(mesh.material, 'metalness', 0, 1, 0.01).name('Metalness');

// aba yo chai mesh.material.displacementMap xa vani matra add garxa natra add gardaina
// Displacement scale (if applicable)
if (mesh.material.displacementMap) {
    meshFolder.add(mesh.material, 'displacementScale', 0, 0.1, 0.001).name('Displacement Scale');
}

// yesle chai by default folder open grera rakhni ki close garni tyo vanxa
meshFolder.open();


// Create a folder for material properties
const materialFolder = gui.addFolder('Material');

// Color
materialFolder.addColor(mesh.material, 'color').name('Color');

// Opacity
materialFolder.add(mesh.material, 'opacity', 0, 1, 0.01).name('Opacity');
materialFolder.add(mesh.material, 'transparent').name('Transparent');

// Side rendering
materialFolder.add(mesh.material, 'side', {
    Front: THREE.FrontSide,
    Back: THREE.BackSide,
    Double: THREE.DoubleSide
}).name('Side');

// Wireframe
materialFolder.add(mesh.material, 'wireframe').name('Wireframe');

// Texture properties (if applicable)
if (mesh.material.map) {
    materialFolder.add(mesh.material.map.repeat, 'x', 0.1, 5, 0.1).name('Texture Repeat X');
    materialFolder.add(mesh.material.map.repeat, 'y', 0.1, 5, 0.1).name('Texture Repeat Y');
    materialFolder.add(mesh.material.map, 'wrapS', {
        Repeat: THREE.RepeatWrapping,
        Clamp: THREE.ClampToEdgeWrapping,
        Mirror: THREE.MirroredRepeatWrapping
    }).name('Wrap Horizontal');
    materialFolder.add(mesh.material.map, 'wrapT', {
        Repeat: THREE.RepeatWrapping,
        Clamp: THREE.ClampToEdgeWrapping,
        Mirror: THREE.MirroredRepeatWrapping
    }).name('Wrap Vertical');
}

materialFolder.close();


// Create a folder for lighting controls
const lightingFolder = gui.addFolder('Lighting');

// Ambient Light
const ambientLightFolder = lightingFolder.addFolder('Ambient Light');
ambientLightFolder.add(ambientLight, 'intensity', 0, 2, 0.01).name('Intensity');
ambientLightFolder.addColor(ambientLight, 'color').name('Color');

// Key Light (Directional Light)
const keyLightFolder = lightingFolder.addFolder('Key Light');
keyLightFolder.add(keyLight, 'intensity', 0, 2, 0.01).name('Intensity');
keyLightFolder.addColor(keyLight, 'color').name('Color');
keyLightFolder.add(keyLight.position, 'x', -10, 10, 0.1).name('Position X');
keyLightFolder.add(keyLight.position, 'y', -10, 10, 0.1).name('Position Y');
keyLightFolder.add(keyLight.position, 'z', -10, 10, 0.1).name('Position Z');
keyLightFolder.add(keyLight.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotation X');
keyLightFolder.add(keyLight.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotation Y');
keyLightFolder.add(keyLight.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotation Z');

// Fill Light (Directional Light)
const fillLightFolder = lightingFolder.addFolder('Fill Light');
fillLightFolder.add(fillLight, 'intensity', 0, 2, 0.01).name('Intensity');
fillLightFolder.addColor(fillLight, 'color').name('Color');
fillLightFolder.add(fillLight.position, 'x', -10, 10, 0.1).name('Position X');
fillLightFolder.add(fillLight.position, 'y', -10, 10, 0.1).name('Position Y');
fillLightFolder.add(fillLight.position, 'z', -10, 10, 0.1).name('Position Z');
fillLightFolder.add(fillLight.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotation X');
fillLightFolder.add(fillLight.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotation Y');
fillLightFolder.add(fillLight.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotation Z');

// Back Light (Directional Light)
const backLightFolder = lightingFolder.addFolder('Back Light');
backLightFolder.add(backLight, 'intensity', 0, 2, 0.01).name('Intensity');
backLightFolder.addColor(backLight, 'color').name('Color');
backLightFolder.add(backLight.position, 'x', -10, 10, 0.1).name('Position X');
backLightFolder.add(backLight.position, 'y', -10, 10, 0.1).name('Position Y');
backLightFolder.add(backLight.position, 'z', -10, 10, 0.1).name('Position Z');
backLightFolder.add(backLight.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotation X');
backLightFolder.add(backLight.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotation Y');
backLightFolder.add(backLight.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotation Z');


// Point Light
const pointLightFolder = lightingFolder.addFolder('Point Light');
pointLightFolder.add(pointLight, 'intensity', 0, 2, 0.01).name('Intensity');
pointLightFolder.addColor(pointLight, 'color').name('Color');
pointLightFolder.add(pointLight.position, 'x', -10, 10, 0.1).name('Position X');
pointLightFolder.add(pointLight.position, 'y', -10, 10, 0.1).name('Position Y');
pointLightFolder.add(pointLight.position, 'z', -10, 10, 0.1).name('Position Z');
pointLightFolder.add(pointLight.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotation X');
pointLightFolder.add(pointLight.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotation Y');
pointLightFolder.add(pointLight.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotation Z');

// Hemisphere Light
const hemisphereLightFolder = lightingFolder.addFolder('Hemisphere Light');
hemisphereLightFolder.add(hemisphereLight, 'intensity', 0, 2, 0.01).name('Intensity');
hemisphereLightFolder.add(hemisphereLight.position, 'x', -10, 10, 0.1).name('Position X');
hemisphereLightFolder.add(hemisphereLight.position, 'y', -10, 10, 0.1).name('Position Y');
hemisphereLightFolder.add(hemisphereLight.position, 'z', -10, 10, 0.1).name('Position Z');
hemisphereLightFolder.add(hemisphereLight.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotation X');
hemisphereLightFolder.add(hemisphereLight.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotation Y');
hemisphereLightFolder.add(hemisphereLight.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotation Z');
hemisphereLightFolder.addColor({ color: hemisphereLight.color.getHex() }, 'color')
    .name('Sky Color')
    .onChange((value) => {
        hemisphereLight.color.setHex(value);
    });
hemisphereLightFolder.addColor({ color: hemisphereLight.groundColor.getHex() }, 'color')
    .name('Ground Color')
    .onChange((value) => {
        hemisphereLight.groundColor.setHex(value);
    });

lightingFolder.close();

// --- lil gui folder end ---


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
