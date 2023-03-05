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
 * Changelog: https://soylang.org/logs/proj/soylang-website/ts/src/plugins/syntax-cc/lang/cpp/CPP_Preprocessor.ts
 */
import {CPP_Object} from "./CPP_Object";

//================================================================

export const CPP_PreprocessorKeywords = {
	'if': {},		// if
	'ifdef': {},	// if defined
	'ifndef': {},	// if not defined
	'else': {},		// else
	'elif': {},		// else if
	'elifdef': {},	// else if defined
	'elifndef': {},	// else if not defined
	'endif': {},	// end macro conditional statement
	'define': {},	// create macro definition
	'undef': {},	// remove macro definition
	'include': {},	// include header file
	'error': {},	// emit an error
	'warning': {},	// emit a warning
	'pragma': {},	// pragma expressions (common/unique)
	'line': {},	// specify the line number to use instead, (used by code generators typically)
};

//================================================================

export const CPP_PredefinedMacros = {
	'__cplusplus': {},
	'__STDC_HOSTED__': {},
	'__FILE__': {},
	'__LINE__': {},
	'__DATE__': {},
	'__TIME__': {},
	'__STDCPP_DEFAULT_NEW_ALIGNMENT__': {},
	'__STDC__': {},
	'__STDC_VERSION__': {},
	'__STDC_ISO_10646__': {},
	'__STDC_MB_MIGHT_NEQ_WC__': {},
	'__STDCPP_THREADS__': {},
	'__STDCPP_STRICT_POINTER_SAFETY__': {},
	'__func__': {},
};

//================================================================

export const CPP_PragmaExpression = {
	'common': {
		'once': {},
		'pack': {},
		'STDC': {},
	},
	'unique': {
		'msvc': {},
		'gcc': {},
		'clang': {},
		'intel': {},
		'ibm': {},
		'hp': {},
	},
};

//================================================================

export interface PreprocessorDirective {
	label: string;
	value: string | number;
}

//================================================================

export abstract class CPP_PreprocessorDirective {
	protected constructor() {
	}

}

//================================================================

export class CPP_Pragma extends CPP_PreprocessorDirective {
	#statement: string;
	constructor(statement: string) {
		super();
		this.#statement = statement;
	}
}

//================================================================

// #define MY_CUSTOM_DEFINITION value
// #undef MY_CUSTOM_DEFINITION
export class CPP_MacroDefinition extends CPP_PreprocessorDirective {
//private:
	#identifier: string;
	#value: string | number | CPP_PreprocessorDirective;
	#srcFile: string;
	#definedAt: number;	// -1 for preprocessor
	#undefinedAt: number; // -1 for still defined

//public:
	constructor(identifier: string, value: string | number | CPP_PreprocessorDirective) {
		super();
		this.#identifier = identifier;
		this.#value = value;
		this.#srcFile = '';
		this.#definedAt = 0;
		this.#undefinedAt = 0;
	}

	get identifier() { return this.#identifier; }
	set identifier(value) { this.#identifier = value; }

	get value() { return this.#value; }
	set value(value) { this.#value = value; }

	evaluate() {

	}
}

//================================================================

export class CPP_MacroFunction extends CPP_PreprocessorDirective {
//private:
	#identifier: string;
	#tokens: string[];
	#value: string;
//public:
	constructor(identifier: string, tokens: string[], value: string) {
		super();
		this.#identifier = identifier;
		this.#tokens = tokens;
		this.#value = value;
	}

	get identifier() { return this.#identifier; }
	set identifier(value) { this.#identifier = value; }

	get tokens() { return this.#tokens; }
	set tokens(values) { this.#tokens = values; }

	get value() { return this.#value; }
	set value(value) { this.#value = value; }

	evaluate<T>(...args: T[]) {
		//TODO: Replace tokens are they occur in the value of this macro function
	}
}

//================================================================

export class CPP_Preprocessor {
	#defined: PreprocessorDirective[];

	constructor() {
		this.#defined = [];
	}

}

//================================================================
