simpli
======
SIMple Provision LIb - a very simple, shell based [server provisioning](http://en.wikipedia.org/wiki/Provisioning#Server_provisioning) tool aimed at (but not reserved to) Vagrant.

A really simple alternative to puppet, chef, etc.


User story
==========
I learnt puppet. I really learn it and was able to setup a fairly complex configuration (see it https://github.com/Offirmo/offirmo-puppet) which I used to provision my development VMs, my pet projects Amazon instance and some charities websites. It was hard but it worked.

Lately at work, some VM provisioning was needed. I started a puppet config, then I broke. It was too hard. My coworkers would never be able to debug my code unless they spend two weeks learning puppet like I did. Puppet alternatives didn't look a lot simpler to me. And just running a bunch of `sudo apt-get install` and `wget xyz; tar -x …` shouldn't be so hard.

There had to be another way to do it. Time to try it my way !


How simple ?
============

* written in bash, nothing to install (no ruby, no binaries, etc.)
* thanks to bash, you write your install steps naturally, no need to constrict them in another language
* modular design : import and use custom or pre-written modules
* clear separation between root stuff and user stuff
* makes strong assumptions to ease overall complexity (more about this below)


Should I use it ?
=================
NO. Too early.

Only works on apt-based systems.


How do I use it ?
=================

https://docs.google.com/spreadsheets/d/1s7fYxqqWLO5S1nSF_XQ7CbU48fp-PkmPbsBrgor9JLc

```
/work                       ROOT_WORKING_AREA_PATH
/work/temp                  ROOT_TEMP_AREA_PATH
/work/provisioning          ROOT_ENV_FILE           <-- do not touch, simpli internal use only
/work/bin                   ROOT_BIN_AREA_PATH
/work/bin/.bashrc           ROOT_ENV_FILE


~/work                      USER_WORKING_AREA_PATH
~/work/temp                 USER_TEMP_AREA_PATH
~/work/bin                  USER_BIN_AREA_PATH
~/work/src                  USER_SRC_AREA_PATH
~/work/bin/.bashrc          USER_ENV_FILE


module :
offirmo/foo
 foo.apt.sh
 foo.apt.prepare.sh
 foo.yum.sh
 foo.manual.sh
 foo.common.sh
 
check_${module_fn_id}_installed
ensure_${module_fn_id}_installed_root
check_${module_fn_id}_installed_user
ensure_${module_fn_id}_installed_user
ensure_${module_fn_id}_sourced
get_installed_${module_fn_id}_summary
 
apt

env lines


dirs

version managers
```

Licence
=======
Code itself is "unlicensed" (http://choosealicense.com/licenses/unlicense/)

Several 3rd-party libs are used, which have their own license :
* semver_bash https://github.com/cloudflare/semver_bash
* offirmo-shell-lib https://github.com/Offirmo/offirmo-shell-lib
