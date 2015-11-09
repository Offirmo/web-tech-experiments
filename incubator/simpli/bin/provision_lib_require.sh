#! /bin/bash

## simpli : SIMple Provisioning Library


require()
{
	SIMPLI_log_call "[$FUNCNAME($*)]"
	local module_id="$1"
	local module_version="$2" ## not used yet, TODO
	local module_alt_id=$(dirname $module_id)_$(basename $module_id)

	## 1) do we see the global variables ?
	if [[ ${simpli_init_test["init"]} != "init OK" ]]; then
		OSL_EXIT_abort_execution_with_message "SIMPLI is not correctly sourced : Can't find global vars !"
	fi
	## 2) can we modify a global var to pass info to other scripts ?
	simpli_init_test["modif"]="modif OK"

	## we need to load module definition before installing it
	ensure_module_definition_loaded $module_id

	if [[ ${modules["$module_alt_id"]} = true ]]; then
		echo "'$module_id' already installed."
	else
		## already installed ?
		test_module_installation_status "$module_id" "$module_version"
		if [[ $? -eq 0 ]]; then
			OSL_debug "* requiring '$module_id $module_version' : already installed."
		else
			OSL_debug "* '$module_id' seems not installed. [$?]"
			install_module "$module_id" "$module_version"
			OSL_EXIT_abort_execution_if_bad_retcode $? "Couldn't install '$module_id' !"
			modules["$module_alt_id"]=true
		fi
	fi

	return 0
}
