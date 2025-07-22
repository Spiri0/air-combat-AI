import * as THREE from "three";


class Grid {

	constructor(scene, options = {}) {

		this.scene = scene;

		this.gridSize = options.gridSize || 1609.33; // 1 mile in meters
		this.rc = options.rc || 500;
		this.color = options.color || 0x009900;

		this.gridObj = new THREE.LineSegments(this.createGeometry(), this.createMaterial());
		this.scene.add(this.gridObj);

	}

	createGeometry() {
		const positions = [];
		const half = (this.rc * this.gridSize) / 2;

		for (let i = 0; i <= this.rc; i++) {
			const pos = -half + i * this.gridSize;

			positions.push(-half, 0, pos, half, 0, pos);
			positions.push(pos, 0, -half, pos, 0, half);
		}

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

		return geometry;
	}

	createMaterial() {
		return new THREE.LineBasicMaterial({ color: this.color });
	}

	getObject() {
		return this.gridObj;
	}

}


export { Grid }