#! /bin/bash

## simpli : SIMple Provisioning Library
## Example : for use with Vagrant.
## by Offirmo <offirmo.net@gmail.com>
## Work In Progress

SIMPLI_DIR=`dirname "$BASH_SOURCE"`/..
## note that dir may be relative. Ok for now until we load OSL

## We use the OSL shell lib. Load it.
## To ease shipment, we have an embedded OSL copy
## but we'll use system one if it's more recent.
## There is a technique for that (cf. OSL doc)
embedded_osl_bootstrap_script=$SIMPLI_DIR/contrib/offirmo-shell-lib/bin/osl_lib_bootstrap.sh
source "$embedded_osl_bootstrap_script" "$embedded_osl_bootstrap_script"

## OSL should now be available, source it
source osl_lib_init.sh
source osl_lib_debug.sh
source osl_lib_output.sh
source osl_lib_string.sh
source osl_lib_rsrc.sh
source osl_lib_version.sh
source osl_lib_exit.sh
source osl_lib_capabilities.sh
source osl_lib_archive.sh
source osl_lib_pathvar.sh
source osl_lib_file.sh

## enhance $SIMPLI_DIR
## relative was OK so far but need absolute
SIMPLI_DIR=`OSL_FILE_abspath $SIMPLI_DIR`

## declare shared global variables
## (arrays must be declared here and this way to be global)
declare -A module_load_statuses
## a special var to test a common error in sourcing simpli
declare -A simpli_init_test=( ["init"]="init OK" );


## include provisionning primitives
source $SIMPLI_DIR/bin/provision_inc_env.sh
source $SIMPLI_DIR/bin/provision_lib_debug.sh
OSL_OUTPUT_display_success_message "*** $SIMPLI_NAME ***"
OSL_debug "simpli v$SIMPLI_VERSION ($SIMPLI_STAMP)"
source $SIMPLI_DIR/bin/provision_inc_globals.sh
OSL_debug "Running as $SIMPLI_EXEC_MODE"
OSL_debug "Lib root is : $SIMPLI_DIR"
source $SIMPLI_DIR/bin/provision_lib_modules.sh
source $SIMPLI_DIR/bin/provision_lib_require.sh
source $SIMPLI_DIR/bin/provision_lib_require_misc.sh

## Needed base
require_defined_variable "ROOT_WORKING_AREA_PATH"
require_directory       "$ROOT_WORKING_AREA_PATH"
require_defined_variable "ROOT_TEMP_AREA_PATH"
require_directory       "$ROOT_TEMP_AREA_PATH"
require_defined_variable "ROOT_PROV_AREA_PATH"
require_directory       "$ROOT_PROV_AREA_PATH"
require_defined_variable "ROOT_BIN_AREA_PATH"
require_directory       "$ROOT_BIN_AREA_PATH"
require_defined_variable "ROOT_BASHRCD_PATH"
require_directory       "$ROOT_BASHRCD_PATH"

require_defined_variable "USER_WORKING_AREA_PATH"
require_directory       "$USER_WORKING_AREA_PATH"
require_defined_variable "USER_TEMP_AREA_PATH"
require_directory       "$USER_TEMP_AREA_PATH"
require_defined_variable "USER_BIN_AREA_PATH"
require_directory       "$USER_BIN_AREA_PATH"
require_defined_variable "USER_BASHRCD_PATH"
require_directory       "$USER_BASHRCD_PATH"
require_defined_variable "USER_SRC_AREA_PATH"
require_directory       "$USER_SRC_AREA_PATH"

require_defined_variable "ROOT_ENV_FILE"
require_file            "$ROOT_ENV_FILE"
require_defined_variable "USER_ENV_FILE"
require_file            "$USER_ENV_FILE"

## setup environment
# http://serverfault.com/a/670688/103801
export DEBIAN_FRONTEND=noninteractive

