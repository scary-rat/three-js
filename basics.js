/*

    yo chai three js ko default cude render garna ko lagi code ho
    boiler plate code jasto ho

*/

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 5;

// const canvas = document.querySelector('#canvas');

// const renderer = new THREE.WebGLRenderer({ canvas: canvas });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);



// function animate() {
//     renderer.render(scene, camera);
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
// }
// renderer.setAnimationLoop(animate);

// learning started

/* 

    yo chai three js ko default cude render garna ko lagi code ho
    boiler plate code jasto ho
    
    1. scene
    2. camera
    3. mesh => geometry + material
    4. renderer
    5. request animation frame

    three js ma pani 3d object lie render garna ko lagi first ma ta scene chahinxa, ani camera pani chinxa ani mesh chinxa which is made of geometry and material
    ani last ma renderer pani chahinxa tyo sab kura lie render garna

    1. scene : scence vneko chai afno 3d ko complete world. visible objects through camera + other objects which is not currently visivle in camera

 */

// so hami first ma scene banauxam

let scene = new THREE.Scene();

// aba three js ma camera define garna chai perspective camera use garnu parxa re
// yesma chai 4 arguments hunxa
// FOV (field of view) :  yo chai given moment ma scene ko kati part dekhinxa yesle define garxa re
// aspect ration : hamro screen ko aspect ration kati xa testo k so hamro screen ma preoperly dekhios, tesko lagi hamle device ko screen ko ratio leko xa using window.innerWidth / window.innerWidth
// near : yo vanda najik ko object hamilie dekhi daina
// far : yo vanda tada ko object pani hamilie dekhidaina

// THREE.PerspectiveCamera(field of view, aspect ration, near, far)
let camera = new THREE.PerspectiveCamera(69, window.innerWidth / window.innerHeight, 0.1, 100)

// hamilie camera position chai ali far chahinxa natra ta object deki daina
// default camera postion kahilai hunnxa re, camera should always be set with postion
camera.position.z = 5

// aba hamile banako scene ma camera haldini
scene.add(camera)

// aba hami cube banau ni, yeslie geometry pani vanxam
// geometry ma we can add materials
// tesko lagi hami chai box geometry vani three js ko object ho which contains all the points / vertices and fill faces of cube re
// yo alredy lekehko code xa k, webgl ko code, like vertice 1 yeta hunxa 2 uta hunxa testo wala
// THREE.BoxGeometry() ma chai cube ko sab vertix ra faces haru already stored xa so hami tyo use garxam

let cube = new THREE.BoxGeometry(1, 1, 1)

// aba tyo cube lie material pani hali dim, normal color material dini
let material = new THREE.MeshBasicMaterial({ color: "red" })


// aba cube banayepxi hamilie tyo cube ma mesh pani ta halnu paryo 
// bina mesh ko cube ta dekidaina kina ki mesh nai ho jasle vertices ra edges lie shape dinxa

let mesh = new THREE.Mesh(cube, material)


// aba yo mesh chai euta 3d object jasto pani ho, so aba yo mesh lie hami hamro scene ma add garam
scene.add(mesh)


// aba hami tyo canvas ma render garni so tesko lagi euta canvas variable banayera canvas element lie store garni
const canvas = document.querySelector('#canvas');


// ani tyo canvas ba dekhau na ko lagi ta euta renderer pani ta chiyo 
// so three js ko euta renderer banauni WebGLRenderer ani tesma canvas ma render garni vanni,
// like canvas key ma hamro dom ko canvas as value pass gardini

// ani tyo renderer ko size pani user ko device ko size ma fit gardini ani tespaxi animate vanni function ma hamile render gardeko xa

// antialias: true le chai lines haru smooth hunxa, natra kasto kateko dekhi rako thiyo cube ghumda

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// postion

/* 
    position x vneko chai horizontal tira, y venko chai vertical tira ani z vneko chai hami tira 

    NOTE: 3 js ma y ko value positive vneko mathi tira janxa re, ani tala lera aunu xa vani y ko value negative hunu parxa re
    noramlly hamro css ma y negative huda mathi janxa ani positive hunda tala janxa but threee js ma yo opposite hunxa re 
*/

// mesh.position.x = 1
// mesh.position.y = 1
// mesh.position.z = 1

// rotations

