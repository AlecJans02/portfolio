import './style.css'
import * as THREE from 'three';
//import * as THREE from '/node_modules/three/build/three.module.js';
//import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//import test from './space.webp';
import reactpng from './reactlogo.png';
import javascriptpng from './javascript.png';
import csharppng from './cshaprlogo.jpg';
import csspng from './css.webp';
import htmlpng from './html.webp';
//import moonimg from './moonjpg.jpg';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render ( scene, camera );

 const geometry = new THREE.TorusGeometry( 10, 3, 16, 100);
 const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 });
 const torus = new THREE.Mesh( geometry, material );

//scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);

scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
//scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200,50);
//scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);


// particle background
const newmaterial = new THREE.PointsMaterial({
  size: 0.015
})
//newmaterial.color = new THREE.Color(0xffffff)


//test above

const particlesGeometry = new THREE.BufferGeometry;
const particlesCnt = 5000;

const posArray = new Float32Array(particlesCnt * 3);

for(let i = 0; i < particlesCnt * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 40;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

//const sphere = new THREE.Points(geometry, newmaterial);
//const particlesMesh = new THREE.Points(particlesGeometry, newmaterial);
const particlesMesh = new THREE.Points(particlesGeometry, newmaterial);
scene.add(particlesMesh);

// test below

document.addEventListener('mousemove', animateParticles);

let mouseX = 0;
let mouseY = 0;

function animateParticles(event) {
  mouseY = event.clientY;
  mouseX = event.clientX;
}

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //sphere.rotation.y = .5 * elapsedTime
    particlesMesh.rotation.x = mouseY * (elapsedTime * 0.00008)
    particlesMesh.rotation.y = mouseX * (elapsedTime * 0.00008)
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
// let starIndex = 0;
// let starIndexTwo = 0;
// let starIndexThree = 0;

// function addStar() {
//   const geometry = new THREE.SphereGeometry(0.3, 44, 44);
//   const material = new THREE.MeshStandardMaterial( { color: "#EEEEEE" });
//   const star = new THREE.Mesh( geometry, material );
//   const separation = 5; // Separation between star objects (adjust as desired)
//   const index = starIndex; // Index of the current star object

//   // Calculate the x position based on the index and separation
//   const posX = index * separation;
//   star.position.set(posX, 0, 0);
//   star.name = 'star';

//   //const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );
//   //document.addEventListener('mousemove', updateStarPosition);
//   //star.position.set(x, y, z);
//   scene.add(star);  
//   starIndex++;
// }

// function addStarTwo() {
//   const geometry = new THREE.SphereGeometry(0.6, 84, 84);
//   const material = new THREE.MeshStandardMaterial( { color: "#47D2E9" });
//   const star = new THREE.Mesh( geometry, material );
//   const separation = 10; // Separation between star objects (adjust as desired)
//   const index = starIndexTwo; // Index of the current star object

//   // Calculate the x position based on the index and separation
//   const posX = index * separation;
//   star.position.set(posX, 0, 0);
//   star.name = 'star';

//   //const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );
//   //document.addEventListener('mousemove', updateStarPosition);
//   //star.position.set(x, y, z);
//   scene.add(star);  
//   starIndexTwo++;
// }

// function addStarThree() {
//   const geometry = new THREE.SphereGeometry(0.6, 84, 84);
//   const material = new THREE.MeshStandardMaterial( { color: "#53DF83" });
//   const star = new THREE.Mesh( geometry, material );
//   const separation = 15; // Separation between star objects (adjust as desired)
//   const index = starIndexThree; // Index of the current star object

//   // Calculate the x position based on the index and separation
//   const posX = index * separation;
//   star.position.set(posX, 0, 0);
//   star.name = 'star';

//   //const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );
//   //document.addEventListener('mousemove', updateStarPosition);
//   //star.position.set(x, y, z);
//   scene.add(star);  
//   starIndexThree++;
// }

// Array(10).fill().forEach(addStar);
// Array(10).fill().forEach(addStarTwo);
// Array(10).fill().forEach(addStarThree);

// document.addEventListener('mousemove', updateStarPosition);

// function updateStarPosition(event) {
//   const mouseX = event.clientX;
//   const mouseY = event.clientY;

//   // Convert mouse coordinates to normalized device coordinates (-1 to 1)
//   const mouseNormalizedX = (mouseX / window.innerWidth) * 2 - 1;
//   const mouseNormalizedY = -(mouseY / window.innerHeight) * 2 + 1;

//   // Update the position of each star based on the index and separation
//   scene.traverse((child) => {
//     if (child.isMesh && child.name === 'star') {
//       const separation = child.geometry.parameters.radius * 2; // Separation between star objects (based on sphere radius)
//       const index = child.position.x / separation; // Index of the current star object

//       // Calculate the new x position based on the index and separation
//       const posX = index * separation;

//       // Set the star position based on the new x position and the cursor coordinates
//       child.position.set(posX + mouseNormalizedX, mouseNormalizedY, 0);
//     }
//   });
// }

//const spaceTexture = new THREE.TextureLoader().load(test);
//scene.background = spaceTexture;

const reactTexture = new THREE.TextureLoader().load(reactpng);

const react = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( {map: reactTexture })
);

scene.add(react)

