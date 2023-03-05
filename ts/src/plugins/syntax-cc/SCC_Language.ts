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
 * Changelog: https://soylang.org/logs/proj/soylang-website/ts/src/plugins/syntax-cc/SCC_Language.ts
 */

//================================================================

export enum SCC_LanguageClass {
	'APACHE'			= 'SCC-LANG-APACHE',
	'C'					= 'SCC-LANG-C',
	'CONF'				= 'SCC-LANG-CONF',
	'CPP'				= 'SCC-LANG-CPP',
	'CSHARP'			= 'SCC-LANG-CSHARP',
	'CSS'				= 'SCC-LANG-CSS',
	'GLSL'				= 'SCC-LANG-GLSL',
	'GO'				= 'SCC-LANG-GO',
	'HLSL'				= 'SCC-LANG-HLSL',
	'HTML'				= 'SCC-LANG-HTML',
	'INI'				= 'SCC-LANG-INI',
	'JS'				= 'SCC-LANG-JS',
	'JSON'				= 'SCC-LANG-JSON',
	'MARKDOWN'			= 'SCC-LANG-MARKDOWN',
	// 'MAXSCRIPT'			= 'SCC-LANG-MAXSCRIPT',
	// 'MEL'				= 'SCC-LANG-MEL',
	'OBJ_C'				= 'SCC-LANG-OBJ-C',
	'OBJ_CPP'			= 'SCC-LANG-OBJ-CPP',
	'PHP'				= 'SCC-LANG-PHP',
	'PYTHON'			= 'SCC-LANG-PY',
	'RUST'				= 'SCC-LANG-RS',
	'SQL'				= 'SCC-LANG-SQL',
	'SWIFT'				= 'SCC-LANG-SWIFT',
	'TS'				= 'SCC-LANG-TS',
	// 'VB'				= 'SCC-LANG-VB',

	'SH'				= 'SCC-LANG-SH',
	//'PS1'				= 'SCC-LANG-PS1',
	'YAML'				= 'SCC-LANG-YAML',
	'TOML'				= 'SCC-LANG-TOML',
}

//================================================================

export interface SyntaxProfileOptions {
	name: string;
}

//================================================================

export interface SyntaxProfileParseOptions {
	// Tab Size for spaces, default is up to 4 spaces = 1 tab character
	tabSize: number;
}

//================================================================

export enum SyntaxKeywordType {
	KEYWORD,
	EXPRESSION,
	JUMP,
	LABEL,
	LOOP,
	MODIFIER,
	OBJECT,
	OPERATOR,
	QUALIFIER,
	SPECIFIER,
	STATEMENT,
	TRY_CATCH,
	TYPE,
}

//================================================================

