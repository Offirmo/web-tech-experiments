#!/usr/bin/env bash

## Clear all dependencies and, BTW, prepare future deps reinstall
## by properly registering npm links
## There is a logic behind this

source deps_infos.inc.sh


clear_and_clean_offirmo_module()
{
	typeset var module_path="$1"
	
	echo "* Registering $module_path for npm link... (this may trigger some npm downloads)"
	cd "$module_path"
	echo "» 'npm link'..."
	npm link
	cd -
	
	echo "* clearing deps of module $module_path..."
	echo "» 'rm -rf ...'..."
	rm -rf $module_path/node_modules
	rm -rf $module_path/test_runner/node_modules
	rm -rf $module_path/test_runner/bower_components
}

echo "* Clearing deps of html_tests..."

echo "* Moving to root dir '$HTML_TESTS_PATH/..'"
cd "$HTML_TESTS_PATH/.."
pwd

echo "* cleaning global deps..."
echo "» 'rm -rf ...'..."
rm -rf html_tests/node_modules
rm -rf html_tests/app/bower_components


## XXX npm update -g wrecks our nice npm links
## so we full update BEFORE registering them as links
echo "* Performing global npm update"
nave.sh install stable
npm update -g
npm install -g bower
npm install -g npm-check-updates
#npm install -g karma
npm install -g mversion


echo "* cleaning (potentially wrong) npm links..."
for item in ${offirmo_npm_modules[*]}
do
	echo "  » rm -rf $NPM_LINKS_PATH/$item"
	rm -rf $NPM_LINKS_PATH/$item
done


echo "* cleaning npm modules and regenerating npm links..."
for item in ${offirmo_module_dirs[*]}
do
	clear_and_clean_offirmo_module  $INCUBATOR_PATH/$item
done
