XXX TODO search and replace
yjutard -> offirmo

# Javascript in shell: The ultimate shebang collection

Today, let's try the tip format. Don't worry, we'll introduce some nice modules along the way !
 
Thanks to node, Javascript conquered new realms, including the terminal.
To integrate with other tools, or just for convenience, you may want to run your JS code as a shell script.
This is done with a [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)), of course.
[Sam Mikes](http://sambal.org/2014/02/passing-options-node-shebang-line/) devised a shebang that allows running a node script as a shell script, passing correctly all parameters:

First some initialisations:

```
mkdir ... ; cd ...
npm init
chmod +x index.js
npm i --save hello-world-emo  // for testing purpose
```

Then in `index.js`: **(note the 2-lines shebang at start)**

```js
#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"
'use strict';

// let's visually inspect parameters
process.argv.forEach((val, index) => console.log(`arg #${index} = "${val}"`))

// test non-trivial code by using a module
const { hello } = require('hello-world-emo')
process.argv.slice(2).forEach(val => hello(val)) // say hello to everyone
```

Then from your shell:

```bash
$ ./index.js Joe Jack
arg #0 = "/home/offirmo/.nvm/versions/node/v6.5.0/bin/node"
arg #1 = "/home/offirmo/work/src/xxx-special-tests/shebangs/index.js"
arg #2 = "Joe"
arg #3 = "Jack"
[hello-world-emo] Hello from [redacted]/node_modules/hello-world-emo/dist/index.node-stable.js
Hello, Joe :-(
Hello, Jack :-(
```

It works! Still, not much gained from running `node index.js Joe Jack`. Then how about running pure ES6 code using ES6 modules ? The `babel-node` executable, exposed by the [`babel-cli`](https://www.npmjs.com/package/babel-cli) npm module and a trivial bit of config allows that:

```bash
npm i --save babel-cli babel-preset-es2015-node6
echo '{ "presets": ["es2015-node6"] }' > .babelrc
```

The shebang and the code becomes:

```javascript
#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/node_modules/.bin/babel-node "$0" "$@"
'use strict';

import { hello } from 'hello-world-emo' //< note the change to ES6 modules
process.argv.slice(2).forEach(val => hello(val))
```

And sure enough:

```bash
$ ./index_es6.js Joe Jack
[hello-world-emo] Hello from [redacted]/node_modules/hello-world-emo/dist/index.node-stable.js
Hello, Joe :-(
Hello, Jack :-(
```

Direct execution, not even needing a build step ! Then how about doing it for typescript, which is gaining traction ? We'll need typescript of course (targeting typescript v2 here, which is vastly superior to 1 and due to be released anytime soon), node.js typings and the ts-node npm module: 

```bash
npm i --save typescript@2 @types/node ts-node
touch index.ts; chmod +x index.ts
```

The shebang and the code becomes:

```typescript
#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/node_modules/.bin/ts-node "$0" "$@"
/// <reference path="node_modules/@types/node/index.d.ts" />

import { hello } from 'hello-world-emo'
process.argv.slice(2).forEach((val: string) => hello(val))
```

And as expected:

```bash
$ ./index.ts Joe Jack
[hello-world-emo] Hello from [redacted]/node_modules/hello-world-emo/dist/index.node-stable.js
Hello, Joe :-(
Hello, Jack :-(
```

That's all. Let's start writing Unix tools and utilities now!

Modules introduced:
* babel-cli (GitHub: [babel/packages/babel-cli](https://github.com/babel/babel/tree/master/packages/babel-cli), License: MIT, npm: [babel-cli](https://www.npmjs.com/package/babel-cli))
* ts-node (GitHub: [TypeStrong/ts-node](https://github.com/TypeStrong/ts-node), License: MIT, npm: [ts-node](https://www.npmjs.com/package/ts-node))
* hello-world-emo ;) (GitHub: [Offirmo/hello-world-emo](https://github.com/Offirmo/hello-world-emo), License: MIT, npm: [hello-world-emo](https://www.npmjs.com/package/hello-world-emo))
