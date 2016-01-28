#!/usr/bin/env node
'use strict';

console.log('Hello world !');

// https://github.com/mattinsler/longjohn

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'production'){
	require('longjohn');
}

// ... your code

//longjohn.async_trace_limit = 5;   // defaults to 10
//longjohn.async_trace_limit = -1;  // unlimited


function f() { throw new Error('Catch me, longjohn !'); }
setTimeout(f, Math.random()*1000);
