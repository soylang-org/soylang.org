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
 * Changelog: https://soylang.org/logs/proj/soylang-website/ts/src/plugins/syntax-cc/widgets/SCC_SourceView.ts
 */
import {SCC_Language} from "../SCC_Language";

export class SCC_SourceView extends HTMLDivElement {
	// #name: string;
	// #lang: SmartSyntaxLanguage;
	// #gutter: {
	// 	container: HTMLDivElement,
	// 	lineNumbers: HTMLUListElement,
	// 	markers: HTMLUListElement,
	// 	folding: HTMLUListElement
	// };
	// #source: {
	// 	container: HTMLDivElement,
	// 	ul: HTMLUListElement,
	// 	lines: HTMLLIElement[]
	// };

	constructor() {
		super();
	}

	// get gutter() { return this.#gutter; }
	//
	// get lines() { return this.#source.lines; }

}

customElements.define('smart-syntax-source-view', SCC_SourceView, {extends: 'div'});
