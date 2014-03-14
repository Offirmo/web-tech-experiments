test:
	npm install
	rm -rf node_modules/network-constants
	mkdir  node_modules/network-constants
	cp -Lr ../*.js         node_modules/network-constants
	cp -Lr ../package.json node_modules/network-constants
	cp -Lr ../README.md    node_modules/network-constants
	cp -Lr ../spec         node_modules/network-constants
	./node_modules/.bin/mocha \
		--debug \
		--reporter nyan \
		--check-leaks \
		--require tests_init.js \
		node_modules/network-constants/spec/*

jt:
	rm -rf node_modules/network-constants
	mkdir  node_modules/network-constants
	cp -Lr ../*.js         node_modules/network-constants
	cp -Lr ../package.json node_modules/network-constants
	cp -Lr ../README.md    node_modules/network-constants
	cp -Lr ../spec         node_modules/network-constants
	./node_modules/.bin/mocha \
		--debug \
		--reporter nyan \
		--check-leaks \
		--require tests_init.js \
		node_modules/network-constants/spec/*

.PHONY: test
