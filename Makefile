test:
	./node_modules/.bin/mocha \
		--debug \
		--reporter nyan \
		--check-leaks \
		--require tests_init.js \
		app/other_components/offirmo/base/spec/* \
		app/other_components/offirmo/user_society/spec/* \
		app/other_components/offirmo/app/spec/* \
		app/other_components/offirmo/utils/spec/* \
		app/other_components/offirmo/restlink/spec/*

run:
	./run.sh

.PHONY: test
