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
 * Changelog: https://soylang.org/logs/proj/soylang-website/ts/src/plugins/syntax-cc/lang/cpp/CPP_Object.ts
 */
import {CPP_Expressions}                   from "./CPP_Expressions";
import {CPP_Variable, CPP_VariableOptions} from "./CPP_Variable";
import {CPP_Function, CPP_FunctionOptions} from "./CPP_Function";

export enum CPP_StatementType {
	Labeled,
	Expression,
	Compound,
	Selection,
	Iteration,
	Jump,
	Declaration,
	TryBlock,
	AtomicBlock,
	SynchronizedBlock,
}

export enum CPP_LabeledStatement {
	// GOTO_LABEL		= '<label>:',
	CASE				= 'case',
	DEFAULT				= 'default',
}

export enum CPP_SelectionStatement {
	IF					= 'if',
	ELSE				= 'else',
	SWITCH				= 'switch',
}

export enum CPP_IterationStatement {
	DO					= 'do',
	WHILE				= 'while',
	FOR					= 'for',
}

export enum CPP_JumpStatement {
	BREAK				= 'break',
	CONTINUE			= 'continue',
	RETURN				= 'return',
	GOTO				= 'goto',
}

export interface CPP_DataModels {
	standard: number;
	lp32: number;	// Win16
	ilp32: number;	// Win32, Linux, macOS 32-bit
	llp64: number;	// Win64
	lp64: number;	// Unix/Linux/macOS
}

export const CPP_TypeBitSize: {[key:string]: CPP_DataModels} = {
	SHORT: {
		standard: 16,
		lp32: 16,
		ilp32: 16,
		llp64: 16,
		lp64: 16,
	},
	INT: {
		standard: 16,
		lp32: 32,
		ilp32: 32,
		llp64: 32,
		lp64: 32,
	},
	LONG: {
		standard: 32,
		lp32: 32,
		ilp32: 32,
		llp64: 32,
		lp64: 64,
	},
	LONG_LONG: {
		standard: 64,
		lp32: 64,
		ilp32: 64,
		llp64: 64,
		lp64: 64,
	}
}

export enum CPP_Statement {
	BREAK				= 'break',
	CASE				= 'case',
	CATCH				= 'catch',
	CONTINUE			= 'continue',
	DO					= 'do',
	ELSE				= 'else',
	FOR					= 'for',
	IF					= 'if',
	RETURN				= 'return',
	SWITCH				= 'switch',
	TRY					= 'try',
	WHILE				= 'while',
}

export enum CPP_Loop {
	DO					= 'do',
	WHILE				= 'while',
	FOR					= 'for',
}

export enum CPP_ObjectType {
	UNION				= 'union',
	CLASS				= 'class',
	STRUCT				= 'struct',
}

export enum CPP_Specifier {
	TYPEDEF				= 'typedef',
}

export enum CPP_FunctionSpecifier {
	VIRTUAL				= 'virtual',
	OVERRIDE			= 'override',
	FINAL				= 'final',
}

export enum CPP_TypeAlias {
	USING				= 'using',
}

export enum CPP_StorageClassSpecifier {
	AUTO				= 'auto',
	STATIC				= 'static',
	EXTERN				= 'extern',
	THREAD_LOCAL		= 'thread_local',
	MUTABLE				= 'mutable',
}

export enum CPP_CharacterType {
	CHAR 				= 'char',
	WCHAR_T				= 'wchar_t',
	CHAR16_T			= 'char16_t',
	CHAR32_T			= 'char32_t',
}

export enum CPP_IntegerType {
	SHORT				= 'short',
	LONG				= 'long',
	INT					= 'int',
}

export enum CPP_NonStorageType {
	VOID				= 'void',
}

export enum CPP_FloatingPointType {
	FLOAT				= 'float',
	DOUBLE				= 'double',
	// LONG_DOUBLE			= 'long double',
}

export class CPP_PointerFunction {
	constructor() {
	}
}

export type CPP_ValueType = number | string | CPP_Object | CPP_PointerFunction | null | 'nullptr_t';

export type CPP_TypeDeclaration = 'bool';
export type CPP_TypeQualifier = 'auto' | 'static' | 'extern' | 'mutable' | 'const';
export type CPP_TypeSpecifier = 'auto';
export type CPP_DeclarationSpecifier = 'consteval' | 'constexpr' | 'constinit';

export enum CPP_ObjectAccessSpecifier {
	PRIVATE				= 'private',
	PROTECTED			= 'protected',
	PUBLIC				= 'public',
}

export interface CPP_ObjectMethodOptions extends CPP_FunctionOptions {
	object: CPP_Object;
	access: CPP_ObjectAccessSpecifier;
}

export class CPP_ObjectMethod extends CPP_Function {
//private:
	#object: CPP_Object;

//public:
	constructor(options: CPP_ObjectMethodOptions) {
		super(options);
		this.#object = options.object;
	}

	get object() { return this.#object; }
}

export interface CPP_ObjectVariableOptions extends CPP_VariableOptions {
	object: CPP_Object;
	access: CPP_ObjectAccessSpecifier;
}

export class CPP_ObjectVariable extends CPP_Variable {
	constructor(options: CPP_ObjectVariableOptions) {
		super(options);
	}
}

//================================================================

export interface CPP_ObjectOptions {
	constructors?: CPP_ObjectMethod[];
	destructor?: CPP_ObjectMethod[];
	methods?: CPP_ObjectMethod[];
	variables?: CPP_ObjectVariable[];
	staticMethods?: CPP_ObjectMethod[];
	staticVariables?: CPP_ObjectVariable[];

	objects?: CPP_Object[];
	staticObjects?: CPP_Object[];
}

export abstract class CPP_Object {
	// #constructors: CPP_ObjectMethod[];
	// #destructor: CPP_ObjectMethod;
	// #methods: CPP_ObjectMethod[];
	// #variables: CPP_ObjectVariable[];
	//
	// #staticMethods: CPP_ObjectMethod[];
	// #staticVariables: CPP_ObjectVariable[];

	protected constructor(options: CPP_ObjectOptions) {
	}

	abstract type(): CPP_ObjectType;
}

//================================================================

export interface CPP_UnionOptions extends CPP_ObjectOptions {

}

export class CPP_Union extends CPP_Object {
	constructor(options: CPP_UnionOptions) {
		super(options);
	}

	override type() { return CPP_ObjectType.UNION; }
}

//================================================================

export interface CPP_StructOptions extends CPP_ObjectOptions {

}

export class CPP_Struct extends CPP_Object {
	constructor(options: CPP_StructOptions) {
		super(options);
	}

	override type() { return CPP_ObjectType.STRUCT; }
}

//================================================================

export interface CPP_ClassOptions extends CPP_ObjectOptions {

}

export class CPP_Class extends CPP_Object {
	constructor(options: CPP_ClassOptions) {
		super(options);
	}

	override type() { return CPP_ObjectType.CLASS; }
}

//================================================================
