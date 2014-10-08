npm install -g nodemon

nodemon   <-- will read package.json

nodemon server


base : (important client experience)
- [ ] base security http://scottksmith.com/blog/2014/09/21/protect-your-node-apps-noggin-with-helmet/
- [x] all UTF-8
- [x] static files
- [x] root page (~index.html)
- [x] / defaults to index
- [x] other/multiple pages
- [x] templating
- [x] server side 404
- [x] nice 404 for pages, normal 404 for assets
- [x] nice server runtime error (caught exceptions)
- [ ] nice server runtime error (uncaught exceptions) (and app stay accessible !)
- [ ] should close OTHER pending requests on uncaught (or not ? or wait ?)
- [x] base auto-restart : nothing to do ! should be handled by the platform (ex. heroku)
- [x] favicon
- [x] basic logging


advanced :
- [ ] localization +++ "speak style" (alternative localizations for the same language)
- [ ] safari / mobile icons
- [ ] facebook preview / graph
- [ ] utility pages http://www.simpleentrepreneur.com/2007/07/10/les-pages-a-ne-pas-oublier-lorsquon-cree-un-site/
- [ ] request / domain uuid for easier logging / tracing https://github.com/appsattic/connect-uuid
- [ ] test routes (ping, errors...)
- [x] no cookies (fatten requests, outdated)
- [ ] respond with an error even if uncaught exception (domains)
- [ ] modular routing
- [ ] layered/splitted templating
- [ ] client side 404 for SPA !
- [ ] language recognition/hinting and i18n
- [ ] compression  https://github.com/expressjs/compression
- [ ] check response time
- [ ] timeouts  https://github.com/expressjs/timeout
- [ ] check accepted types and input types
- [ ] utm_source
- [ ] sitemap
- [ ] advanced logging
- [ ] mails
- [ ] error reports
- [ ] through proxy
- [ ] heroku friendly
- [ ] cache optimisée
- [ ] headers minimum
- [ ] sécurité avancée, contrôles d'entrée
- [ ] filtrage des headers inutiles
- [ ] REST
- [ ] referer, analytics
- [/] live reload (client) [bugs en attente] https://github.com/intesso/connect-livereload
- [/] live reload on template pages (client)
- [x] live reload (server) thank you nodemon !
- [x] cluster for efficiency and resilience to uncaught
- [ ] resource monitoring
- [ ] new relic ?
- [ ] "This website does not supply ownership information."
- [ ] ssl avec redirection
- [ ] authentif
- [ ] X-Response-Time header
- [ ] detect too busy https://hacks.mozilla.org/2013/01/building-a-node-js-server-that-wont-melt-a-node-js-holiday-season-part-5/
- [ ] checklist http://sandinmyjoints.github.io/towards-100-pct-uptime/#/27
- [ ] unit tests
http://javascriptplayground.com/blog/2014/07/testing-express-routes/
https://www.joyent.com/blog/risingstack-writing-testable-apis-the-basics

http://runnable.com/UTlPPF-f2W1TAAEU/error-handling-with-express-for-node-js
http://runnable.com/UTlPPV-f2W1TAAEf/custom-error-pages-in-express-for-node-js
http://runnable.com/express

TODO
relire entièrement Reference http://expressjs.com/4x/api.html

à relire pour valider : https://github.com/ClintH/kattegat

http://webapplog.com/migrating-express-js-3-x-to-4-x-middleware-route-and-other-changes/

TOTEST
https://github.com/moudy/project-router
https://github.com/michaelleeallen/reducto
http://scotch.io/tutorials/javascript/upgrading-our-easy-node-authentication-series-to-expressjs-4-0
//app.use(require('express-slash')()); // https://github.com/ericf/express-slash



Reference http://expressjs.com/4x/api.html
 + interesting middlewares
https://github.com/senchalabs/connect/blob/master/Readme.md#middleware
https://github.com/visionmedia/express/wiki
https://github.com/visionmedia/express/wiki/Migrating-from-3.x-to-4.x
https://github.com/visionmedia/express/wiki/New-features-in-4.x
https://github.com/expressjs/express-params


https://github.com/expressjs/finished
https://github.com/mathrawka/express-graceful-exit/blob/master/lib/graceful-exit.js

https://github.com/vincentwoo/connect-no-www/blob/master/index.js

Notes :
* Livereload (client) has been found to slow down extremely the app at startup. (is it my computer ?)
  Can even cause browser timeouts on first load.
  Just wait a bit, refresh the page a second time and it should work.

https://github.com/jed/locale
http://slexaxton.github.io/Jed/
https://hacks.mozilla.org/2013/04/localize-your-node-js-service-part-1-of-3-a-node-js-holiday-season-part-9/
http://ejohn.org/blog/a-strategy-for-i18n-and-node/


http://blog.izs.me/post/65712662830/restart-node-js-servers-on-domain-errors-sensible-fud
http://www.lighthouselogic.com/use-domain-dispose/#/using-a-new-domain-for-each-async-function-in-node/
http://blog.argteam.com/coding/hardening-node-js-for-production-part-3-zero-downtime-deployments-with-nginx/
http://blog.risingstack.com/node-js-security-tips/
https://github.com/neoziro/express-err


http://scottksmith.com/blog/2014/09/21/protect-your-node-apps-noggin-with-helmet/


http://thejackalofjavascript.com/architecting-a-restful-node-js-app/

http://offirmo.net/wiki/index.php?title=Check-list_d%27un_site_web
