test:
	npm install
	rm -rf node_modules/extended-exceptions
	mkdir  node_modules/extended-exceptions
	cp -Lr ../*.js         node_modules/extended-exceptions
	cp -Lr ../package.json node_modules/extended-exceptions
	cp -Lr ../README.md    node_modules/extended-exceptions
	cp -Lr ../spec         node_modules/extended-exceptions
	./node_modules/.bin/mocha \
		--debug \
		--reporter nyan \
		--check-leaks \
		--require tests_init.js \
		node_modules/extended-exceptions/spec/*


jt:
	rm -rf node_modules/extended-exceptions
	mkdir  node_modules/extended-exceptions
	cp -Lr ../*.js         node_modules/extended-exceptions
	cp -Lr ../package.json node_modules/extended-exceptions
	cp -Lr ../README.md    node_modules/extended-exceptions
	cp -Lr ../spec         node_modules/extended-exceptions
	./node_modules/.bin/mocha \
		--debug \
		--reporter nyan \
		--check-leaks \
		--require tests_init.js \
		node_modules/extended-exceptions/spec/*


.PHONY: test
