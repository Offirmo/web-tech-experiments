web-tech-experiments
====================

[![Project status](http://img.shields.io/badge/project_status-highly_experimental-red.png)](http://offirmo.net/classifying-open-source-projects-status/)
[![license](http://img.shields.io/badge/license-public_domain-brightgreen.png)](http://unlicense.org/)
[![Gittip](http://img.shields.io/gittip/Offirmo.png)](https://www.gittip.com/Offirmo/)


http://offirmo.github.io/web-tech-experiments/

Introduction
------------

Various small html/css/js tests to :
- test some language features
- test some libraries seen on the web
- test some unclear documentation points

See the /app folder. Tests are named according what is tested.

The /incubator folder is also the place where the prototype modules I develop live. If they prove useful,
they go into their own repo and get "submodulized".


Commands
--------

* `npm i` install all dependencies
* `puer` starts a web server and opens default browser on root


Private notes
-------------

```bash
node scripts/tcpproxy.js 5858 127.0.0.1 8585 &
node --debug-brk=8585 --debug server.js
node --debug restlink_server.js
node --debug server.js
```

```bash
npm install -g grunt-cli yo generator-famous
npm install -g grunt-cli npm-check-updates selenium-standalone
```

TODO docs (wikis)
- when
- ui-router
- ui-router-extras
- cheat sheet
- famous

’
