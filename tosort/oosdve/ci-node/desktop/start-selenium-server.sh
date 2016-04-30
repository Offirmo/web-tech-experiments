#! /bin/bash

## http://stackoverflow.com/a/19622569/587407
trap 'echo "error during script execution" && exit 1' ERR

## Continuous integration testing

NODE_VERSION=4.2.1
PROTRACTOR_VERSION=3.0.0

echo ""
echo "*** Le8 selenium server ***"
echo ""

echo "* Current situation :"
echo "  - hostname   : $(hostname)"
echo "  - whoami     : $(whoami)"
echo "  - cur. dir   : $(pwd)"


echo "* Preparing node environment..."

echo "* Installing and selecting node with nvm..."
[ ! -d "$HOME/.nvm" ] && (echo "ERROR: nvm seems to be missing !" && exit 1)
source ~/.nvm/nvm.sh
echo "* Installing required node.js version : $NODE_VERSION"
nvm install $NODE_VERSION
echo "* Selecting it..."
nvm use $NODE_VERSION

echo "* Node status :"
echo "  - nvm version  : $(nvm --version)"
echo "  - npm version  : $(npm --version)"
echo "  - node version : $(node --version)"
echo "  - global npm modules : $(ls ~/.nvm/versions/node/v$NODE_VERSION/lib/node_modules)"
echo "  - available node.js :"
echo "$(nvm ls)"

echo "* Installing tools..."
npm install -g protractor@$PROTRACTOR_VERSION
webdriver-manager update
echo " - `date` - webdriver-manager update : $?"

echo "* launching selenium server..."
## inside tmux, reasons forgotten...
## if relaunch : clean possible previous session (|| true = always succeed)
tmux kill-session -t e2e 2>/dev/null || true
## while do... is a trivial auto-restart, since seen webdriver stop
tmux new-session -d -s e2e 'while true; do webdriver-manager start; sleep 1; done;'
tmux -2 attach-session -t e2e
echo " - `date` - tmux : $?"
