#!/usr/bin/env bash

## XXX BE CAREFUL
## THIS SCRIPT MUST ONLY BE RUN ON A COPY OF THE REPO !!!!

if [[ `pwd` == "/work/www/html_tests" ]]; then
	echo "are you mad ????"
	exit 3
fi


## remove git data
rm -rf .git

## remove project data
rm -rf .idea


slim_bower_components()
{
	typeset var comp_path="$1"
	echo "* slimming bower_components $comp_path..."
	
	if [[ -d "$comp_path/base-objects.js" ]]; then
		rm -rf "$comp_path/base-objects.js"
	fi
	if [[ -d "$comp_path/extended-exceptions.js" ]]; then
		rm -rf "$comp_path/extended-exceptions.js"
	fi
	if [[ -d "$comp_path/generic_store.js" ]]; then
		rm -rf "$comp_path/generic_store.js"
	fi
	if [[ -d "$comp_path/network-constants.js" ]]; then
		rm -rf "$comp_path/network-constants.js"
	fi
	if [[ -d "$comp_path/offirmo_app.js" ]]; then
		rm -rf "$comp_path/offirmo_app.js"
	fi
	if [[ -d "$comp_path/restlink.js" ]]; then
		rm -rf "$comp_path/restlink.js"
	fi
	
	if [[ -d "$comp_path/angular-isotope" ]]; then
		rm -rf $comp_path/angular-isotope/demo
	fi
	if [[ -d "$comp_path/backbone" ]]; then
		rm -rf $comp_path/backbone/docs
		rm -rf $comp_path/backbone/test
		rm $comp_path/backbone/index.html
	fi
	if [[ -d "$comp_path/console-shim" ]]; then
		rm -rf $comp_path/console-shim/lib
	fi
	if [[ -d "$comp_path/datatables" ]]; then
		rm -rf $comp_path/datatables/examples
		rm -rf $comp_path/datatables/media/src
		rm -rf $comp_path/datatables/media/unit-testing
	fi
	if [[ -d "$comp_path/javascript-state-machine" ]]; then
		rm -rf $comp_path/javascript-state-machine/minifier
		rm -rf $comp_path/javascript-state-machine/test
		rm -rf $comp_path/javascript-state-machine/demo
	fi
	if [[ -d "$comp_path/modernizr" ]]; then
		rm -rf $comp_path/modernizr/test
	fi
	if [[ -d "$comp_path/requirejs" ]]; then
		rm -rf $comp_path/requirejs/tests
		rm -rf $comp_path/requirejs/dist
		rm -rf $comp_path/requirejs/docs
	fi
	if [[ -d "$comp_path/underscore" ]]; then
		rm -rf $comp_path/underscore/test
		rm -rf $comp_path/underscore/docs
	fi
	if [[ -d "$comp_path/when" ]]; then
		rm -rf $comp_path/when/test
	fi
}
process_offirmo_module()
{
	typeset var module_path="$1"
	echo "* processing module $module_path..."
	
	## remove node modules (doesn't propagate to symlinks on unix, good)
	rm -rf $module_path/test_runner/node_modules/*
	rm -rf $module_path/test_runner/node_modules/.bin
	
	## remove bower components
	## No !
	## slim them out only
	slim_bower_components $module_path/test_runner/bower_components
}

process_offirmo_module  incubator/base-objects.js
process_offirmo_module  incubator/extended-exceptions.js
process_offirmo_module  incubator/generic_store.js
process_offirmo_module  incubator/network-constants.js
process_offirmo_module  incubator/offirmo_app.js
process_offirmo_module  incubator/restlink.js


## remove node modules (doesn't propagate to symlinks on unix, good)
rm -rf  node_modules
slim_bower_components app/bower_components

## done
