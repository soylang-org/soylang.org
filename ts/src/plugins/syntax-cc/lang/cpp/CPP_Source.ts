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
 * Changelog: https://soylang.org/logs/proj/soylang-website/ts/src/plugins/syntax-cc/lang/cpp/CPP_Source.ts
 */
export const CodeFileExtensions = {
	'cpp': {fileType: 'source', languages: ['cpp']},
	'cc': {fileType: 'source', languages: ['cpp']},
	'c': {fileType: 'source', languages: ['c']},
	'hpp': {fileType: 'header', languages: ['cpp']},
	'hh': {fileType: 'header', languages: ['cpp']},
	'h': {fileType: 'header', languages: ['c', 'cpp']},
}

export type FileExtensions<T extends keyof typeof CodeFileExtensions> = T;

export type CPP_FileExtensions = FileExtensions<'cpp'|'cc'|'hpp'|'hh'|'h'>;
export type CPP_SourceFileName = `${string}.${FileExtensions<'cpp'|'cc'|'hpp'|'hh'|'h'>}`;
let test: CPP_SourceFileName = 'test.cpp';

export class CPP_Source {
//private:
	#filename: CPP_SourceFileName;
	#ext: CPP_FileExtensions;
	#source: string;
//public:
	constructor(filename: CPP_SourceFileName, ext: CPP_FileExtensions, sourceCode: string) {
		this.#filename = filename;
		this.#ext = ext;
		this.#source = sourceCode;
	}
}