// export const SCC_Token = {
// 	DEFAULT:			{key: 'DEFAULT',			css: 'scc-0'},	// Default Syntax Color
// 	ATTRIBUTE:			{key: 'ATTRIBUTE',			css: 'scc-a'},	// Attributes
// 	BUILTIN_TYPE:		{key: 'BUILTIN_TYPE',		css: 'scc-b'},	// Keyword Built-In Data Types
// 	COMMENT:			{key: 'COMMENT',			css: 'scc-c'},	// Comments
// 	COMMENT_ERROR:		{key: 'COMMENT_ERROR',		css: 'scc-c-e'},	// ERROR: comments
// 	COMMENT_NOTE:		{key: 'COMMENT_NOTE',		css: 'scc-c-n'},	// NOTE: Comments
// 	COMMENT_TODO:		{key: 'COMMENT_TODO',		css: 'scc-c-t'},	// TODO: Comments
// 	COMMENT_WARN:		{key: 'COMMENT_WARN',		css: 'scc-c-w'},	// WARN: Comments
// 	CONSTANT:			{key: 'CONSTANT',			css: 'scc-cn'},	// Constant Value Names or (e.g. __func__, __line__)
// 	ENUM:				{key: 'ENUM',				css: 'scc-e'},	// Enum Key Names
// 	ESCAPE:				{key: 'ESCAPE',				css: 'scc-es'},	// Escape Character(s)
// 	EXPRESSION:			{key: 'EXPRESSION',			css: 'scc-x'},	// Keyword Expression
// 	FUNCTION:			{key: 'FUNCTION',			css: 'scc-f'},	// Function Names
// 	GENERIC:			{key: 'GENERIC',			css: 'scc-g'},	// Generic/Template Placeholder <T>
// 	IMPORT:				{key: 'IMPORT',				css: 'scc-im'},	// Import/Include Names/Strings
// 	INTERFACE:			{key: 'INTERFACE',			css: 'scc-i'},	// Interface Names
// 	JUMP:				{key: 'JUMP',				css: 'scc-j'},	// Keyword Jump Statement (return, continue, break, etc..)
// 	KEYWORD:			{key: 'KEYWORD',			css: 'scc-k'},	// Built-In Keywords misc.
// 	KW_OPERATOR:		{key: 'KW_OPERATOR',		css: 'scc-kz'},	// Keyword Operators (sizeof, etc..)
// 	KW_OBJECT:			{key: 'KW_OBJECT',			css: 'scc-ko'},	// Keyword Object (class, struct, union, etc..)
// 	LOOP:				{key: 'LOOP',				css: 'scc-l'},	// Keyword Loop (do, while, for, foreach, etc..)
// 	LABEL:				{key: 'LABEL',				css: 'scc-lp'},	// Keyword Label/Property
// 	MACRO:				{key: 'MACRO',				css: 'scc-m'},	// Macro Keywords (#if #elif, etc..)
// 	MACRO_DEFINITION:	{key: 'MACRO_DEFINITION',	css: 'scc-md'},	// Macro Definition Names
// 	MACRO_SYMBOL:		{key: 'MACRO_SYMBOL',		css: 'scc-ms'},	// Macro Predefined Symbols
// 	MODIFIER:			{key: 'MODIFIER',			css: 'scc-mo'},	// Keyword Modifiers
// 	NAMESPACE:			{key: 'NAMESPACE',			css: 'scc-ns'},	// Namespace Names
// 	NUMBER:				{key: 'NUMBER',				css: 'scc-n'},	// Number Literals
// 	OBJECT:				{key: 'OBJECT',				css: 'scc-o'},	// Object Names
// 	OPERATOR:			{key: 'OPERATOR',			css: 'scc-z'},	// Operators ()[]+-*/= etc..
// 	PARAMETER:			{key: 'PARAMETER',			css: 'scc-p'},	// Parameter Names
// 	QUALIFIER:			{key: 'QUALIFIER',			css: 'scc-q'},	// Keyword Qualifier
// 	SPECIFIER:			{key: 'SPECIFIER',			css: 'scc-sp'},	// Keyword Specifier
// 	STATEMENT:			{key: 'STATEMENT',			css: 'scc-st'},	// Keyword Statements (return, if, else, etc..)
// 	STRING:				{key: 'STRING',				css: 'scc-s'},	// Strings
// 	TOKEN:				{key: 'TOKEN',				css: 'scc-tk'},	// Tokens
// 	TRY_CATCH:			{key: 'TRY_CATCH',			css: 'scc-tc'},	// Keyword try {} catch {}
// 	TYPE:				{key: 'TYPE',				css: 'scc-t'},	// Data Types
// 	UNUSED:				{key: 'UNUSED',				css: 'scc-u'},	// Unused Line/Name (changes the opacity)
// 	VARIABLE:			{key: 'VARIABLE',			css: 'scc-v'},	// Variable Names
// };

