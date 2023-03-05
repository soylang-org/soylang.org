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
 * Changelog: https://soylang.org/logs/proj/soylang-website/ts/src/site.ts
 */

/*
 * This file is for helper functions
 * to communicate with the Service Worker.
 * [Client -> Service Worker interop]
 *
 * The site's service worker for handling
 * caching and API calls.
 */

//import {SWMessages} from "sw/src/SWMessages";
function StartServiceWorker() {
	if (!('serviceWorker' in window.navigator)) {
		console.error('Service Workers unavailable in your current browser mode or settings.');
		return;
	}
	console.log('Registering service worker..');
	// Register service worker, it'll be accessible
	// from navigator.serviceWorker after registration.
	window.navigator.serviceWorker
	.register('/sw.min.js', {scope: '/'})
	.then((swr: ServiceWorkerRegistration) => {
		if (swr.installing) {
			console.log('Service Worker installing');
		}
		else {
			if (swr.waiting) {
				console.log('Service worker installed');
			}
			else {
				if (swr.active) {
					console.log('Service worker active');
				}
			}
		}
		//swr.pushManager.subscribe().then((subscription)=>{
		//	console.log("Subscribed to push notifications.");
		//});
		//swr.showNotification('Soylang', {
		//	timestamp: new Date().getTime(),
		//	actions: [{
		//		title: "view article",
		//		action: "https://soylang.org/test",
		//		icon: '/soylang-thumb-96.png',
		//	}],
		//	body: 'Test Notification',
		//	tag: 'soylang-test-notification',
		//	badge: "/soylang-thumb-96.png",
		//	icon: "/soylang-thumb-96.png",
		//})
		//.then(()=>{
		//	console.log("Showed Notification.");
		//});
	})
	.catch((err: ErrorEvent) => console.error(err));
	console.log('Registered Service Worker?');
}

//// Export service worker (interop)
//export {
//	SWMessages
//};
StartServiceWorker();
window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded');
}, {once: true});
console.log("Site entry point..");
