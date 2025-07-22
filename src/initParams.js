import * as THREE from "three";
        

const gridOptions = { 
    gridSize: 1000/1.60933, 
    rc: 5000, 
    color: 0x009900 
}

const air1Direction = new THREE.Quaternion();
air1Direction.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0)); // east

const air2Direction = new THREE.Quaternion();
air2Direction.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0)); // east

const air1InitOptions = {
	position: { x: 0, y: 0, z: 0 },
	altitude: 1000,
	speed: 250,
	direction: air1Direction
}

const air2InitOptions = {
	position: { x: 100, y: 0, z: 0 },
	altitude: 1000,
	speed: 250,
	direction: air1Direction
}


export { gridOptions, air1InitOptions, air2InitOptions }
