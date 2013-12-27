test:
	rm -rf node_modules/extended-exceptions
	mkdir node_modules/extended-exceptions
	cp -r ../extended_exceptions.js node_modules/extended-exceptions
	cp -r ../package.json node_modules/extended-exceptions
	cp -r ../spec node_modules/extended-exceptions
	./node_modules/.bin/mocha \
		--debug \
		--reporter nyan \
		--check-leaks \
		--require tests_init.js \
		node_modules/extended-exceptions/spec/*

run:
	./run.sh

.PHONY: test
