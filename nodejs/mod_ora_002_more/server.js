#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node --harmony_destructuring "$0" "$@"
'use strict';

console.log('Hello world !');

////////////////////////////////////////////////////////////

const _ = require('lodash');

// https://github.com/sindresorhus/ora
const ora = require('ora');

let spinIndex = 0;
const spinners = [
	"dots",
	"dots2",
	"dots3",
	"dots4",
	"dots5",
	"dots6",
	"dots7",
	"dots8",
	"dots9",
	"dots10",
	"dots11",
	"line",
	"line2",
	"pipe",
	"simpleDots",
	"simpleDotsScrolling",
	"star",
	"star2",
	"flip",
	"hamburger",
	"grow",
	"grow2",
	"balloon",
	"balloon2",
	"noise",
	"bounce",
	"boxBounce",
	"boxBounce2",
	"triangle",
	"arc",
	"circle",
	"spin",
	"spin2",
	"spin3",
	"spin4",
	"toggle",
	"toggle2",
	"toggle3",
	"toggle4",
	"toggle5",
	"toggle6",
	"toggle7",
	"toggle8",
	"toggle9",
	"toggle10",
	"toggle11",
	"toggle12",
	"toggle13",
	"arrow",
	"arrow2",
	"arrow3",
	"bouncing",
	"bouncingBall",
	"smiley",
	"monkey",
	"hearts",
	"clock",
	"earth",
	"moon",
	"runner"
];


let spinner;

function go() {
	spinner = ora({
		text: 'Loading with spinner "' + spinners[spinIndex] + '"',
		spinner: spinners[spinIndex],
		color: 'yellow'
	});
	spinner.start();
}
go();



let stdin = process.stdin;

// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'utf8' );

// on any data into stdin
stdin.on( 'data', function( key ){
	// ctrl-c ( end of text )
	if ( key === '\u0003' ) {
		process.exit();
	}
	// write the key to stdout all normal like
	spinner.stop();
	spinIndex++;
	go();
	//process.stdout.write( key );
});
