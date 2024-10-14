import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// cylinder geometry

/* 

    just cylinder geometry ko little padhni
    ani hami side face ra open ended haru pani padhni ali ali

*/


let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(69, window.innerWidth / window.innerHeight, 0.1, 100)

camera.position.z = 5

scene.add(camera)

// CylinderGeometry
// (radiusTop : Float, radiusBottom : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)

// open ended true vneko chai, bottom ra top face delete hunxa
// ani yesto vye paxi, paxadi ko pani dekhi daina
// kina ki jaba browser ma 3d object render hunxa ni, teti khera only the front side, i.e hami jun side dekhi rako xam tehi side matra render hunxa
// to just show the user viewing side, to save the resources

// tara hamile orbit control haru use gre paxi ta we can rotate ani see from top, testo garda ta half matra dekhiyo
// to save the resources, aba hamilie paxadi ko side pani render garnu xa vani hamile material lie side: THREE.DoubleSide property pani dinu parxa

let cylinder = new THREE.CylinderGeometry(2, 2, 2, 10, 10, true)

let material = new THREE.MeshBasicMaterial({ color: "red", side: THREE.DoubleSide })

let mesh = new THREE.Mesh(cylinder, material)

scene.add(mesh)




const canvas = document.querySelector('#canvas');

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);




const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true
controls.autoRotate = true
controls.enableZoom = false
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
