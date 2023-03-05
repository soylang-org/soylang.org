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
 * Changelog: https://soylang.org/logs/proj/soylang-website/ts/src/plugins/syntax-cc/SyntaxCCWorker.ts
 */
import {SCC_DB} from "./SCC_DB";

const TestHelperFunc = () => {
	console.log("Test successful!");
}

TestHelperFunc();

let cache: Cache;
let mq = new BroadcastChannel('syntax_cc_workers');
mq.onmessage = (evt) => {
	console.log(evt);
};

// Open the cache storage
self.caches.open('syntax-cc')
	.then(c => cache = c)
	.catch(err => console.error(err));

// // Open the Database
// let db_open = self.indexedDB.open('syntax-cc-db');
// db_open.onsuccess = (r => db = db_open.result);

// console.log(syntax_cc_db);
SCC_DB.open();

// Handle Error Events
self.onerror = (evt) => {
	console.error('[THREAD] SyntaxCC.webWorker.onError - ', evt);
};

// Handle Message Events
self.onmessage = (evt) => {
	console.log('[THREAD] SyntaxCC.webWorker.onMessage - ', evt);
	mq.postMessage("Something happened!");
};
