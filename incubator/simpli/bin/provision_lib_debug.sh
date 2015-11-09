#! /bin/bash

## simpli : SIMple Provisioning Library
## Special debug primitives for simpli

## simple wrapper for more control
SIMPLI_debug()
{
	OSL_debug $*
	#do_nothing=1
}

## to be called like that :
## SIMPLI_log_call "[$FUNCNAME($*)]"
SIMPLI_log_call()
{
	SIMPLI_debug $*
	#do_nothing=1
}

## to be called like that :
## SIMPLI_log_source `basename "$BASH_SOURCE"`
SIMPLI_log_source()
{
	SIMPLI_debug "file '$*' is being evaluated…"
	do_nothing=1
}

SIMPLI_log_module_defs()
{
	SIMPLI_debug $*
	do_nothing=1
}
