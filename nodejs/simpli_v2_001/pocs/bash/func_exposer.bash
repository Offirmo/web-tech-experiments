#! /bin/bash

SIMPLI_module_provider_usage()
{
	echo "Provider badly called !" 1>&2
}


func_exposer()
{
	echo "Hello from func_exposer !"

	while [[ $# > 0 ]]; do
		case "$1" in

		*) # Unknown option
			echo "Unknown option : '$1' !" 1>&2
			SIMPLI_module_provider_usage
			return 1
		;;
		esac
		shift || (SIMPLI_module_provider_usage && return 1)
	done
}

return 0
