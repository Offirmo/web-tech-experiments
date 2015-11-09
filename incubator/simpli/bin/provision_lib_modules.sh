#! /bin/bash

## simpli : SIMple Provisioning Library

## test correct sourcing :
#echo "modules init : ${!simpli_init_test[@]}"
#echo "modules init : ${simpli_init_test[@]}"

## returns 0 if OK, exits if not (too important)
ensure_module_definition_loaded()
{
	SIMPLI_log_call "[$FUNCNAME($*)]"
	local module_id="$1"

	## test correct sourcing :
	#echo "modules run : ${!simpli_init_test[@]}"
	#echo "modules run : ${simpli_init_test[@]}"
	## 1) do we see the global variables ?
	if [[ ${simpli_init_test["init"]} != "init OK" ]]; then
		OSL_EXIT_abort_execution_with_message "SIMPLI is not correctly sourced : Can't find global vars !"
	fi
	## 2) can we modify a global var to pass info to other scripts ?
	if [[ ${simpli_init_test["modif"]} != "modif OK" ]]; then
		OSL_EXIT_abort_execution_with_message "SIMPLI is not correctly sourced : Can't share data with other scripts !"
	fi

	if [[ ${module_load_statuses[$module_id]} != true ]]; then
		load_module_definition "$module_id"
		OSL_EXIT_abort_execution_if_bad_retcode $? "Couldn't load '$module_id' !"
		module_load_statuses[$module_id]=true
	else
		SIMPLI_log_module_defs "'$module_id' definitions already loaded."
	fi

	return 0
}


## returns 0 if OK, exits if not (too important)
load_module_definition()
{
	SIMPLI_log_call "[$FUNCNAME($*)]"
	local module_id="$1"
	local module_base=$(basename $module_id)

	## first try in current path
	## then if error, try in standard modules dir
	## then try various styles
	if [[ -f "$module_id.sh" ]]; then
		source "$module_id.sh"
	elif [[ -f "$SIMPLI_DIR/modules/$module_id/$module_base.apt.sh" ]]; then
		source  "$SIMPLI_DIR/modules/$module_id/$module_base.apt.sh"
	elif [[ -f "$SIMPLI_DIR/modules/$module_id/$module_base.yum.sh" ]]; then
		source  "$SIMPLI_DIR/modules/$module_id/$module_base.yum.sh"
	elif [[ -f "$SIMPLI_DIR/modules/$module_id/$module_base.unmanaged.sh" ]]; then
		source  "$SIMPLI_DIR/modules/$module_id/$module_base.unmanaged/.sh"
	else
		OSL_EXIT_abort_execution_with_message "couldn't find module definition for '$module_id' !"
	fi
	## also allow a "common" file, which is an *addition*
	if [[ -f "$SIMPLI_DIR/modules/$module_id/$module_base.common.sh" ]]; then
		source "$SIMPLI_DIR/modules/$module_id/$module_base.common.sh"
	fi
	OSL_EXIT_abort_execution_if_bad_retcode $? "Couldn't load '$module_id' !"

	validate_module_definition "$module_id"
	OSL_EXIT_abort_execution_if_bad_retcode $? "'$module_id' definition is invalid. Please check !"

	SIMPLI_log_module_defs "Definition file successfully loaded for '$module_id'."
	return 0
}


validate_module_definition()
{
	SIMPLI_log_call "[$FUNCNAME($*)]"
	local module_id="$1"
	local module_fn_id=$(dirname $module_id)_$(basename $module_id)

	local function

	function=ensure_${module_fn_id}_installed_root
	[[ `type -t $function` != "function" ]] && OSL_OUTPUT_display_error_message "Missing function $function !" && return 1

	function=check_${module_fn_id}_installed_user
	[[ `type -t $function` != "function" ]] && OSL_OUTPUT_display_error_message "Missing function $function !" && return 1

	function=ensure_${module_fn_id}_installed_user
	[[ `type -t $function` != "function" ]] && OSL_OUTPUT_display_error_message "Missing function $function !" && return 1

	function=ensure_${module_fn_id}_sourced
	[[ `type -t $function` != "function" ]] && OSL_OUTPUT_display_error_message "Missing function $function !" && return 1

	function=get_installed_${module_fn_id}_summary
	[[ `type -t $function` != "function" ]] && OSL_OUTPUT_display_error_message "Missing function $function !" && return 1

	return 0
}

## return 0 if installed OK
test_module_installation_status()
{
	SIMPLI_log_call "[$FUNCNAME($*)]"
	local module_id="$1"
	local module_version="$2"
	local module_fn_id=$(dirname $module_id)_$(basename $module_id)

	local fnname=check_${module_fn_id}_installed_${SIMPLI_EXEC_MODE}
	$fnname "$module_version"
	return $?
}


## print module informations
## return 0 if OK
get_installed_module_summary()
{
	local module_id="$1"
	local module_version="$2"
	local module_fn_id=$(dirname $module_id)_$(basename $module_id)

	local fnname=get_installed_${module_fn_id}_summary
	echo "`$fnname "$module_version"`"
	return $?
}


## returns 0 if OK
install_module()
{
	SIMPLI_log_call "[$FUNCNAME($*)]"
	local module_id="$1"
	local module_version="$2"
	local module_fn_id=$(dirname $module_id)_$(basename $module_id)
	OSL_OUTPUT_notify "* Installing module '$module_id'..."

	local fnname=ensure_${module_fn_id}_installed_${SIMPLI_EXEC_MODE}
	$fnname "$module_version"
	OSL_EXIT_abort_execution_if_bad_retcode $? "Error installing '$module_id' !"
	OSL_OUTPUT_display_success_message "'$module_id' installed successfully."

	return 0
}


## prints info on all installed modules
print_provisionning_summary()
{
	SIMPLI_log_call "[$FUNCNAME($*)]"

	if [[ $SIMPLI_EXEC_MODE != "user" ]]; then
		OSL_OUTPUT_warn "Provisionning isn't finished ! If they weren't any error, now please continue it in user mode."
	else
		echo
		OSL_OUTPUT_bold "Provisionning finished. If they weren't any error, you can review installed stuff here :"

		echo -e $OSL_OUTPUT_STYLE_SUCCESS

		OSL_CAPABILITIES_ensure_current_linux_distribution_detected
		echo -e "OS${SUMMARY_ALIGN:2} $OSL_CAPABILITIES_OSSTR"

		## -e for newlines and color codes
		echo -en "$summary_report_complement"

		for id in "${!module_load_statuses[@]}"; do
			echo -n "$id"
			echo -n "${SUMMARY_ALIGN:${#id}} "
			echo "`get_installed_module_summary "$id"`"
		done

		echo -en "$OSL_OUTPUT_STYLE_DEFAULT"
	fi
}
