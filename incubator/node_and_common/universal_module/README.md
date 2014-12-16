This is an attempt to make a js module which is universally usable :
* node.js
* AMD node.js + AMD browser
* CommonJS
* browser standalone
* browser with browserify
* ES6 ?

References :
- https://github.com/umdjs/umd
- http://wiki.commonjs.org/wiki/CommonJS
- http://browserify.org/

Interesting reads :
- +++ http://blog.millermedeiros.com/amd-is-better-for-the-web-than-commonjs-modules/
- http://dontkry.com/posts/code/browserify-and-the-universal-module-definition.html
- https://www.npmjs.com/package/fid-umd (and recommended readings)

Requirements
- code can be spread in multiple files
- code can be used when not minified, still in multiple files
