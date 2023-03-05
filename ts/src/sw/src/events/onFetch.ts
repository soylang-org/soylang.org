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
 * Changelog: https://soylang.org/logs/proj/soylang-website/ts/src/sw/events/onFetch.ts
 */
import {CACHE, CACHE_IGNORE, HOSTNAMES} from "../common";

export function onFetch(evt: FetchEvent) {
	// Only cache `GET` method requests
	if (evt.request.method !== "GET") return;

	// Check for ignored caches first and fetch if necessary
	// we do this here instead of inside evt.respondWith
	// to prevent duplicated responses from the service worker
	if (CACHE_IGNORE.some(u => evt.request.url.includes(u))) return;

	// Cache if not ignored
	evt.respondWith((async () => {
		// Prevent event bubble
		evt.preventDefault();
		evt.stopPropagation();

		// Look for a cached response
		let rsp: (Response | undefined) = await caches.match(evt.request);
		if (rsp) return rsp;

		// Check for preloaded response since we used registration.preloadResponse.enable()
		rsp = await evt.preloadResponse;
		if (rsp) return rsp;

		// No cached or preloaded response, perform fetch
		rsp = await fetch(evt.request);

		// Ensure we received a good response
		if (!rsp.ok) return rsp;

		// Abide by the "Cache-Control: no-store;" header
		const cache_ctrl:string | null = rsp.headers.get('cache-control');
		if (cache_ctrl && ['no-store','no-cache'].some(k => cache_ctrl?.includes(k))) {
			console.log(cache_ctrl);
			return rsp;
		}

		// Store in cache
		if (evt.request.url.includes(HOSTNAMES.api)) {
			// caches: `api.soylang.org`
			if (!CACHE.api) CACHE.api = await caches.open(`api.${location.hostname}`);
			await CACHE.api.put(rsp.url, rsp.clone());
		}
		else {
			// caches: `soylang.org`
			if (!CACHE.site) CACHE.site = await caches.open(location.hostname);
			await CACHE.site?.put(rsp.url, rsp.clone());
		}

		// Return the text of the response
		return rsp;
	})());
}
