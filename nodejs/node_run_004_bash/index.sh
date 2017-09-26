#!/usr/bin/env bash
#set -e

echo "* Install/activate required node version"

if [[ `command -v nvm` != 'nvm' ]]; then
    echo "sourcing nvm..."
    ## source bashrc to get nvm, but ignore failures
    source ~/.bashrc 2>&1 > /dev/null || true
fi
[[ `command -v nvm` != 'nvm' ]] && source ~/.bashrc 2>&1 > /dev/null || true


echo "* nvm version = $(nvm --version)"
echo "* nvm default aliases ="
nvm alias --no-colors
echo "* node version = $(node --version)"
echo "* npm version = $(npm --version)"
#env
#ls -la /opt/nvm/current/nvm.sh || true

nvm install
echo "* node version = $(node --version)"
echo "* npm version = $(npm --version)"
