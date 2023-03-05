/**
 * vector2 container class
 */
export class vec2 {
//private:
	#x: number;
	#y: number;
//public:
	constructor(x: number = 0, y: number = 0) {
		this.#x = x;
		this.#y = y;
	}

	get x() { return this.#x; }
	set x(val) { this.#x = val; }

	get y() { return this.#y; }
	set y(val) { this.#y = val; }

	get xy() { return new Float32Array([this.#x, this.#y]); }

	//TODO: Add in math operations

}
