
Design principles
* made for installation, not for cleaning/maintenance. If your install change, spin a new VM and drop the old one.
* bash as much as possible
* Ubuntu, MacOS, CentOS
* easy "1st install"
* vagrant
* docker
* semver https://github.com/npm/node-semver
* unix

Tech
* a python helper lib for semver ?
* https://en.wikipedia.org/wiki/DOT_(graph_description_language)
  * http://rise4fun.com/agl
* https://fr.wikipedia.org/wiki/Uniform_Resource_Name

- already installed ?
- custom modules
- custom providers



require "for system module:xyz#^1.0.9"

require "for system user:toto as main_user"

require "for main_user module:nvm#1.4 as nvm"

require "for main_user/nvm node#0.12.7 as node"

require "for main_user/node global_npm_module:nodemon#3.10"


PATH
user = x (sourcé)
nvm = x (sourcé)
node = x (sélectionné)


provider
- (global) name
- (global) already installed ?
- (global) version of already installed
- (provider) semver range
- (provider) global / user
- (provider) from version manager / packaged / from source


Real use case

URN
http://

require postgresql-server@~9.3
require redis-server@^2
require oss-server@1.5.4-SNAPSHOT-b629
require exiftool@9.53
require graphicsmagick
require imagemagick

require ruby@^1.9.3
require ruby:gem compass

require git@^1.8.2
require git:repo git@github.com:lemonde/cms.git as repo_cms

require nvm@0.26.1
require node@$(cat $REPO_CMS_PATH/.nvmrc) as cms_node
require node#cms_node:npm:global-module grunt-cli
require node#cms_node:npm:production-modules $REPO_CMS_PATH

load node#cms_node
cd $REPO_CMS_PATH
npm run-script bower-update
grunt db:init
grunt search:sync
grunt search:index:all
