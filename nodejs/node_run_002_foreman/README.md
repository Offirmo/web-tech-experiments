
foreman
=======
https://blog.daviddollar.org/2011/05/06/introducing-foreman.html
https://ddollar.github.io/foreman/
https://github.com/ddollar/foreman
https://devcenter.heroku.com/articles/procfile#developing-locally-with-foreman

gem install foreman

Procfile       https://ddollar.github.io/foreman/#PROCFILE
   ou npm start (package.json:main ou package.json:scripts.start)
.env           https://ddollar.github.io/foreman/#ENVIRONMENT
.foreman       https://ddollar.github.io/foreman/#DEFAULT-OPTIONS

sends SIGTERM

restart ?

```bash
foreman start
foreman start --procfile Procfile.dev --env=.env.dev
foreman start -c all=2
```

totest
https://github.com/ddollar/foreman/wiki/Custom-Signals
https://github.com/ddollar/foreman/wiki/Per-Process-Environment-Variables
https://github.com/ddollar/foreman/wiki/Exporting-for-production
https://github.com/ddollar/foreman/wiki/Missing-Output
