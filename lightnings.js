import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


// lightnings

/* 

    mainly 3 lights ma hami focus garni
    1. ambient light
    yo vneko chai sab tira bata light ako k, like no key focus, all surrounding bata light ako so yesma khi shadow haru hunna, yo chai uniform light jasto

    2. directional light 
    light euta direction bata ako hunxa

    3. point light
    yeuta point jasto k like bulb jasto light
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


// Initialize GUI
const gui = new GUI();

//  ---- lightings haru ----

// ambinet light haleko, color ra intensity argument ma pass garxam

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
scene.add(directionalLight)

// yesko argument ma chai color, intensity, distance : kati tada samma jani, decay : distance samma pugda kati ko dim vyera pugni
const pointLight = new THREE.PointLight(0xffffff, 1, 10, 2)

// hami yesari lights ko position pani set garna sakxam
pointLight.position.set(1, -1, 1)
scene.add(pointLight)



// aba hami tyo lights haru exactly ka neri xa vanera herna pani sakxam, tesko lagi helpers vanni object use garnu parxa
// yesko argument ma hamile create greko light ra tyo helper ko size pass garnu parxa
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1)

// ambient light helper chai hudo rahina xa
// const ambientLightHelper = new THREE.AmbientLightHelper(pointLight, 1)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)

// aba create gre paxi scene ma pani ta halnu parxa
scene.add(directionalLightHelper)
scene.add(pointLightHelper)





// aba hamile create greko light ko propery haru lie hami folder ma halni

// directional light

const directionalLightFolder = gui.addFolder('Directional Light');
directionalLightFolder.add(directionalLight, 'intensity', 0, 2, 0.01).name('Intensity');
directionalLightFolder.addColor(directionalLight, 'color').name('Color');
directionalLightFolder.add(directionalLight.position, 'x', -10, 10, 0.1).name('Position X');
directionalLightFolder.add(directionalLight.position, 'y', -10, 10, 0.1).name('Position Y');
directionalLightFolder.add(directionalLight.position, 'z', -10, 10, 0.1).name('Position Z');
directionalLightFolder.add(directionalLight.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotation X');
directionalLightFolder.add(directionalLight.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotation Y');
directionalLightFolder.add(directionalLight.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotation Z');

directionalLightFolder.close()

// point light
const pointLightFolder = gui.addFolder('Point Light');
pointLightFolder.add(pointLight, 'intensity', 0, 2, 0.01).name('Intensity');
pointLightFolder.addColor(pointLight, 'color').name('Color');
pointLightFolder.add(pointLight.position, 'x', -10, 10, 0.1).name('Position X');
pointLightFolder.add(pointLight.position, 'y', -10, 10, 0.1).name('Position Y');
pointLightFolder.add(pointLight.position, 'z', -10, 10, 0.1).name('Position Z');
pointLightFolder.add(pointLight.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotation X');
pointLightFolder.add(pointLight.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotation Y');
pointLightFolder.add(pointLight.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotation Z');

pointLightFolder.close()

// ambient light

const ambientLightFolder = gui.addFolder('Ambient Light');
ambientLightFolder.add(ambientLight, 'intensity', 0, 2, 0.01).name('Intensity');
ambientLightFolder.addColor(ambientLight, 'color').name('Color');
ambientLightFolder.add(ambientLight.position, 'x', -10, 10, 0.1).name('Position X');
ambientLightFolder.add(ambientLight.position, 'y', -10, 10, 0.1).name('Position Y');
ambientLightFolder.add(ambientLight.position, 'z', -10, 10, 0.1).name('Position Z');
ambientLightFolder.add(ambientLight.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotation X');
ambientLightFolder.add(ambientLight.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotation Y');
ambientLightFolder.add(ambientLight.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotation Z');

ambientLightFolder.close()



//  ---- lightings haru end ----





const canvas = document.querySelector('#canvas');

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);




const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true
// controls.autoRotate = true
controls.dampingFactor = 0.01




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
