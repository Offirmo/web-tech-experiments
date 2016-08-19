#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"

// http://inversify.io/

import kernel from "./inversify.kernel";
import TYPES from "./types";

var ninja = kernel.get<Warrior>(TYPES.Warrior);

console.log(ninja.fight()) //.eql("cut!"); // true
console.log(ninja.sneak()) //.eql("hit!"); // true
