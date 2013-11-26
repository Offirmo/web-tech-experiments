#!/usr/bin/env bash

## XXX BE CAREFUL
## THIS SCRIPT MUST ONLY BE RUN ON A COPY OF THE REPO !!!!

if [[ `pwd` == "/work/www/htmt_tests" ]]; then
	echo "are you mad ????"
	exit 3
fi


## remove git data
rm -rf .git


## remove node modules (doesn't propagate to symlinks on unix, good)
rm -rf  node_modules
rm -rf  incubator/base-objects.js/test_runner/node_modules
rm -rf  incubator/extended-exceptions.js/test_runner/node_modules
rm -rf  incubator/generic_store.js/test_runner/node_modules
rm -rf  incubator/network-constants.js/test_runner/node_modules
rm -rf  incubator/offirmo_app.js/test_runner/node_modules
rm -rf  incubator/restlink.js/test_runner/node_modules

## remove bower modules
## No !


## done
