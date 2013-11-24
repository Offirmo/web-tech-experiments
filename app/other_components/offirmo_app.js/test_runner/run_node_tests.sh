#!/usr/bin/env bash

script_full_path=`readlink -f "$0"`
script_full_dir=`dirname "$script_full_path"`

if [[ -n $OFFIRMO_MAISON ]]; then
	rm -rf node_modules/extended-exceptions.js
	ln -s ../../../extended-exceptions.js node_modules/extended-exceptions.js
fi

export NODE_PATH=$script_full_dir/node_modules
./node_modules/.bin/mocha \
	--debug \
	--reporter nyan \
	--check-leaks \
	--require tests_init.js \
	../src/client/spec/* \
	../src/common/spec/* \
	../src/server/spec/*
