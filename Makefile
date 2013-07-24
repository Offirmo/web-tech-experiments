test:
	./node_modules/.bin/mocha \
		--reporter nyan \
		--check-leaks \
		app/other_components/nomrpg/base/spec/* \
		app/other_components/nomrpg/user-society/spec/* \
		app/other_components/nomrpg/account/spec/*

.PHONY: test
