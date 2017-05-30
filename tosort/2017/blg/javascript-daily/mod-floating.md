
# Snow effect for Christmas

floating.js (GitHub: Haroenv/floating.js, License: Apache-2.0, npm: floating.js)

Xmas time has a special atmosphere, and you can share it with your website's visitors thanks to a nice module from [Haroen Viaene](https://github.com/Haroenv):

![Snow effect](/blg/javascript-daily/floating.gif?raw=true)

*floating.js* creates fully configurable floating elements on your page. It has no dependencies. Add it to your page with whatever method you fancy. Simplest solution:
```html
<script src="https://unpkg.com/floating.js@2.6.3/floating.js"></script>
```
(alternative: `yarn add floating.js` + `require('floating.js)`)

Here is what I used for the snow effect above ([live demo](https://cdn.rawgit.com/Offirmo/web-tech-experiments/master/browser/vanilla/lib_floating_001_base.html)):
```js
floating({
   content: '<span style="color: snow">❄</span>',
   number: 25,
   direction: 'reverse',
   size: [0.5, 2.5],
 })
```

However, with a different config, you can have a [bubbling effect](https://haroen.me/floating.js/).

For more information, check out the [full documentation](https://haroen.me/floating.js/doc/).

Thanks [Haroen Viaene](https://github.com/Haroenv), thank you amazing readers, and Merry Christmas to everyone !
