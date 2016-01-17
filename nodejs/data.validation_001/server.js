#!/usr/bin/env node
'use strict';

console.log('Hello world !');

var _ = require('lodash');

// https://github.com/folktale/data.validation
var Validation = require('data.validation');
var Success = Validation.Success;
var Failure = Validation.Failure;

// Functions that need to do validation return one of two cases:
//
//  -  A Success with the value they want to propagate.
//  -  Some value representing one or more failures, using a semigroup.
//     Lists are the more straight-forward semigroup, so we just use them
//     here.
function isPasswordLongEnough(a) {
	return a.length > 6?    Success(a)
		:      /* otherwise */  Failure(['Password must have more than 6 characters']);
}

function isPasswordStrongEnough(a) {
	return /[\W]/.test(a)?  Success(a)
		:      /* otherwise */  Failure(['Password must contain special characters']);
}

// To aggregate the failures, we start with a Success case containing
// a curried function of arity N (where N is the number of validations),
// and we just use an `.ap`-ply chain to get either the value our Success
// function ultimately returns, or the aggregated failures.
function isPasswordValid(a) {
	return Success(function(x){ return function(y){ return a }})
		.ap(isPasswordLongEnough(a))
		.ap(isPasswordStrongEnough(a));
}


console.log( isPasswordValid('foo') );
// => Validation.Failure([
//      'Password must have more than 6 characters.',
//      'Password must contain special characters.'
//    ])

console.log( isPasswordValid('rosesarered') );
// => Validation.Failure([
//      'Password must contain special characters.'
//    ])

console.log( isPasswordValid('rosesarered$andstuff') );
// => Validation.Success('rosesarered$andstuff')
