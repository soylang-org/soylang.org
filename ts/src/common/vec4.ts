import {vec2} from "./vec2";
import {vec3} from "./vec3";

/**
 * vector4 container class
 */
export class vec4 {
	//private:
	#x: number;
	#y: number;
	#z: number;
	#w: number;
	//public:
	constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
		this.#x = x;
		this.#y = y;
		this.#z = z;
		this.#w = w;
	}
	get x() { return this.#x; }
	set x(val) { this.#x = val; }
	get y() { return this.#y; }
	set y(val) { this.#y = val; }
	get z() { return this.#z; }
	set z(val) { this.#z = val; }
	get w() { return this.#z; }
	set w(val) { this.#z = val; }
	get xyzw() { return new Float32Array([this.#x, this.#y, this.#z, this.#w]); }

	//TODO: Add in math operations

}
