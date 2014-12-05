log_core
========

[![Project status](http://img.shields.io/badge/project_status-highly_experimental-red.png)](http://offirmo.net/classifying-open-source-projects-status/)
[![license](http://img.shields.io/badge/license-public_domain-brightgreen.png)](http://unlicense.org/)
[![Gittip](http://img.shields.io/gittip/Offirmo.png)](https://www.gittip.com/Offirmo/)

Story :
* `console` is limited and doesn't scale
* logger should be dependency-injected
* console is the 1st line of debug (though you should use a quick and easy debugger)
* should log only to stdout (link needed)

* Vocabulary
* "appender", "filter", "sink" 
* 

A logger core.

Design principles :

* log should be easy
* log should work
* log should stay fun 
* namespacing, filterable https://github.com/tj/jog
* easy customization of levels
* tags feature
* easy sink
* possible inheritance from another logger instance for config reuse (see also jog)
* compatible with winston sinks (to reuse winston plugins)
* syslog
* FRC http://www.faqs.org/rfcs/rfc3164.html
* blocking log (optional)
* log to stout / stderr if possible
* dump objets dans node
* color
* as reliable as console
* timestamp, filename, line number
* disable by level
* GELF http://www.graylog2.org/resources/gelf#specs 
* hexa pretty printing ? hex dumps https://github.com/a2800276/hexy.js
* UTF-8 higlighter
* perf numbers
* tests
* no deps
* robust
* small footprint
* dynamic level (as param)
* global disable / enable
* replacement of node's console.log functions (optional)
* default config file
* dynamic change via user signal

REM :
* console.debug is deprecated

TODO make an assistant to choose desired logging

Inspired by, technique borrowed from :
* https://github.com/itadakimasu/console-plus/blob/master/console-plus.js

Interesting reads :
* node.js console API http://nodejs.org/api/console.html
* http://www.monitoring-fr.org/2011/06/nouveautes-gestion-logs/

Étude concurrence :
https://github.com/phuesler/ain
* full console API
* send to syslog, with conversion table
* singleton mode
* custom "message composer"
* node only
https://github.com/bevry/caterpillar
* node + browser (with color !)
* filters and sinks
* RFC 3164
* streams
https://github.com/itadakimasu/console-plus
* filenames and line numbers
* color
https://github.com/mpalmerlee/console-ten
* timestamp
* filter by levels
https://github.com/robertkowalski/gelf-node
* node only
* GELF (Graylog Extended Log Format)
https://github.com/tj/jog
* interesting namespacing
* streams, event emitter
* file store, redis store
* perf
https://github.com/monsur/little-logger
* node only
* custom formatters
* color
* good defaults
* small footprint
https://github.com/visionmedia/log.js
https://github.com/tj/log.js
* node
* stream
* stream reader
* syslog API
https://github.com/nomiddlename/log4js-node
* node only
* see https://github.com/stritti/log4js, browser only
* coloured console logging
* replacement of node's console.log functions (optional)
* file appender, with log rolling based on file size
* SMTP appender
* GELF appender
* hook.io appender
* Loggly appender
* Logstash UDP appender
* multiprocess appender (useful when you've got worker processes)
* a logger for connect/express servers
* configurable log message layout/patterns
* different log levels for different log categories (make some parts of your app log as DEBUG, others only ERRORS, etc.)
[2010-01-17 11:43:37.987] [ERROR] cheese - Cheese is too ripe!
https://github.com/dylang/logging
* node
* Shows source file and function.
* color
* Cluster Worker id
* Inspects arrays, objects, functions - all in color.
* battle tested
* TODO timezone
https://github.com/tristanls/logly
* good doc
* custom API
* function as input
* color
* date (ISO format)
https://github.com/talyssonoc/wolverinejs
* node only
* timestamp
* default to terminal
* custom API
* custom levels
* color and styles (shortcuts provided)
* to stream or file
* time, stack, file & line
* custom driver
http://smalljs.org/logging/debug/
http://strongloop.com/strongblog/compare-node-js-logging-winston-bunyan/
https://npmjs.org/package/log4node
https://github.com/flatiron/winston
http://blog.nodejs.org/2012/03/28/service-logging-in-json-with-bunyan/
https://medium.com/@garychambers108/b3cc6fd0dafd

-- errors
http://npmawesome.com/posts/2014-08-11-verror/
https://github.com/3rd-Eden/diagnostics

- couleurs + propres
https://www.npmjs.org/package/chalk
https://github.com/thlorenz/ansicolors

Listes
https://github.com/joyent/node/wiki/modules#logging-and-dumping
http://nodetoolbox.com/categories/Logging

à intégrer
https://github.com/eldargab/easy-table
https://github.com/krasimir/deb.js

à respecter
http://strongloop.com/strongblog/automatic-node-js-clustering-with-log-aggregation/

Technos
http://blog.activesphere.com/blog/2013/08/09/logging-with-colors-in-javascript-console/

https://developer.mozilla.org/en-US/docs/Web/API/console#Outputting_text_to_the_console

https://www.joyent.com/blog/log-management-on-smart-os-featuring-dtrace-and-node-js