react.position.y = 12;
react.position.z = 5;
react.position.setX(30);

const javaScriptTexture = new THREE.TextureLoader().load(javascriptpng);

const javascript = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( {map: javaScriptTexture })
);

scene.add(javascript)

javascript.position.y = 5;
javascript.position.z = 5;
javascript.position.setX(30);

const csharpTexture = new THREE.TextureLoader().load(csharppng);

const csharp = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( {map: csharpTexture })
);

scene.add(csharp)

csharp.position.y = -2;
csharp.position.z = 5;
csharp.position.setX(30);

const cssTexture = new THREE.TextureLoader().load(csspng);

const css = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( {map: cssTexture })
);

scene.add(css)

css.position.y = -9;
css.position.z = 5;
css.position.setX(30);

const htmlTexture = new THREE.TextureLoader().load(htmlpng);

const html = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( {map: htmlTexture })
);

scene.add(html)

html.position.y = -15;
html.position.z = 5;
html.position.setX(30);

// const moonTexture = new THREE.TextureLoader().load(moonimg);

// const moon = new THREE.Mesh(
//   new THREE.SphereGeometry(3, 32, 32),
//   new THREE.MeshStandardMaterial( {
//     map: moonTexture,
//   } )
// );

// scene.add(moon);

// moon.position.y = 15;
// moon.position.z = 3;
// moon.position.setX(30);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  //moon.rotation.x += 0.05;
  //moon.rotation.y += 0.075;
  //moon.rotation.z += 0.05;

  react.rotation.y += 0.01;
  react.rotation.z += 0.01;

  javascript.rotation.y += 0.02;
  javascript.rotation.z += 0.02;

  csharp.rotation.y += 0.015;
  csharp.rotation.z += 0.015;

  css.rotation.y += 0.025;
  css.rotation.z += 0.025;

  html.rotation.y += 0.01;
  html.rotation.z += 0.01;

  //camera.position.z = t * 0.01; originally stopped
  //camera.position.x = t * 0.002; stopped for v2
  //camera.position.y = t * 0.002; stopped for v2
}

document.body.onscroll = moveCamera;


function animate() {
  requestAnimationFrame ( animate );
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();
  renderer.render( scene,camera );

  //added below for cursor follow
  //document.removeEventListener('mousemove', updateStarPosition);
}

animate();

//document.addEventListener('mousemove', updateStarPosition);

const exhaustfunction = () => {
  window.open("https://github.com/AlecJans02/Performance-Exhaust-Website");
}

const exhaustRepo = document.getElementById("exhaustRepo");

exhaustRepo.addEventListener("click", exhaustfunction);

const userApifunction = () => {
  window.open("https://github.com/AlecJans02/User-Api-Filter");
}

const userApiRepo = document.getElementById("userApiRepo");

userApiRepo.addEventListener("click", userApifunction);

const unitConversionRepofunction = () => {
  window.open("https://github.com/AlecJans02/Measurement-Conversion-App");
}

const unitConversionRepo = document.getElementById("unitConversionRepo");

unitConversionRepo.addEventListener("click", unitConversionRepofunction);

const bitcoinRepofunction = () => {
  window.open("https://github.com/AlecJans02/Bitcoin-Api");
}

const bitcoinRepo = document.getElementById("bitcoinRepo");

bitcoinRepo.addEventListener("click", bitcoinRepofunction);

const calculatorRepofunction = () => {
  window.open("https://github.com/AlecJans02/Calculator")
}

const calculatorRepo = document.getElementById("calculatorRepo");

calculatorRepo.addEventListener("click", calculatorRepofunction);

const watchRepofunction = () => {
  window.open("https://github.com/AlecJans02/JavaScript-StopWatch");
}

const watchRepo = document.getElementById("watchRepo");

watchRepo.addEventListener("click", watchRepofunction);

const userApiWebfunction = () => {
  window.open("https://user-api-filter-alecjans02.vercel.app/");
}

const userApiWeb = document.getElementById("userApiWeb");

userApiWeb.addEventListener("click", userApiWebfunction);

const unitConfunction = () => {
  window.open("https://blue-mushroom-03448ef10.3.azurestaticapps.net/");
}

const unitCon = document.getElementById("unitCon");

unitCon.addEventListener("click", unitConfunction);

 const bitcoinWebfunction = () => {
   window.open("https://jolly-stone-0a11d9510.3.azurestaticapps.net/");
 }

 const bitcoinWeb = document.getElementById("bitcoinWeb");

 bitcoinWeb.addEventListener("click", bitcoinWebfunction);

const javaCalcfunction = () => {
  window.open("https://calculator-alecjans02.vercel.app/");
}

const javaCalc = document.getElementById("javaCalc");

javaCalc.addEventListener("click", javaCalcfunction);

const javaStopfunction = () => {
  window/open("https://java-script-stop-watch-alecjans02.vercel.app/");
}

const javaStop = document.getElementById("javaStop");

javaStop.addEventListener("click", javaStopfunction);

const exhaustWebfunction = () => {
  window.open("https://performance-exhaust-website-git-main-alecjans02.vercel.app/");
}

const exhaustWeb = document.getElementById("exhaustWeb");

exhaustWeb.addEventListener("click", exhaustWebfunction);

window.onresize = () => {
  location.reload();
};