#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"
console.log('Hello, typescript world !')


export enum WebServiceError {
	THROTTLED = -999,
	UNAUTHORIZED,
}

console.log('WebServiceError', WebServiceError)
console.log('WebServiceError THROTTLED', WebServiceError.THROTTLED)

throw new Error(WebServiceError[WebServiceError.THROTTLED])
