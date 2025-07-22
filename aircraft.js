import * as THREE from "three";


class Aircraft {
	constructor(scene, color = "blue", options = {}) {
		this.scene = scene;
		this.color = color;

		// Optionen mit Defaults
		this.position = this.position = new THREE.Vector3(options.position?.x || 0, options.position?.y || 0, options.position?.z || 0);
		this.speed = options.speed || 0;

		this.quaternion = new THREE.Quaternion();
		this.euler = new THREE.Vector3();
		this.direction = new THREE.Vector3();

		// Hauptobjekte
		this.AirObj = new THREE.Group();
		this.AirObj.rotation.order = "YXZ";
		this.scene.add(this.AirObj);

		this.AirPBY = new THREE.Group();
		this.AirPBY.rotation.order = "YXZ";
		this.AirObj.add(this.AirPBY);

		// Geometrie erstellen
		this.createGeometry();

		// Initialposition setzen inkl. Höhe (y)
		this.AirObj.position.set(this.position.x, options.altitude || this.position.y, this.position.z);

		if (options.direction) {
			this.AirObj.quaternion.copy(options.direction);
		} else {
			this.setRotation(0, 0, 0);
		}
	}

	createGeometry() {
		const PieVal = Math.PI;
		const Ft2Mtr = 0.3048;
		const mat = new THREE.MeshBasicMaterial({ color: this.color });

		// Front Zylinder
		let mshAir = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 2.5, 15, 3, 1, false), mat);
		mshAir.rotation.x = -PieVal / 2;
		mshAir.position.z = -5;
		this.AirPBY.add(mshAir);

		// Back Zylinder
		mshAir = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 2.5, 25, 3, 1, false), mat);
		mshAir.rotation.x = PieVal / 2;
		mshAir.rotation.y = PieVal;
		mshAir.position.z = 15;
		this.AirPBY.add(mshAir);

		// Wing
		mshAir = new THREE.Mesh(new THREE.BoxGeometry(50, 0.25, 5), mat);
		mshAir.position.y = -0.5;
		mshAir.position.z = 2.5;
		this.AirPBY.add(mshAir);

		// HTail
		mshAir = new THREE.Mesh(new THREE.BoxGeometry(12.5, 0.25, 3.25), mat);
		mshAir.position.y = -0.5;
		mshAir.position.z = 25;
		this.AirPBY.add(mshAir);

		// VTail
		mshAir = new THREE.Mesh(new THREE.BoxGeometry(0.25, 6.25, 3.25), mat);
		mshAir.position.y = 2.5;
		mshAir.position.z = 25;
		this.AirPBY.add(mshAir);

		// Skalierung
		this.AirPBY.scale.set(Ft2Mtr, Ft2Mtr, Ft2Mtr);
	}

	setRotation(pitch, heading, bank) {
		const DegRad = Math.PI / 180;
		this.AirObj.rotation.x = pitch * DegRad;
		this.AirObj.rotation.y = -heading * DegRad; // negatives heading für aircraft convention
		this.AirObj.rotation.z = -bank * DegRad;
	}

	update(dt) {
		const forward = new THREE.Vector3(0, 0, -1);
		forward.applyQuaternion(this.AirObj.quaternion);
		forward.multiplyScalar(dt * this.speed);
		this.AirObj.position.add(forward);
	}

	setSpeed(speed) {
		this.speed = speed;
	}

	getSpeed() {
		return this.speed;
	}

	getQuaternion() {
		this.AirObj.getWorldQuaternion(this.quaternion);
		return this.quaternion;
	}

	getEuler() {
		const quat = this.getQuaternion();
		const eulerObj = new THREE.Euler().setFromQuaternion(quat, 'YXZ');
		this.euler.set(
			THREE.MathUtils.radToDeg(eulerObj.y), // heading
			THREE.MathUtils.radToDeg(eulerObj.x), // pitch
			THREE.MathUtils.radToDeg(eulerObj.z)  // roll
		);

		// Normalize to [-180,+180]
		this.euler.x = (this.euler.x + 540) % 360 - 180; // heading
		this.euler.y = (this.euler.y + 540) % 360 - 180; // pitch
		this.euler.z = (this.euler.z + 540) % 360 - 180; // roll

		return this.euler.clone();
	}

	getPosition() {
		this.AirObj.getWorldPosition(this.position);
		return this.position;
	}

	getDirection() {
		this.direction.set(0, 0, 1).applyQuaternion(this.getQuaternion()).normalize();
		return this.direction;
	}

}


export { Aircraft }