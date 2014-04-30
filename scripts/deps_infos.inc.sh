#! /bin/bash

typeset var NPM_LINKS_PATH="/home/offirmo/.nave/installed/0.10.26/lib/node_modules"
typeset var HTML_TESTS_PATH="/work/www/html_tests"
typeset var INCUBATOR_PATH="$HTML_TESTS_PATH/incubator"

## Those 3 lists must be kept in sync
declare -a offirmo_npm_modules=('base-objects'      'extended-exceptions'    'generic_store'    'network-constants'    'offirmo_app'    'restlink');
declare -a offirmo_bower_modules=('base-objects.js' 'extended-exceptions.js' 'generic_store.js' 'network-constants.js' 'offirmo_app.js' 'restlink.js');
declare -a offirmo_module_dirs=("${offirmo_bower_modules[@]}");

#echo ${offirmo_npm_modules[@]}
#echo ${offirmo_bower_modules[@]}

#for item in ${offirmo_npm_modules[*]}
#do
#	printf "   %s\n" $item
#done
