#!/usr/bin/env bash


update_node_modules()
{
	typeset var root_path="$1"
	echo "* updating node deps of $root_path..."
	mkdir -p "$root_path/node_modules"
	cd "$root_path"
	npm update
	npm prune
	cd -
}
upate_bower_components()
{
	typeset var root_path="$1"
	echo "* reinstalling bower deps of $root_path..."
	mkdir -p "$root_path/bower_components"
	cd "$root_path"
	bower update
	bower prune
	cd -
}

update_offirmo_module()
{
	typeset var module_path="$1"
	echo "* reinstalling deps of module $module_path..."
	update_node_modules "$module_path/test_runner"
	upate_bower_components "$module_path/test_runner"
}

echo "* updating global npm..."
npm update -g
#npm install -g bower

echo "* updating deps of html_tests..."

#update_offirmo_module base-objects.js
update_offirmo_module html_tests/app/other_components/base-objects.js

#update_offirmo_module extended-exceptions.js
update_offirmo_module html_tests/app/other_components/extended-exceptions.js

#update_offirmo_module network-constants.js
update_offirmo_module html_tests/app/other_components/network-constants.js

#update_offirmo_module restlink.js
update_offirmo_module html_tests/app/other_components/restlink.js


update_node_modules "html_tests"
upate_bower_components "html_tests/app"