## keep up to date and lean
if [[ $SIMPLI_EXEC_MODE == "root" ]]; then

	## needed for avoiding an error msg
	## http://serverfault.com/a/500778
	#if [[ -n $LANG ]]; then
	#	## I admit cargo-culting here...
	#	locale-gen $LANG
	#	update-locale
	#	dpkg-reconfigure locales
	#fi

	## When starting from scratch (ex. provisioning a new machine),
	## an early update is mandatory.
	## But we add a stamp to avoid doing it on subsequent launches (ex. local machine, tests).
	if [[ ! -f "$INITIAL_APT_BOOTSTRAP_DONE" ]]; then
		apt-get update
		OSL_EXIT_abort_execution_if_bad_retcode $? "Error early-updating apt !"
		## Those 2 packets are needed for installing common apt sources.
		## Conveniently install them.
		apt-get install --yes  python-software-properties  apt-transport-https
		OSL_EXIT_abort_execution_if_bad_retcode $? "Error installing convenience packets !"
		## eventually, stamp to avoid doing it on subsequent launches
		echo "# `date`" > "$INITIAL_APT_BOOTSTRAP_DONE"
	fi

	## expected to be defined
	install_apt_sources

	## resume actual provisionning
	SIMPLI_debug "SIMPLI_SKIP_APT_UPDATE = $SIMPLI_SKIP_APT_UPDATE"
	if [[ -z $SIMPLI_SKIP_APT_UPDATE ]]; then
		apt-get update
		OSL_EXIT_abort_execution_if_bad_retcode $? "Error updating apt !"
	fi

	## keep our machine up to date
	SIMPLI_debug "SIMPLI_SKIP_APT_UPGRADE = $SIMPLI_SKIP_APT_UPGRADE"
	if [[ -z $SIMPLI_SKIP_APT_UPGRADE ]]; then
		apt-get upgrade --yes
		OSL_EXIT_abort_execution_if_bad_retcode $? "Error upgrading apt packets !"
		## keep our machine clean and lean
		apt-get autoremove --yes
	fi
fi


if [[ $SIMPLI_EXEC_MODE == "root" ]]; then
	## install the extensible env init file
	echo "# `date`" > "$ROOT_ENV_FILE"
	## expose some vars
	require_env_line "export SIMPLI_ROOT_WORKING_DIR=$ROOT_WORKING_AREA_PATH"
	require_env_line "export SIMPLI_ROOT_BIN_DIR=$ROOT_BIN_AREA_PATH"
else
	## install the extensible env init file
	echo "# `date`" > "$USER_ENV_FILE"
	cat "$SIMPLI_DIR/misc/bashrc" >> "$USER_ENV_FILE"

	## make user env file inherit root env file
	require_env_line "source $ROOT_ENV_FILE"

	## complete our extensible with dynamically computed infos :

	## expose some vars
	require_env_line "export SIMPLI_USER_WORKING_DIR=$USER_WORKING_AREA_PATH"
	require_env_line "export SIMPLI_USER_BIN_DIR=$USER_BIN_AREA_PATH"

	## make it auto-load some dirs
	echo ""                                                  >> "$USER_ENV_FILE"
	echo "## auto-load root bashrc files"                    >> "$USER_ENV_FILE"
	echo "source_bash_files_from_dir \"$ROOT_BASHRCD_PATH\"" >> "$USER_ENV_FILE"
	echo "## auto-load user bashrc files"                    >> "$USER_ENV_FILE"
	echo "source_bash_files_from_dir \"$USER_BASHRCD_PATH\"" >> "$USER_ENV_FILE"

	echo ""                                                  >> "$USER_ENV_FILE"
	echo "## user-defined lines will be added below :"       >> "$USER_ENV_FILE"

	## eventually, link it to the existing .bashrc
	OSL_FILE_ensure_line_is_present_in_file "source \"$USER_ENV_FILE\"" "~/.bashrc"
fi

# dpkg-reconfigure tzdata ?
