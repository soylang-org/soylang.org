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
 * Changelog: https://soylang.org/logs/proj/soylang-website/ts/src/plugins/syntax-cc/lang/cpp/CPP.ts
 */
import {
	SCC_Language,
	SCC_LanguageClass,
	SyntaxProfileParseOptions
}										from "../../SCC_Language";
import {CPP_Namespace}					from "./CPP_Namespace";
import {CPP_Preprocessor}				from "./CPP_Preprocessor";

//================================================================

export class CPPSyntaxProfile extends SCC_Language {
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
	#namespaces: CPP_Namespace[];
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

		// Create the global namespace, will always be the first element
		this.#namespaces = [new CPP_Namespace({ label: '' })];
	}

	get lang(): SCC_Language { return this; }

	/**
	 * Parses C++ source code
	 * @param srcCode
	 * @param options
	 */
	override parse(srcCode: string, options?: SyntaxProfileParseOptions) {
		// split into lines, and filter out the new line separators
		// new lines will be empty strings in the array after being filtered.
		let src_lines = srcCode.split(/(\r?\n)/g);
		src_lines = src_lines.filter(line => !line.match(/(\r?\n)/g));

		// Phase 1 -
		// Trigraph sequences are replaced by their corresponding alternative tokens
		// Trigraphs were removed in C++17.

		// Phase 2 -
		// Handle backslash tokens at the end of lines.
		// remove any whitespace characters (aside from new line)

		// Handle source files where the last character is a \
		// the default behavior in Phase 2 is to add a new line character to the end.
		if (src_lines[-1][-1] === '\\') {
			src_lines[-1] += '\n';
		}

		// Phase 3 -
		// Decompose source file into comments, sequences of whitespace characters,
		// and preprocessing tokens:
		// 1) header names <iostream> or "header.hpp".
		// 2) identifiers.
		// 3) preprocessing numbers.
		// 4) character and string literals.
		// 5) operators and punctuators (including alternative tokens).
		// 6) individual non-whitespace characters that do not fit in any other category.
		// 7) Any transformations performed during Phase 1 and 2 between the initial and final double quote
		//	  of any raw string literal are reverted.
		// 8) Any transformations performed during Phase 2 (line splicing) between the initial and final double quote
		//	  of any raw string literal are reverted.
		// 9) each comment is replaced by one space character.

		// Phase 4 -
		// The preprocessor is executed.
		// each file intruded with #include goes through phase 1-4 recursively
		// at the end of this phase, all preprocessor directives are removed from the source.

		// Phase 5 -
		//

		// Phase 6 -
		// Adjacent string literals are concatenated

		// Phase 7 -
		// Compilation takes place, preprocessing tokens are converted to a token.
		// into translation units.

		// Phase 8 -
		// Each translation unit is examined to produce a list of required template instantiations,
		// including ones requested by explicit instantiations.
		// Produces instantiation units.

		// Phase 9 -
		// Translation units, Instantiation units, and library components needed to satisfy external references
		// are collected into a program image which contains information needed for the execution
		// in its execution environment.

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

		//TODO: Implement parsing of C++ syntax code

	}

}

//================================================================