//
// export enum SCC_TokenClass {
// 	DEFAULT					= 'scc-0',	// Default Syntax Color
// 	ATTRIBUTE				= 'scc-a',	// Attributes
// 	BUILTIN_TYPE			= 'scc-b',	// Keyword Built-In Data Types
// 	COMMENT					= 'scc-c',	// Comments
// 	COMMENT_ERROR			= 'scc-c-e',	// ERROR: comments
// 	COMMENT_NOTE			= 'scc-c-n',	// NOTE: Comments
// 	COMMENT_TODO			= 'scc-c-t',	// TODO: Comments
// 	COMMENT_WARN			= 'scc-c-w',	// WARN: Comments
// 	CONSTANT				= 'scc-cn',	// Constant Value Names or (e.g. __func__, __line__)
// 	ENUM					= 'scc-e',	// Enum Key Names
// 	ESCAPE					= 'scc-es',	// Escape Character(s)
// 	EXPRESSION				= 'scc-x',	// Keyword Expression
// 	FUNCTION				= 'scc-f',	// Function Names
// 	GENERIC					= 'scc-g',	// Generic/Template Placeholder <T>
// 	IMPORT					= 'scc-im',	// Import/Include Names/Strings
// 	INTERFACE				= 'scc-i',	// Interface Names
// 	JUMP					= 'scc-j',	// Keyword Jump Statement (return, continue, break, etc..)
// 	KEYWORD					= 'scc-k',	// Built-In Keywords misc.
// 	KW_OPERATOR				= 'scc-kz',	// Keyword Operators (sizeof, etc..)
// 	KW_OBJECT				= 'scc-ko',	// Keyword Object (class, struct, union, etc..)
// 	LOOP					= 'scc-l',	// Keyword Loop (do, while, for, foreach, etc..)
// 	LABEL					= 'scc-lp',	// Keyword Label/Property
// 	MACRO					= 'scc-m',	// Macro Keywords (#if #elif, etc..)
// 	MACRO_DEFINITION		= 'scc-md',	// Macro Definition Names
// 	MACRO_SYMBOL			= 'scc-ms',	// Macro Predefined Symbols
// 	MODIFIER				= 'scc-mo',	// Keyword Modifiers
// 	NAMESPACE				= 'scc-ns',	// Namespace Names
// 	NUMBER					= 'scc-n',	// Number Literals
// 	OBJECT					= 'scc-o',	// Object Names
// 	OPERATOR				= 'scc-z',	// Operators ()[]+-*/= etc..
// 	PARAMETER				= 'scc-p',	// Parameter Names
// 	QUALIFIER				= 'scc-q',	// Keyword Qualifier
// 	SPECIFIER				= 'scc-sp',	// Keyword Specifier
// 	STATEMENT				= 'scc-st',	// Keyword Statements (return, if, else, etc..)
// 	STRING					= 'scc-s',	// Strings
// 	TOKEN					= 'scc-tk',	// Tokens
// 	TRY_CATCH				= 'scc-tc',	// Keyword try {} catch {}
// 	TYPE					= 'scc-t',	// Data Types
// 	UNUSED					= 'scc-u',	// Unused Line/Name (changes the opacity)
// 	VARIABLE				= 'scc-v',	// Variable Names
// }

