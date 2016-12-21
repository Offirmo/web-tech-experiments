
# Snow effect for Christmas

slow-deps (GitHub: Haroenv/floating.js, License: Apache-2.0, npm: floating.js)

Xmas time has a special atmosphere, and you can share it with your website's visitors thanks to a nice module from [Haroen Viaene](https://github.com/Haroenv):

![Snow effect](/blg/javascript-daily/floating.gif?raw=true "Optional Title")

Add it to your page code with whatever method you fancy. Simplest solution:
```html
<script src="https://unpkg.com/floating.js@2.6.3/floating.js"></script>
```
(alternative: `yarn add floating.js` + `require('floating.js)`)

*floating.js* creates fully configurable floating elements on your page. Here is what I used for the snow effect above:

```js
floating({
   content: '<span style="color: snow">❄</span>',
   number: 25,
   direction: 'reverse',
   size: [0.5, 2.5],
 })
```

However, with a different config, you can have a [bubbling effect](https://haroen.me/floating.js/).

For more information, check out the [full documentation](https://haroen.me/floating.js/doc/)

Thanks [Haroen Viaene](https://github.com/Haroenv) and merry Christmas to everyone !
