#!/usr/bin/env bash
trap exit ERR
set -o errexit
set -o errtrace
set -o nounset
set -o pipefail


## will fail due to trap ERR
#false

## will fail due to -o nounset
set +o nounset
. ~/.nvm/nvm.sh
echo $FOO
set -o nounset


echo "* current shell     : '`ps -p $$ -ocomm=`'"
echo "* current user      : `whoami`"
echo "* nvm version       : `nvm --version`"
echo "* Node version      : `node --version`"
echo "* npm version       : `npm --version`"
echo "* yarn version      : `yarn --version`"
echo "* npm-cache version : `npm-cache --version`"
echo "* npm config        : '`cat ~/.npmrc`'"

