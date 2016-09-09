# Run your js in the terminal: The ultimate shebang collection

npm i -D babel-preset-es2015-node6



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


