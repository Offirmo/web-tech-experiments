In this test I want to launch my web server in the best way.

- [ ] serve pages (obviously !)
- [ ] resistant to caught
- [ ] resistant to uncaught
- [ ] uses cluster (for uncaught and perf)
- [ ] able to send log
- [ ] no mem leaks
- [ ] connections timeout
- [ ] clean exit
- [ ] all the above works in heroku
- [ ] livereload


I found those tools : (in order of layer)

foreman
=======
used at heroku, so mandatory use.
http://blog.daviddollar.org/2011/05/06/introducing-foreman.html
http://ddollar.github.io/foreman/

gem install foreman

Procfile       http://ddollar.github.io/foreman/#PROCFILE
   ou npm start (package.json:main ou package.json:scripts.start)
.env           http://ddollar.github.io/foreman/#ENVIRONMENT
.foreman       http://ddollar.github.io/foreman/#DEFAULT-OPTIONS

sends SIGTERM
convert SIGIN (CtrlC) to SIGTERM

restart ?

```bash
foreman start
foreman start --procfile Procfile.dev --env=.env.dev
```


heroku
======
https://devcenter.heroku.com/categories/nodejs
https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process

60s to bind https://devcenter.heroku.com/articles/dynos#web-dynos
10s to close (SIGTERM then SIGKILL) https://devcenter.heroku.com/articles/dynos#graceful-shutdown-with-sigterm
use foreman
set a few headers

.gitignore
app.json      https://devcenter.heroku.com/articles/app-json-schema


nodemon
=======
https://github.com/remy/nodemon/
http://www.benjiegillam.com/2011/08/node-js-clean-restart-and-faster-development-with-nodemon/

config :
https://github.com/remy/nodemon/blob/master/doc/cli/config.txt
https://github.com/remy/nodemon/blob/master/lib/config/defaults.js

npm install -g nodemon

params or package.json:main
nodemon.json

sends SIGUSR2 to ask for graceful shutdown


forky
=====
https://github.com/brianc/node-forky
https://github.com/brianc/node-forky/tree/master/examples


Misc
====
does foreman auto restart processes ? If not :
https://github.com/mafintosh/respawn

