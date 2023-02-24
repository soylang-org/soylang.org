import {vec2} from "./vec2";

/**
 * vector3 container class
 */
export class vec3 {
	//private:
	#x: number;
	#y: number;
	#z: number;
	//public:
	constructor(x: number = 0, y: number = 0, z: number = 0) {
		this.#x = x;
		this.#y = y;
		this.#z = z;
	}
	get x() { return this.#x; }
	set x(val) { this.#x = val; }
	get y() { return this.#y; }
	set y(val) { this.#y = val; }
	get z() { return this.#z; }
	set z(val) { this.#z = val; }
	get xyz() { return new Float32Array([this.#x, this.#y, this.#z]); }

	//TODO: Add in math operations

}
