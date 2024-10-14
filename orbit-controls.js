import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// orbit controls

/* 

    orbit contols vneko chai hamilie mouse le hamro 3d object / mesh lie move garni power dinxa

*/


let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(69, window.innerWidth / window.innerHeight, 0.1, 100)

camera.position.z = 5

scene.add(camera)

let cube = new THREE.BoxGeometry(1, 1, 1)

let material = new THREE.MeshBasicMaterial({ color: "red" })

let mesh = new THREE.Mesh(cube, material)

scene.add(mesh)




const canvas = document.querySelector('#canvas');

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);



// hami yeha neri orbit controls lie halxam
// always remember ki orbit controls chai camera ra renderer paxi auxa kina ki orbit conrols ko lagi camera ra renderer chahinxa

const controls = new OrbitControls(camera, renderer.domElement);

// enable damping gre paxi chai slow / transition way ma hamro 3d object stop hunxa mouse le ghumayepaxi
controls.enableDamping = true

// hami controls le pani auto rotate garna sakxam instead of adding tyo mesh.rotation.y = clock.getElapsedTime()
controls.autoRotate = true

// hami aba orbit contols ko dherai yestai controls haru documentation ma pauxam, some exmples
controls.enableZoom = false

// jati kam testi slow stop hunxa 
controls.dampingFactor = 0.01



window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

function animate() {
    window.requestAnimationFrame(animate)
    // mesh.rotation.y = clock.getElapsedTime()
    renderer.render(scene, camera)

    // aba jasto hamro mesh render vairako xa each frame ma testai hami controls lie pani update garni
    controls.update()

}

window.requestAnimationFrame(animate)
