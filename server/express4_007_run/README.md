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
http://blog.daviddollar.org/2011/05/06/introducing-foreman.html
http://ddollar.github.io/foreman/

gem install foreman

Procfile       http://ddollar.github.io/foreman/#PROCFILE
   ou npm start (package.json:main ou package.json:scripts.start)
.env           http://ddollar.github.io/foreman/#ENVIRONMENT
.foreman       http://ddollar.github.io/foreman/#DEFAULT-OPTIONS

sends SIGTERM

```bash
foreman start
foreman start --procfile Procfile.dev
```


heroku
======
https://devcenter.heroku.com/categories/nodejs
https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process

60s to bind
10s to close (SIGTERM then SIGKILL)
use foreman
set a few headers

.gitignore
app.json      https://devcenter.heroku.com/articles/app-json-schema


nodemon
=======
https://github.com/remy/nodemon/
http://www.benjiegillam.com/2011/08/node-js-clean-restart-and-faster-development-with-nodemon/

npm install -g nodemon

params or package.json:main
nodemon.json

sends SIGUSR2


forky
=====
https://github.com/brianc/node-forky
https://github.com/brianc/node-forky/tree/master/examples
