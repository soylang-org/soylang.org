/* Author: Jesse Stojan
 * License Type: BSD-3-Clause
 * License URL: https://opensource.org/license/bsd-3-clause/
 * Copyright (c) 2023 Jesse Stojan.
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * ----------------------------------------------------------------
 * Changelog: https://soylang.org/logs/proj/soylang-website/ts/src/plugins/syntax-cc/lang/soy/soy.ts
 */
import {
	SCC_Language,
	SCC_LanguageClass,
	SyntaxProfileParseOptions
}										from "../../SCC_Language";
//import {Soy_Namespace}					from "./Soy_Namespace";
//import {Soy_Preprocessor}				from "./Soy_Preprocessor";

//================================================================

export class SoySyntaxProfile extends SCC_Language {
	//private:
	#comments: [];
	#functions: [];
	#macros: [];
	#objects: [];
	#strings: [];
	#templates: [];
	#typedefs: [];
	#variables: [];
	#lines: HTMLElement[];
	//#namespaces: Soy_Namespace[];
	#ast?: [];
	//public:
	constructor() {
		super({ name: SCC_LanguageClass.CPP });
		this.#comments = [];
		this.#functions = [];
		this.#macros = [];
		this.#objects = [];
		this.#strings = [];
		this.#templates = [];
		this.#typedefs = [];
		this.#variables = [];

		this.#lines = [];

		//// Create the global namespace, will always be the first element
		//this.#namespaces = [new CPP_Namespace({ label: '' })];
	}

	get lang(): SCC_Language { return this; }

	/**
	 * Parses Soy source code
	 * @param srcCode
	 * @param options
	 */
	override parse(srcCode: string, options?: SyntaxProfileParseOptions) {
		// split into lines, and filter out the new line separators
		// new lines will be empty strings in the array after being filtered.
		let src_lines = srcCode.split(/(\r?\n)/g);
		src_lines = src_lines.filter(line => !line.match(/(\r?\n)/g));

		// Handle source files where the last character is a \
		// the default behavior in Phase 2 is to add a new line character to the end.
		if (src_lines[-1][-1] === '\\') {
			src_lines[-1] += '\n';
		}

		let line_num = 0;
		for (let line of src_lines) {
			if (!line.length) {
				// New empty line
				let e = document.createElement('li');
				this.#lines.push(e);
				++line_num;
				continue;
			}

			++line_num;
		}

		//TODO: Implement parsing of Soy syntax code

	}

}

//================================================================
