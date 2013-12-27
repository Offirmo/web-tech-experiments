#!/usr/bin/env bash

script_full_path=`readlink -f "$0"`
script_full_dir=`dirname "$script_full_path"`

rm -f node_modules/extended-exceptions
ln -s ../../extended_exceptions.js node_modules/extended-exceptions.js

export NODE_PATH=$script_full_dir/node_modules
./node_modules/.bin/mocha \
	--debug \
	--reporter nyan \
	--check-leaks \
	--require tests_init.js \
	../spec/*
