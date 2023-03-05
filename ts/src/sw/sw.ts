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
 * Changelog: https://soylang.org/logs/proj/soylang-website/ts/src/sw/sw.ts
 */
/**
 * The site's service worker for handling
 * caching and API calls.
 */
import {API}        from "../plugins/api/api";
import {SWMessages} from "src/SWMessages";
import {CACHE}      from "src/common";

// Event Listeners
import {onError}                  from "./src/events/onError";
import {onInstall}                from "./src/events/onInstall";
import {onActivate}               from "./src/events/onActivate";
import {onControllerChange}       from "./src/events/onControllerChange";
import {onMessage}                from "./src/events/onMessage";
import {onMessageError}           from "./src/events/onMessageError";
import {onFetch}                  from "./src/events/onFetch";
import {onSync}                   from "./src/events/onSync";
import {onPeriodicSync}           from "./src/events/onPeriodicSync";
import {onPush}                   from "./src/events/onPush";
import {onPushSubscriptionChange} from "./src/events/onPushSubscriptionChange";
import {onNotificationClick}      from "./src/events/onNotificationClick";
import {onNotificationClose}      from "./src/events/onNotificationClose";

// Error Event
addEventListener('error', onError);

// Service Worker Events
addEventListener('install', onInstall);
addEventListener('activate', onActivate);
addEventListener('controllerchange', onControllerChange);

// Message Events
addEventListener('message', onMessage);
addEventListener('messageerror', onMessageError);

// Fetch Event
addEventListener('fetch', onFetch);

// Sync Events
if ('onsync' in self) { addEventListener('sync', onSync); }
else { console.log("Periodic Sync unavailable"); }
if ('onperiodicsync' in self) { addEventListener('periodicsync', onPeriodicSync); }
else { console.log("Periodic Sync unavailable"); }

// Push Notification Events
if ('onpush' in self) {
	addEventListener('push', onPush);
	addEventListener('pushsubscriptionchange', onPushSubscriptionChange);
	addEventListener('notificationclick', onNotificationClick);
	addEventListener('notificationclose', onNotificationClose);
} else {
	console.log("Push notification unavailable");
}
