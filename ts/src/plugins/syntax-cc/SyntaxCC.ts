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
 * Changelog: https://soylang.org/logs/proj/soylang-website/ts/src/plugins/syntax-cc/SyntaxCC.ts
 */
import {
	SCC_LanguageClass,
	SCC_Language
}                           from "./SCC_Language";
import {SCC_Source}         from "./SCC_Source";
//import {TestHelperFunc, webWorker} from "./SyntaxCCWorker";
//import {SCC_DB} from "./SCC_DB";
//const URL = require('url').URL;
//import {URL} from 'url';

//================================================================
// Syntax Language Profiles
//================================================================
import {SoySyntaxProfile}   from "./lang/soy/soy";
import {SCC_Tabview}        from "./widgets/SCC_Tabview";
import {SCC_Modal}          from "./widgets/SCC_Modal";
import {SCC_Menu}           from "./widgets/SCC_Menu";
import {SCC_Theme}          from "./SCC_Theme";
import {SCC_DB, SCC_DBInfo} from "./SCC_DB";

const SCC_WorkerSource = require('syntax-cc-worker-inline?raw');
const SCC_CacheName = 'syntax-cc';

//================================================================

// export class CodeBlockLine {
// 	srcLine!: HTMLLIElement;
// 	lineNum!: HTMLLIElement;
// 	unused!: boolean;
// }
//
// export class CodeBlockSection {
//
// }
//
// export class CodeBlockSourceView {
//
// }

//================================================================

export interface CodeBlockOptions {
	id?: string;
	language: SCC_LanguageClass;
	theme: SCC_Theme;
}

//================================================================

export interface PreprocessorDefinition {
	name: string;
	value: string | number;
}

//================================================================

export type CSSScales = 'px' | 'em';
export type CSSSize = `${number}${CSSScales}`;

//================================================================

export interface SCC_Options {
	// Smart Syntax - Theme
	theme?: SCC_Theme;

	// Modify the default font-family, size, and line-height
	font?: {
		family?: string,
		size?: string,
		lineHeight?: CSSSize
	},

	// Smart Syntax - Tabs
	tabs?: boolean,

	// Smart Syntax - Titlebar
	titlebar?: {
		hide?: boolean,
		fontSize?: CSSSize,
		fontFamily?: string,
		lineHeight?: CSSSize
	},

	// Smart Syntax - Footer
	footer?: {
		fontSize?: CSSSize,
		fontFamily?: string,
		lineHeight?: CSSSize
	},

	// CSS
	style?: {
		minHeight?: CSSSize,
		maxHeight?: CSSSize,
		minWidth?: CSSSize,
		maxWidth?: CSSSize,
	},

	// Smart Syntax - Shared Profiles
	// So it can reuse an existing Smart Syntax object
	profiles?: SCC_Language[],

}

//================================================================

/**
 * Static Class - Syntax Colorful Code
 */
export abstract class SyntaxCC {
	//private:
	// Prevent inheriting this class
	private constructor() {}

	//public:
	public static worker: Worker;
	public static cache: Cache;

	//----------------------------------------------------------------

	//----------------------------------------------------------------

	public static initialize() {
		// Start the WebWorker for parsing code on a separate thread
		if (!SyntaxCC.worker) {
			const blob                = new Blob([SCC_WorkerSource], { type: 'text/javascript' });

			//NOTE: Something's broken with TypeScript where it doesn't know what `URL.createObjectURL` is anymore.
			// Temporarily just suppressing the error message because it exists in the browser.

			//@ts-ignore
			SyntaxCC.worker           = new Worker(URL.createObjectURL(blob), { type: 'classic', name: 'SyntaxCC-Worker' });
			SyntaxCC.worker.onmessage = (evt) => {
				console.log('SyntaxCC.worker.onmessage: ', evt);
			};
			SyntaxCC.worker.onerror   = (evt) => {
				console.error('SyntaxCC.worker.onerror: ', evt);
			};
		}

		//TestHelperFunc();

		// // Ensure the database is opened for storing source file tokens,
		// // so they don't have to be regenerated everytime the page loads.
		// if (!SyntaxCC.db) {
		// 	let db_open = window.indexedDB.open('syntax_cc');
		// 	db_open.onsuccess = (e) => {
		// 		SyntaxCC.db = db_open.result;
		// 	};
		// }
		//SCC_DB.open();

		// Ensure the cache storage is opened
		if (!SyntaxCC.cache) {
			caches.open(SCC_CacheName)
			.then(cache => SyntaxCC.cache = cache)
			.catch(err => console.error(err));
		}
	}

	//----------------------------------------------------------------

	public static async fetchSource(url: string, headers: HeadersInit = [['Accept','text/plain']]) {
		// Ensure the cache storage is opened
		if (!SyntaxCC.cache) {
			SyntaxCC.cache = await caches.open(SCC_CacheName);
		}

		// Create the request object (reused)
		let req = new Request(new URL(url), { method: 'GET', headers: headers });

		// Look for a cached version of the source file
		let rsp = await SyntaxCC.cache.match(req);

		// Check if we need to fetch the resource
		if (!rsp) {
			// fetch the source
			rsp = await fetch(req);

			// Ensure we received a good response
			if (rsp.status !== 200) return;

			// Store in cache
			await SyntaxCC.cache.put(rsp.url, rsp.clone());
		}

		// Return the text of the response
		return rsp.text();
	}
}//static class 'SyntaxCC'

// Initialize SyntaxCC when page is loaded
document.addEventListener('DOMContentLoaded',() => {
	SyntaxCC.initialize();
});

// 	#container: HTMLDivElement;
// 	#theme: SCC_Theme;
// #menu: SCC_Menu;
// #modal: SCC_Modal;
// #tabs: SCC_Tab;


//public:
// 	constructor(options?: SCC_Options) {
// 		// Set the theme
// 		// this.#theme = options?.theme || SCC_Theme.DEFAULT;
// 		//
// 		// // Create the widgets
// 		// this.#container = document.createElement('div');
// 		//
// 		// // Set the default CSS classes
// 		// this.#container.classList.add(...['syntax-cc']);
//
// 		// // Some browsers are by default only temporary storage durations,
// 		// // this ensures storage persists instead of being deleted when
// 		// // the user leaves the site.
// 		// navigator.storage.persist().catch(err => console.error(err));
//
// 		// SyntaxCC.initialize();
// 	}

// get theme() { return this.#theme; }
// set theme(value: SCC_Theme) {
// 	this.#theme = value;
// 	this.#container.classList.remove(...Object(SCC_Theme).values);
// 	this.#container.classList.add(this.#theme);
// }

//================================================================
