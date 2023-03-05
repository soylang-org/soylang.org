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
 * Changelog: https://soylang.org/logs/proj/soylang-website/ts/src/plugins/syntax-cc/lang/cpp/CPP_Type.ts
 */

//================================================================

export enum CPP_BasicType {
	VOID				= 'void',
	NULLPTR				= 'nullptr',
	NULLPTR_t			= 'nullptr_t',
	BOOL				= 'bool',
	CHAR				= 'char',
	CHAR8_T				= 'char8_t',
	CHAR16_T			= 'char16_t',
	CHAR32_T			= 'char32_t',
	WCHAR_T				= 'wchar_t',
	SHORT				= 'short',
	LONG				= 'long',
	INT					= 'int',
	FLOAT				= 'float',
	DOUBLE				= 'double',
	UNSIGNED			= 'unsigned',
	SIGNED				= 'signed',
	AUTO				= 'auto',
}

export enum CPP_TypeModifier {
	SIGNEDNESS,
	SIZE
}

export enum CPP_TypeModifierSignedness {
	SIGNED				= 'signed',
	UNSIGNED			= 'unsigned',
}

export enum CPP_TypeModifierSize {
	SHORT				= 'short',
	LONG				= 'long',
}

//================================================================

export class CPP_DataType {
//private:
	#label: string;

//public:
	constructor(label: string) {
		this.#label = label;
	}

}

//================================================================

export enum CPP_Type {
	CHARACTER,
	INTEGER,
	FLOATING_POINT
}

//================================================================
