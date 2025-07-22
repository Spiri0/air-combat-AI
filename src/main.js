import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { Aircraft } from './aircraft.js';
import { Grid } from './grid.js';
import { UIOverlay } from './uiOverlay.js';
import { gridOptions, air1InitOptions, air2InitOptions } from './initParams.js';
import { RendererSetup } from './rendererSetup.js';


const renderSetup = new RendererSetup();

const width = window.innerWidth;
const height = window.innerHeight;

const scene = renderSetup.scene;
const uiScene = renderSetup.uiScene;
const renderer = renderSetup.renderer;
const labelRenderer = renderSetup.labelRenderer;
const camera = renderSetup.camera;
const uiCamera = renderSetup.uiCamera;
const controls = renderSetup.controls;

await renderer.init();

window.addEventListener('resize', renderSetup.onWindowResize, false);

//---------------------------------------------------------------------


const uiOverlay = new UIOverlay(uiScene, width, height);
const grid = new Grid( scene, gridOptions );
const pursuer = new Aircraft( scene, "blue", air1InitOptions );
const target = new Aircraft( scene, "red", air2InitOptions );


const center = new THREE.Vector3()
	.addVectors( pursuer.getPosition(), target.getPosition() )
	.multiplyScalar(0.5);

const offset = new THREE.Vector3( 200, 50, 200 );

camera.position.copy( center ).add( offset );
controls.target.copy( center );
controls.update();


uiOverlay.updateAC1Altitude( 12345 );

//---------------------------------------------------------------------


function animate() {

	requestAnimationFrame(animate);

    renderSetup.Render();

}


animate();
