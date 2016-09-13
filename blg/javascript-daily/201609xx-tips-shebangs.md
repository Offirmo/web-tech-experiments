# Run your JS in the terminal: The ultimate shebang collection

Today, a tip for running you Javascript code as a unix shell scripts.

This is done with a [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)), of course. Thanks so [Sam Mikes](http://sambal.org/2014/02/passing-options-node-shebang-line/), here is the shebang that allows running a node script as a shell script, passing correctly all parameters:

```javascript
#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"
'use strict';

process.argv.forEach((val, index) => console.log(`${index}: ${val}`))

const { hello } = require('hello-world-emo')
process.argv.slice(2).forEach(val => hello(val))
```

Don't forget to make it executable `touch index_node.js`, then from your shell:

```bash
$ ./index_node.js Joe Jack
0: /home/offirmo/.nvm/versions/node/v6.5.0/bin/node
1: /home/offirmo/[xxx]/index_node.js
2: Joe
3: Jack
[hello-world-emo] Hello from /home/offirmo/[xxx]/node_modules/hello-world-emo/dist/index.node-stable.js
Hello, Joe :-(
Hello, Jack :-(
```

So far, so good, not much gained from running `node index_node.js`. Then how about doing it with pure ES6 code using ES6 modules ? The `babel-node` executable, from the `babel-cli` module and a bit of config allows that:

```bash
npm i --save-dev babel-cli babel-preset-es2015-node6
echo '{ "presets": ["es2015-node6"] }' > .babelrc
```

The shebang and the code becomes:

```javascript
#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/node_modules/.bin/babel-node "$0" "$@"
'use strict';

process.argv.forEach((val, index) => console.log(`${index}: ${val}`))

import { hello } from 'hello-world-emo'
process.argv.slice(2).forEach(val => hello(val))
```

And sure enough:

```bash
$ ./index_es6.js Joe Jack
0: /home/offirmo/.nvm/versions/node/v6.5.0/bin/node
1: /home/offirmo/[xxx]/index_es6.js
2: Joe
3: Jack
[hello-world-emo] Hello from /home/offirmo/[xxx]/node_modules/hello-world-emo/dist/index.node-stable.js
Hello, Joe :-(
Hello, Jack :-(
```

We executed our pure ES6 code 
`



touch .babelrc
```sh
npm i -D babel-cli babel-preset-es2015-node6
```

```
#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/node_modules/.bin/babel-node "$0" "$@"
'use strict';
```


```sh
chmod +x index.js
./index.js
```


