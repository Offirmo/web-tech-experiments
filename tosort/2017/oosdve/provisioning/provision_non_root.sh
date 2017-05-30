#! /bin/bash

## Shell provision script

echo "#########################"
echo "# NON root provisioning #"
echo "#########################"

## safety
## http://serverfault.com/a/500778
export LANG=en_US.UTF-8
export LANGUAGE=en_US.UTF-8
export LC_ALL=en_US.UTF-8

## debug informations
echo "* start ENV"
echo "  - BASH_SUBSHELL = $BASH_SUBSHELL"
echo "  - BASH_SOURCE   = $BASH_SOURCE"
echo "  - whoami        = `whoami`"
echo "  - pwd           = `pwd`"
echo "  - LANG          = `echo $LANG`"
echo "  - LC_ALL        = `echo $LC_ALL`"
echo "  - PATH          = $PATH"
## full env
#env




## TODO
## nvm

## rvm
# source /home/sam/.rvm/scripts/rvm


#. enable_completion
#umake ide webstorm

## polices powerline
https://github.com/powerline/fonts


https://github.com/powerline/fonts/raw/master/DroidSansMonoDotted/Droid%20Sans%20Mono%20Dotted%20for%20Powerline.ttf

git clone --recursive https://github.com/powerline/fonts.git
cd fonts
./install.sh
cd ..
rm -rf fonts


gsettings set org.gtk.Settings.FileChooser show-hidden true
gsettings set com.canonical.Unity always-show-menus true
