test:
	./node_modules/.bin/mocha \
		--reporter nyan \
		--check-leaks \
		app/other_components/offirmo/base/spec/*  \
		app/other_components/offirmo/user_society/spec/person_spec.js

.PHONY: test
