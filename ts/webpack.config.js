const path = require("path");
const isProduction = process.env.NODE_ENV === "production";
const OutputPath = path.resolve(__dirname, "../js");
const os = require('os');
const fs = require('fs');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");
const Target = { 'WEB': 'web', 'WORKER': 'webworker', 'NODE': 'node-webkit', 'ES2020': 'es2020', 'ES2021': 'es2021', 'ES2022': 'es2022' };

//================================================================

const year_first = 2023;
const year_now = new Date().getFullYear();
function replaceTextTokens(pathname, tokens) {
	let raw = fs.readFileSync(pathname, { encoding: 'utf-8' });
	for (let t of tokens) { raw = raw.replaceAll(`\[\[${t[0]}\]\]`, t[1]); }
	return raw;
}

//================================================================

const CopyrightNotice = replaceTextTokens(
	path.resolve(__dirname,'copyright.txt'),
	[
		['author','Jesse Stojan'],
		year_now === year_first ? ['year_start',''] : ['year_start', `${year_first} - `],
		['year_now',year_now],
		['domain','https://soylang.org'],
	]
);

//================================================================

const OutputEnvironment = {
	// The environment supports arrow functions ('() => { ... }').
	arrowFunction: true,
	// The environment supports BigInt as literal (123n).
	bigIntLiteral: true,
	// The environment supports const and let for variable declarations.
	const: true,
	// The environment supports destructuring ('{ a, b } = obj').
	destructuring: true,
	// The environment supports an async import() function to import EcmaScript modules.
	dynamicImport: false,
	// The environment supports 'for of' iteration ('for (const x of array) { ... }').
	forOf: true,
	// The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
	module: false,
	// The environment supports optional chaining ('obj?.a' or 'obj?.()').
	optionalChaining: true,
	// The environment supports template literals.
	templateLiteral: true
};

//================================================================

const Plugins = [new webpack.BannerPlugin({ banner: CopyrightNotice })];

//================================================================

function createConfig(name, outName = '[name].js', minify = false, targets = [Target.WEB, Target.ES2022], entries = {}, plugins = Plugins, dependencies = [], tests = [], aliases = {}, mangle = isProduction) {
	let result = {
		name: name, target: targets, entry: entries,
		output: { path: OutputPath, filename: outName, environment: OutputEnvironment },
		module: { rules: [{test: /\.(ts|tsx)$/i, loader: 'ts-loader', exclude: ['/node_modules/']},{test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i, type: 'asset'}] },
		resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js', '...'], alias: aliases },
		stats: { errorDetails: true, optimizationBailout: true, },
		optimization: {
			minimize: true,
			minimizer: [new TerserPlugin({
				parallel: os.cpus().length,
				extractComments: false,
				terserOptions: {
					format: { comments: /^!/, beautify: !minify, braces: !minify, },
					module: false,
					compress: { sequences:0, },
					mangle: mangle,
					enclose: false
				}})
			],
			splitChunks: { chunks: 'all' },
			concatenateModules: true,
			mergeDuplicateChunks: true,
			flagIncludedChunks: false,
			runtimeChunk: false,
		},
		plugins: plugins,
		mode: isProduction ? 'production' : 'development', dependencies: dependencies,
	};
	/* Add extra tests */
	if (tests.length) for (let test of tests) { result.module.rules.push(test); }
	return result;
}

//================================================================

module.exports = (env) => {
	const ESVer = Target.ES2022;
	const out_name = env.minify ? '[name].min.js' : '[name].js';
	console.log('CPU Count: ', os.cpus().length, '\nENV: ', env, '\nOut Name: ', out_name, '\nMinify: ', env.minify);
	return [
		//TODO: Add in sub-modules/libraries (Rich Text Editor, Socket, etc..)

		// Site (Pages, and others that needs to move to its own configurations..)
		createConfig(
			'site', out_name, !!(env.minify),
			[Target.WEB,ESVer],
			{
				'common': {			import: './src/common.ts',									library: {type: 'umd'},													},
				'socket': {			import: './src/plugins/socket/socket.ts',					library: {type: 'umd', name: 'Socket'},			dependOn: ['common']	},
				'api': {			import: './src/plugins/api/api.ts',							library: {type: 'umd', name: 'API'},			dependOn: ['common','socket']},
				'ui': {				import: './src/plugins/ui/ui.ts',							library: {type: 'umd', name: 'UI'},				dependOn: ['common']	},
				'web2d': {			import: './src/plugins/web2d/web2d.ts',						library: {type: 'umd'},													},
				'web3d': {			import: './src/plugins/web3d/web3d.ts',						library: {type: 'umd'},													},
				'gdpr': {			import: './src/site/gdpr.ts',								library: {type: 'self'},												},
				//'rte': {			import: './src/plugins/rte/RichTextEditor.ts',				library: {type: 'umd'},													},
				//'forum': {		import: './src/pages/forum.ts',								library: {type: 'self'},						dependOn: ['common','ui']},
				'changelog': {		import: './src/site/changelog.ts',							library: {type: 'self'},						dependOn: ['common','ui','api']},
				//'home': {			import: './src/site/home.ts',								library: {type: 'self'},						dependOn: ['common','ui']},
				'docs': {			import: './src/site/docs.ts',								library: {type: 'self'},						dependOn: ['common','ui','api']},
				//'resources': {	import: './src/site/resources.ts',							library: {type: 'self'},						dependOn: ['common','ui']},
				//'search': {		import: './src/site/search.ts',								library: {type: 'self'},						dependOn: ['common','ui']},
				//'support': {		import: './src/site/support.ts',							library: {type: 'self'},						dependOn: ['common','ui']},
				'user-portal': {	import: './src/site/user-portal.ts',						library: {type: 'self'},						dependOn: ['common','ui','api']},
				'admin-portal': {	import: './src/site/admin-portal.ts',						library: {type: 'self'},						dependOn: ['common','ui','api']},
			}, Plugins,
		),
		// Service Worker
		createConfig(
			'sw', out_name, !!(env.minify),
			[Target.WORKER,ESVer],
			{
				'sw': {				import: './src/sw/sw.ts',								library: {type: 'self'}},
			}, []
		),
	]
};

//================================================================
