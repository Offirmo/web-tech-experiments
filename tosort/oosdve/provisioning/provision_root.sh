#! /bin/bash

## Shell provision script

echo "#####################"
echo "# root provisioning #"
echo "#####################"

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


################################

## prepare possible alternative locales
sudo locale-gen fr_FR
sudo locale-gen fr_FR.UTF-8

## To handle apt repositories
sudo apt install -y  software-properties-common python-software-properties

## allow secure apt repositories
sudo apt install -y  apt-transport-https

## add apt repositories
sudo add-apt-repository -y ppa:ubuntu-desktop/ubuntu-make
sudo add-apt-repository -y ppa:webupd8team/java

## prepare further installations
sudo apt update
sudo apt upgrade --yes

## ensure our machine has correct time
sudo apt install -y  ntp

## A useful resource monitoring tool.
## Just run it to test it.
sudo apt install -y  dstat

## A useful resource monitoring tool. (better than 'top')
## Just run it to test it.
sudo apt install -y  htop

## useful for misc operations
sudo apt install -y  zip

## standard, posix-compliant safe shell
sudo apt install -y  bash

## basic tools
sudo apt install -y  jq curl vim nano

## headers (for extensions)
sudo apt install -y  linux-headers-$(uname -r)

## minimal desktop env
sudo apt install -y --no-install-recommends ubuntu-desktop
sudo apt install -y  python-gtk2
sudo apt install -y  acpi-support alsa-base pulseaudio

## desktop utils
sudo apt install -y  indicator-session gnome-terminal unity-lens-applications unity-lens-files p7zip-full p7zip-rar

############ DEV ############

## Java
#sudo apt-get install -y  oracle-java8-installer
#sudo apt-get install -y  oracle-java8-set-default

## man pages
sudo apt install -y  man-db

## obviously
sudo apt install -y  git

## a better shell for dev
sudo apt install -y  zsh

## a tool to install more tools !
sudo apt install -y  ubuntu-make

## to share files
sudo apt install -y  samba

## gcc
sudo apt install -y  build-essential

## for node (dixit nvm)
sudo apt install -y  libssl-dev

## chrome
## https://www.google.fr/chrome/browser
sudo apt install -y  libappindicator1 libindicator7 libxss1 fonts-liberation libcurl3 xdg-utils
cd
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
rm google-chrome-stable_current_amd64.deb


############ post install cleanups ############
sudo apt-get -y autoclean
sudo apt-get -y clean
sudo apt-get -y autoremove --purge

#sudo apt-get purge -y landscape-client landscape-common apport puppet
