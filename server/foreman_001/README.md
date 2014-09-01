
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

restart ?

```bash
foreman start
foreman start --procfile Procfile.dev --env=.env.dev
```

