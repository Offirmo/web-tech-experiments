#! /bin/bash

## simpli : SIMple Provisioning Library


## Are we running as root ?
## http://stackoverflow.com/questions/18215973/how-to-check-if-running-as-root-in-a-bash-script
#if [[ $EUID -eq 0 ]]; then
if [[ `id -u` -eq 0 ]]; then
	## we are root
	SIMPLI_EXEC_MODE="root"
else
	SIMPLI_EXEC_MODE="user"
fi


## Should we avoid critical operations ?
## (useful while testing for ex.)
## Critical = any op which may destroy important stuff/feature, ex. overwriting ssh keys
SIMPLI_SHOULD_AVOID_CRITICAL_OPS=false


## WARNING Those dirs must be mirrored in index.sh

## place where we'll put stuff installed with sudo
export ROOT_WORKING_AREA_PATH="/work"
## and its subdirs
export ROOT_TEMP_AREA_PATH="$ROOT_WORKING_AREA_PATH/tmp"
export ROOT_PROV_AREA_PATH="$ROOT_WORKING_AREA_PATH/provisioning"
export ROOT_BIN_AREA_PATH="$ROOT_WORKING_AREA_PATH/bin"
export ROOT_BASHRCD_PATH="$ROOT_BIN_AREA_PATH/bashrc.d"
## and the environment file, to be sourced to get env vars
export ROOT_ENV_FILE="$ROOT_BIN_AREA_PATH/.bashrc"


## place where we'll put stuff installed in user mode
## Warning : this may have to be expanded.
export USER_WORKING_AREA_PATH=`OSL_FILE_realpath "~/work"`
## and its subdirs
export USER_TEMP_AREA_PATH="$USER_WORKING_AREA_PATH/tmp"
export USER_BIN_AREA_PATH="$USER_WORKING_AREA_PATH/bin"
export USER_BASHRCD_PATH="$USER_BIN_AREA_PATH/bashrc.d"
export USER_SRC_AREA_PATH="$USER_WORKING_AREA_PATH/src"
## and the environment file, to be sourced to get env vars
export USER_ENV_FILE="$USER_BIN_AREA_PATH/.bashrc"

## special files whom presence indicates things done
export INITIAL_APT_BOOTSTRAP_DONE="$ROOT_PROV_AREA_PATH/INITIAL_APT_BOOTSTRAP_DONE.stamp"

## Summary
## id alignment max size and help
export SUMMARY_ALIGN="                       "
## for non standard installs
export summary_report_complement=""
