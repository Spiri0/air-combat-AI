import * as THREE from "three";
import { WebGPURenderer } from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';


class RendererSetup {

	constructor() {

		const SkyLim = 50000;	    // Max viewing distance (meters)
		const SkyCol = 0xa9e5ff;    // Color of Sky

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.renderer = new WebGPURenderer({

			canvas: document.createElement('canvas'),
			antialias: true,
			//forceWebGL: false,
				
		});

		this.renderer.setSize( this.width, this.height );
		document.body.appendChild( this.renderer.domElement );

		this.labelRenderer = new CSS2DRenderer();
		this.labelRenderer.setSize( this.width, this.height );
		this.labelRenderer.domElement.style.position = 'absolute';
		this.labelRenderer.domElement.style.top = '0px';
		this.labelRenderer.domElement.style.pointerEvents = 'none';
		document.body.appendChild( this.labelRenderer.domElement );

		this.scene = new THREE.Scene();
		this.uiScene = new THREE.Scene();

		this.scene.background = new THREE.Color( SkyCol );


		this.camera = new THREE.PerspectiveCamera( 45, this.width / this.height, 1, SkyLim );
		//this.uiCamera = new THREE.OrthographicCamera( width, width /2, height /2, height /-2, -1000, 1000 );
		this.uiCamera = new THREE.OrthographicCamera( 0, this.width, this.height, 0, -1000, 1000 );

		//this.camera.position.set( 0, 5, 10 );

		this.controls = new OrbitControls( this.camera, this.renderer.domElement );
		this.controls.target.set( 0, 0, 0 );

		const AmbLight = new THREE.AmbientLight( 0xffffff, 1.0 );
		this.scene.add(AmbLight);

	}

	Render() {

		this.renderer.render( this.scene, this.camera );
		this.labelRenderer.render( this.uiScene, this.uiCamera );

	}

	onWindowResize = () => {

		const width = window.innerWidth;
		const height = window.innerHeight;

		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();

		this.uiCamera.right = width;
		this.uiCamera.top = height;
		this.uiCamera.updateProjectionMatrix();

		this.renderer.setSize( width, height );
		this.labelRenderer.setSize( width, height );
    
	}

}


export { RendererSetup }
