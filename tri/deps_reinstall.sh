#!/usr/bin/env bash

source deps_infos.inc.sh


replace_bower_component_with_symlink_if_exists()
{
	## REM : current dir = current project which uses bower
	echo "    * replace_bower_component_with_symlink_if_exists($1, $2)"
	
	typeset var bower_project_path="$1" ## a place which needs bower install
	typeset var module_name="$2" ## module to replace with symlink if it exists

	typeset var module_path="bower_components/$module_name"
	
	pwd
	echo "    * Testing $module_path.."
	if [[ -d $module_path ]]; then
		echo "      * Found copy : $module_path"
		echo "      # 'rm -rf $module_path'..."
		rm -rf $module_path
		echo "      * Replacing with symlink :"
		echo "      # 'ln -s $INCUBATOR_PATH/$module_name $module_path'..."
		ln -s $INCUBATOR_PATH/$module_name $module_path
	fi
}
regen_bower_components()
{
	## REM : current dir = /work/www
	echo "  * regen_bower_components($1, $2)"
	
	typeset var bower_project_path="$1" ## a place which needs bower install
	typeset var current_module_name="$2" ## to skip when replacing with npm links (with .js here for ease of detection)
	
	echo "  * reinstalling bower deps of $bower_project_path..."
	cd "$bower_project_path"
	pwd
	
	#echo "XXX toreactivate"
	bower install
	if [[ $? -ne 0 ]]; then
		echo "XXX bower install failed !!!"
		exit 3
	fi

	## now link to local copies for locally developped modules
	for module in ${offirmo_bower_modules[*]}
	do
		if ! [[ $module == $current_module_name ]]; then
			replace_bower_component_with_symlink_if_exists  $bower_project_path  $module 
		fi
	done
	cd -
}


replace_node_modules_with_npm_link_if_exists()
{
	## REM : current dir = current project which uses npm
	echo "    * replace_node_modules_with_npm_link_if_exists($1, $2)"
	
	typeset var node_project_path="$1" ## a place which needs npm install
	typeset var module_name="$2" ## module to replace with npm link if it exists
	
	typeset var module_path="node_modules/$module_name"
	
	pwd
	echo "      * Testing $module_path.."
	
	if [[ -d "$module_path" ]]; then
		echo "      * Found copy : $module_path"
		echo "      # 'rm -rf $module_path'..."
		rm -rf $module_path
		echo "      * Replacing with npm link :"
		pwd
		npm link $module_name
	fi
}
regen_node_modules()
{
	## REM : current dir = /work/www
	echo "  * regen_node_modules($1, $2)"
	#return ## XXX
	
	typeset var node_project_path="$1" ## a place which needs npm install
	typeset var current_module_name="$2" ## to skip when replacing with npm links (with .js here for ease of detection)
	
	echo "  * reinstalling node deps of $node_project_path..."
	echo "  # 'cd $node_project_path; npm install'..."
	cd "$node_project_path"
	pwd
	
	#echo "XXX toreactivate"
	npm install
	if [[ $? -ne 0 ]]; then
		echo "XXX npm install failed !!!"
		exit 3
	fi
	
	## now link to local copies for locally developped modules
	for module in ${offirmo_npm_modules[*]}
	do
		if ! [[ $module == $current_module_name ]]; then
			replace_node_modules_with_npm_link_if_exists  $node_project_path  $module 
		fi
	done
	
	cd -
}


## reinstall node + bower
reinstall_offirmo_module()
{
	## REM : current dir = /work/www
	echo "* reinstall_offirmo_module($1, $2)"
	
	typeset var bower_name="$1"
	typeset var npm_name="$2"
	typeset var module_dir="$bower_name"

	echo "  reinstalling deps of dual module '$npm_name/$bower_name'..."
	
	#echo "[debug] status of npm links :"
	#ls -alF $NPM_LINKS_PATH
	
	regen_bower_components  "$INCUBATOR_PATH/$module_dir/test_runner"  $bower_name
	regen_node_modules      "$INCUBATOR_PATH/$module_dir"  $npm_name
	regen_node_modules      "$INCUBATOR_PATH/$module_dir/test_runner"  $npm_name
}

echo "* reinstalling deps of html_tests..."

echo "* Moving to root dir '$HTML_TESTS_PATH/..'"
cd "$HTML_TESTS_PATH/.."
pwd

#echo "* updating global npm..."
## NO !!!
## This wrecks npm links
## This update is now done in deps_clear.sh

## reinstall deps of Offirmo modules in incubation
for i in ${!offirmo_module_dirs[*]} ## iterate on index
do
	reinstall_offirmo_module  ${offirmo_bower_modules[i]}  ${offirmo_npm_modules[i]}
done

## reinstall deps of global tests
regen_bower_components "html_tests/app"  "html_tests"
regen_node_modules "html_tests"  "html_tests"

cd html_tests
for module in ${offirmo_npm_modules[*]}
do
	npm link $module 
done


echo "* All done."
