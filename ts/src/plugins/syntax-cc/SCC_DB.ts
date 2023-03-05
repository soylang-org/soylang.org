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
 * Changelog: https://soylang.org/logs/proj/soylang-website/ts/src/plugins/syntax-cc/SCC_DB.ts
 */
import {SCC_DBInfo} from "./db/scc_dbinfo";
export {SCC_DBInfo} from "./db/scc_dbinfo";

//================================================================
/**
 * static class for SyntaxCC Database utility
 */
export abstract class SCC_DB {
//private:
	// prevent inheritance
	private constructor() {}
//public:
	public static db: IDBDatabase | null = null;

	// static initialize() {
	// 	let transaction = SCC_DB.db.transaction([SCC_DBTable.PROJECTS], "readonly");
	// 	transaction.commit();
	// }

	//----------------------------------------------------------------

	public static open() {
		console.log("Opening Database...");
		if (SCC_DB.db) {
			console.log("Database already opened.");
			return;
		}

		console.log("Opening the database.........");

		let req = self.indexedDB.open('syntax_cc', SCC_DBInfo.version);
		req.onerror = (evt) => {
			console.error("Something failed..");
			console.error(evt);
		};

		console.log("Adding onupgradeneeded.");

		// When multiple instances are running and there's
		// a version change to the database, close this instances
		// connection to the database so the upgrade can proceed.
		req.onupgradeneeded = (evt: IDBVersionChangeEvent) => {
			console.log("Upgrade needed", evt);
		};

		console.log("Adding onsuccess.");

		// On Success, I reckon
		req.onsuccess = (evt: Event) => {
			evt.preventDefault();
			evt.stopPropagation();
			SCC_DB.db = req.result;
			console.log(`Opened Database: ${SCC_DB.db.name}`);
			// Setup Event Handlers
			SCC_DB.db.onclose = () => {
				SCC_DB.db = null;
				console.log("Closed database");
			};

			SCC_DB.db.onerror         = (evt) => { console.error(evt); };
			SCC_DB.db.onversionchange = (evt) => {
				//SyntaxCCDB.close();
				// Reopen the database once the upgrade has completed.
				//SyntaxCCDB.open();
				//SyntaxCCDB.close();
				//SyntaxCCDB.open();
				console.info(`SyntaxCC-DB: Upgrade in progress, from v${evt.oldVersion} to version v${evt.newVersion}`);

				// let itr = 0;
				// do {
				// 	if (SyntaxCCDB.db) { break; }
				// 	console.log("Waiting... ", ++itr);
				// } while(!SyntaxCCDB.db && itr < 10);

				if (!SCC_DB.db) {
					console.warn("Invalid Database Object");
					return;
				}

				console.log("Begin creating tables.");

				// Create tables
				for (let tableKey in SCC_DBInfo.tables) {
					// Test for deprecated table (store) names
					//TODO: Remove deprecated IndexedDB store names

					console.log(`Creating table "${tableKey}"`);

					// Test whether the table (store name) exits or not
					if (SCC_DB.db.objectStoreNames.contains(SCC_DBInfo.tables[tableKey].name)) continue;

					// Create a table (store name) with the default 'id'
					// key path, which is auto-incremented.
					let tbl = SCC_DB.db.createObjectStore(
						SCC_DBInfo.tables[tableKey].name,
						{
							keyPath:       SCC_DBInfo.tables[tableKey].keyPath,
							autoIncrement: SCC_DBInfo.tables[tableKey].autoIncrement
						}
					);

					// Setup event listeners
					tbl.transaction.oncomplete = () => { console.log(`SyntaxCC-DB: Upgrade from v${evt.oldVersion} to version v${evt.newVersion} complete.`); };
					tbl.transaction.onerror = () => { console.error("SyntaxCC-DB: Failed to upgrade the database to" +
						" the new version."); };
					tbl.transaction.onabort = () => { console.warn("SyntaxCC-DB: Transaction was aborted before" +
						" finishing upgrade."); };

					// Create indexes
					SCC_DBInfo.tables[tableKey].indexes.forEach(index => {
						tbl.createIndex(
							index.name,
							index.key,
							{ unique: index.unique }
						);
					});
				}
				console.log("Created tables");
			};

			console.log("Finished with database open func...");
		};
	}

	//----------------------------------------------------------------

	public static close() {
		if (SCC_DB.db) {
			SCC_DB.db.close();
		}
	}

	//----------------------------------------------------------------

	public static select() {}
	public static selectAll() {}

	//----------------------------------------------------------------

	public static insert() {}
	public static insertAll() {}

	//----------------------------------------------------------------

	public static update() {}
	public static updateAll() {}

	//----------------------------------------------------------------

	public static remove() {}
	public static removeAll() {}

	//----------------------------------------------------------------

	// Drop the entire table inside the database
	public static drop() {}

	// Drop the entire database, clears all data and tables
	public static dropAll() {}

	//----------------------------------------------------------------

}

//================================================================