export enum SCC_TokenClass {
	DEFAULT					= 'SC00',	// Default Syntax Color
	UNUSED					= 'SC01',	// Unused Line/Name (changes the opacity)
	/* RESERVED [SC02~SC0F] */
	ATTRIBUTE				= 'SC10',	// Attributes
	BUILTIN_TYPE			= 'SC11',	// Keyword Built-In Data Types
	BOOL					= 'SC12',	// Booleans (true, false, TRUE, FALSE, True, False)
	COMMENT					= 'SC12',	// Comments
	COMMENT_ERROR			= 'SC13',	// ERROR: comments
	COMMENT_NOTE			= 'SC14',	// NOTE: Comments
	COMMENT_TODO			= 'SC15',	// TODO: Comments
	COMMENT_WARN			= 'SC16',	// WARN: Comments
	CONSTANT				= 'SC17',	// Constant Value Names or (e.g. __func__, __line__)
	ENUM					= 'SC18',	// Enum Key Names
	ESCAPE					= 'SC19',	// Escape Character(s)
	EXPRESSION				= 'SC1A',	// Keyword Expression
	FUNCTION				= 'SC1B',	// Function Names
	GENERIC					= 'SC1C',	// Generic/Template Placeholder <T>
	IMPORT					= 'SC1D',	// Import/Include Names/Strings
	INTERFACE				= 'SC1E',	// Interface Names
	JUMP					= 'SC1F',	// Keyword Jump Statement (return, continue, break, etc..)
	KEYWORD					= 'SC20',	// Built-In Keywords misc.
	KW_OBJECT				= 'SC21',	// Keyword Object (class, struct, union, etc..)
	KW_OPERATOR				= 'SC22',	// Keyword Operators (sizeof, etc..)
	LABEL					= 'SC23',	// Keyword Label/Property
	LIST					= 'SC23',	// Lists
	ITERATOR				= 'SC24',	// Keyword Loop (do, while, for, foreach, etc..)
	MACRO					= 'SC25',	// Macro Keywords (#if #elif, etc..)
	MACRO_DEFINITION		= 'SC26',	// Macro Definition Names
	MACRO_SYMBOL			= 'SC27',	// Macro Predefined Symbols
	MODIFIER				= 'SC28',	// Keyword Modifiers
	NAMESPACE				= 'SC29',	// Namespace Names
	NULL					= 'SC2A',	// Null/Nil
	NUMBER					= 'SC2A',	// Number Literals
	OBJECT					= 'SC2B',	// Object Names
	OPERATOR				= 'SC2C',	// Operators ()[]+-*/= etc..
	PARAMETER				= 'SC2D',	// Parameter Names
	QUALIFIER				= 'SC2E',	// Keyword Qualifier
	SPECIFIER				= 'SC2F',	// Keyword Specifier
	STATEMENT				= 'SC30',	// Keyword Statements (return, if, else, etc..)
	STRING					= 'SC31',	// Strings
	TOKEN					= 'SC32',	// Tokens
	TRY_CATCH				= 'SC33',	// Keyword try {} catch {}
	TYPE					= 'SC34',	// Data Types
	USER_LITERAL			= 'SC35',	// User Defined Literals
	VARIABLE				= 'SC36',	// Variable Names
}

// const Tokens2 = {
// 	ATTRIBUTE: {},
// 	CONSTANT: {},
// 	DECLARE: {},
// 	ESCAPE: {},
// 	EXPRESSION: {},
// 	FUNCTION: {},
// 	IDENTIFIER: {},
// 	ITERATOR: {},
// 	JUMP: {},
// 	KEYWORD: {},
// 	LABEL: {},
// 	MACRO: {},
// 	MODIFIER: {},
// 	NUMBER: {},
// 	OBJECT: {},
// 	OPERATOR: {},
// 	PARAMETER: {},
// 	PROTOTYPE: {},
// 	QUALIFIER: {},
// 	SPECIFIER: {},
// 	STATEMENT: {},
// 	STRING: {},
// 	TRY_CATCH: {},
// 	TYPE: {},
// 	VARIABLE: {},
// };

//================================================================

export enum SCC_DecoratorClass {
	ERROR					= 'scc-err',
	WARN					= 'scc-warn',
	INFO					= 'scc-info',
}

//================================================================

/**
 * Base class for Syntax Profiles
 */
export abstract class SCC_Language {
//private:
	#name: string;

//protected:
	protected constructor(options: SyntaxProfileOptions) {
		this.#name = options.name;
	}

//public:
	get name() { return this.#name; }

	abstract get lang(): SCC_Language;

	/**
	 * Parse a string of code, overridden by the SyntaxProfile derived class
	 * @param code string of code to parse
	 * @param options syntax profile parser options
	 */
	abstract parse(code: string, options?: SyntaxProfileParseOptions): void;

}

//================================================================
