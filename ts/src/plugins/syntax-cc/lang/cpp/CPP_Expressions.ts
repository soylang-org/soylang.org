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
 * Changelog: https://soylang.org/logs/proj/soylang-website/ts/src/plugins/syntax-cc/lang/cpp/CPP_Expression.ts
 */
import {CPP_Tokens, CPP_AlternativeTokens} from "./CPP_Tokens";

export const CPP_Operators = {
	assignment: {
		'=': {},
		'+=': {},
		'-=': {},
		'*=': {},
		'/=': {},
		'%=': {},
		'&=': {},
		'|=': {},
		'^=': {},
		'<<=': {},
		'>>=': {},
	},
	incremental: {
		'++a': {},
		'--a': {},
		'a++': {},
		'a--': {},
	},
	arithmetic: {
		'+a': {},
		'-a': {},
		'a+b': {},
		'a-b': {},
		'a*b': {},
		'a/b': {},
		'a%b': {},
		'~a': {},
		'a&b': {},
		'a|b': {},
		'a^b': {},
		'a<<b': {},
		'a>>b': {},
	},
	logical: {
		'!': {},
		'&&': {},
		'||': {},
	},
	comparison: {
		'==': {},
		'!=': {},
		'<': {},
		'>': {},
		'<=': {},
		'>=': {},
		'<=>': {},
	},
	member_access: {
		'a[b]': {},
		'*a': {},
		'&a': {},
		'a->b': {},
		'a.b': {},
		'a->*b': {},
		'a.*b': {},
	},
	other: {
		'a(...)': {},
		'a,b': {},
		'a?b:c': {},
	},
	special: {
		'static_cast': {},
		'dynamic_cast': {},
		'const_cast': {},
		'reinterpret_cast': {},
		'(a)': {},
		'new': {},
		'delete': {},
		'sizeof': {},
		'typeid': {},
		'noexcept': {},
		'alignof': {},
	},
};

export type CPP_AssignmentOperator =
	'=' |	// assign
	'+=' |	// add assign
	'-=' |	// subtract assign
	'*=' |	// multiply assign
	'/=' |	// divide assign
	'%=' |	// modulo assign
	'&=' |	// and assign
	'|=' |	// or assign
	'^=' |	// xor assign
	'<<=' |	// shift left assign
	'>>=';	// shift right assign

export enum CPP_OperatorPrecedence {
	SCOPE				= 1,	// ::
	POSTFIX				= 2,	// a++, a--
	FUNCTIONAL_CAST		= 2,	// type(), type{}
	FUNCTION_CALL		= 2,	// a()
	SUBSCRIPT			= 2,	// a[]
	MEMBER_ACCESS		= 2,	// ., ->
	PREFIX				= 3,	// ++a, --a
	UNARY				= 3,	// +a, -a
	CSTYLE_CAST			= 3,	// (type)
	LOGICAL_NOT			= 3,	// !
	BITWISE_NOT			= 3,	// ~
	INDIRECTION			= 3,	// *a (dereference)
	ADDRESS_OF			= 3,	// &a
	SIZEOF				= 3,	// sizeof
	CO_AWAIT			= 3,	// co_await
	NEW					= 3,	// new, new[]
	DELETE				= 3,	// delete, delete[]
	POINTER_TO_MEMBER	= 4,	// .*, ->*
	MULTIPLICATION		= 5,	// a * b
	DIVISION			= 5,	// a / b
	REMAINDER			= 5,	// a % b
	ADDITION			= 6,	// a + b
	SUBTRACTION			= 6,	// a - b
	BITWISE_SHIFT		= 7,	// a << n, a >> n
	THREE_WAY_COMPARE	= 8,	// <=>
	RELATIONAL			= 9,	// a < b, a > b, a <= b, a >= b
	EQUALITY			= 10,	// a == b, a != b
	BITWISE_AND			= 11,	// a & b
	BITWISE_XOR			= 12,	// a ^ b
	BITWISE_OR			= 13,	// a | b
	LOGICAL_AND			= 14,	// a && b
	LOGICAL_OR			= 15,	// a || b
	TERNARY				= 16,	// a ? b : c
	CO_YIELD			= 16,	// co_yield
	DIRECT_ASSIGNMENT	= 16,	// =
	COMPOUND_ASSIGNMENT	= 16,	// +=, -=, *=, /=, %=, <<=, >>=, &=, ^=, |=
	COMMA				= 17	// ,
}

export type CPP_Cast = 'const_cast' | 'static_cast' | 'dynamic_cast' | 'reinterpret_cast';

export class CPP_Expressions {
	constructor() {
	}
}
