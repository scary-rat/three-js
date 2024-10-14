import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// texture

/* 

    texture vneko chai tyo texture haru k, leather jasto, wood jasto testo testo
    aba texture lie hami load garnu parxa tesko lagi hami euta texture loader banauxam
    yo euta loader banaye paxi pugxa, yo loader le jati pani texture load garna milxa
    // yo chai hami geometry haru vanda agidi load garxam

*/







let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(69, window.innerWidth / window.innerHeight, 0.1, 100)

camera.position.z = 5

scene.add(camera)

// aba texture loader initialise garxam
const textureLoader = new THREE.TextureLoader()

// ani aba loader le texture lie load garxam
// texture ko color, roughness, normal, height sab load garni ani teslie box geometry ma map pani garni
const textureColor = textureLoader.load("./textures/cardboard-texture/paper_0025_color_1k.jpg")
const textureRoughness = textureLoader.load("./textures/cardboard-texture/paper_0025_roughness_1k.jpg")
const textureNormal = textureLoader.load("./textures/cardboard-texture/paper_0025_normal_opengl_1k.jpg")
const textureHeight = textureLoader.load("./textures/cardboard-texture/paper_0025_height_1k.jpg")


let cylinder = new THREE.BoxGeometry(3, 1.8, 2, 100, 100)

// aba hami yesma chai tyo texture color lie map garxam
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