/* 
    rotation x, rotation y ra rotation z
    rotation x vneko chai x axis ma danda haleko xa ani tyo danda ko ori pari ghumxa 
    rotation y vneko chai straigh pol jasto hunxa ani tesma ghumxa (eg : stripper pole ma ghumeko jasto)
    rotation z vneko chai hami tira danda haleko xa ani tesma ghumxa

    NOTE : rotation chai hami dida radians ma dinu parxa re, 3 js le teslie automatically degree ma conver garxa
    so 3.14 i.e pie vneko chai 180deg ho re
*/

// mesh.rotation.x = 3.14 (i.e 180 deg)
// mesh.rotation.y = Math.PI (i.e 180 deg)
// mesh.rotation.z = Math.PI / 2 (i.e 90 deg)


// clock 
// aba hami yeuta clock banam jun chai animate function vitra use garna milxa, hamro app start huni bitikai clock init hunxa ani value auna thalxa clock ma
const clock = new THREE.Clock()


// aba responsive ko lagi pani hami kura garxam hai
// main issue k hunxa vani ni, jun size ma first render vyo tesai ma busxa yo scene
// so hami window.resize ma event listener halxam
// ani tespani hamro camera and render size haru feri update garxam

window.addEventListener("resize", () => {
    // yesle chai camera ko just aspect ration change greko 
    camera.aspect = window.innerHeight / window.innerWidth
    // ani camera ko khi pani change garda kheri camera.updateProjectMatrix() use garnu parxa re so tyo camera ko sab kura update hos
    camera.updateProjectionMatrix();

    // ani hamro renderer lie pani update greko
    renderer.setSize(window.innerWidth, window.innerHeight);
})



// aba yo function ma chai hami tyo cube lie animate garna ko lagi use greko
// animation vneko chai aba k ho vaney, hamro screen ko refresh rate ko hisbal le yo mesh / 3d object / scene and camer lie render gareko grekai garni
// suppose hmaro screen 144fps ko xa hai so 1 sec ma yo function 144 times chalxa kina ki hamile each fps ko lagi function call greko xa
// so everytime screen refresh hunxa, hamro function pani execute hunxa



function animate() {
    // yesko matlab tehi ho, screen ko refresh rate get gara ani every time screen refresh hunxa yo animate function call gara
    // animate function vitra tehi function call greko xa so it is like infinite loop
    // every time screen refresh hunxa, animate function call hunxa, ani 1 sec ma hamro screen 144 times refresh hunxa so yo function pani 144 times chalxa

    // tara yesko satta hami three js ko methos pani use garna sakxan renderer.setAnimationLoop(animate); yo wala
    // yo chai more optimised hunxa re ani yo chai animate function ko bahira use garnu parxa vitra haina, vitra just rotation ra renderer.render() use garni

    window.requestAnimationFrame(animate)

    // aba animation ko lagi hami hamro 3d object / mesh lie y axis ma rotate gardini
    // aba yesto garda kasi ko px ma fast run hunxa ani kasaiko ma slow kina ki 0.01 ta every screen refresh ma add vko xa
    // kasasi ko pc ma 60 fps hunxa kasaiko ma 144 fps, so aba 60 fps wala pc ma 1 sec ma 0.61 rotation vyo tara 144 fps pc ma ta 1.45 rotation vyo
    // so yo fix garna ko lagi pani three js le banako xa
    // tyo fix chai k ho vaney dubai ko pc ma 1 sec ma ta 1 sec nai hunxa so hami every screen refesh ko satta evey 1 sec ma rotation value change garni 
    // so three js le three js ko clock deko xa hami tyo clock yo function ko bahira store garni
    // app start huni bitikai clock ma 0 bata value badna thalxa in 0.000000000000000 seconds
    // get elapsed time le chai tyo value dinxa, yo clock ma aru pani method ra value haru xan hernu xa vani yo function bahira console log grera hera
    mesh.rotation.y = clock.getElapsedTime()

    renderer.render(scene, camera)

}
// ani aba tyo function lie call pani ta garnu paryo window.requestAnimationFrame(animate) yesko satta just animate() use grey ni huna

window.requestAnimationFrame(animate)


// tyo mathi ko satta yo use greko best re, yo chai webgl ko lagi dherai optimised xa re, tyo mathi ko ta learning ko lagi matra ho
// renderer.setAnimationLoop(animate);