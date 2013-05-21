/* Q (quartermaster)
 * is a small, compatible javascript object
 * used for loading other resources.
 * It is usually loaded first, or (even better) directly embedded.
 */

/*
<div id="q-loader">
	<h1>My App</h1>
	<h3 id="q-loader-msg">Loading<span id="q-simple-loading-indicator">...</span> (<span id="q-loaded-rsrc-count">0</span>/<span id="q-expected-rsrc-count">1</span>)</h3>
	<noscript><p style="color: red;"><strong>Your browser either does not support JavaScript, or has it turned off !</strong></p></noscript>
	<ul id="q-loader-log">
		<!-- empty for now -->
	</ul>
	<p><small>Please contact <a href="mailto:xxx@gmail.com">abc@def.xyz</a> in case of problem.</small></p>
</div>
<div id="content">
...
</div>
<script>
if (typeof Q === 'undefined'){
	// should never happen since we (supposedly) embed it in the html !
	document.getElementById('q-loader-msg').innerHTML = 'Error loading loader itself !';
}
else
{
	Q.init();
	Q.log("Starting rsrc load...");
	Q.on_load_complete(function() {
		Q.info("Starting app !");
	});
	Q.load([
	/////// Backbone
	{
		name: "underscore.js",
		src: [ "http://underscorejs.org/underscore.js", "../contrib/backbone/underscore.js" ],
		test: function(key, callback) {
			callback(key, typeof(window._) !== 'undefined');
		}
	}
	]);
*/
/* Q is based on Modernizr :
 * Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-rgba-generatedcontent-applicationcache-draganddrop-indexeddb-localstorage-sessionstorage-websockets-websqldatabase-webworkers-inlinesvg-shiv-mq-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function C(a){i.cssText=a}function D(a,b){return C(m.join(a+";")+(b||""))}function E(a,b){return typeof a===b}function F(a,b){return!!~(""+a).indexOf(b)}function G(a,b){for(var d in a){var e=a[d];if(!F(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function H(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:E(f,"function")?f.bind(d||b):f}return!1}function I(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return E(b,"string")||E(b,"undefined")?G(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),H(e,b,c))}var d="2.6.2",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k=":)",l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v=u.slice,w,x=function(a,c,d,e){var h,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:g+(d+1),l.appendChild(j);return h=["&#173;",'<style id="s',g,'">',a,"</style>"].join(""),l.id=g,(m?l:n).innerHTML+=h,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=f.style.overflow,f.style.overflow="hidden",f.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),f.style.overflow=k),!!i},y=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return x("@media "+b+" { #"+g+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},z=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=E(e[d],"function"),E(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),A={}.hasOwnProperty,B;!E(A,"undefined")&&!E(A.call,"undefined")?B=function(a,b){return A.call(a,b)}:B=function(a,b){return b in a&&E(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=v.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(v.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(v.call(arguments)))};return e}),r.websqldatabase=function(){return!!a.openDatabase},r.indexedDB=function(){return!!I("indexedDB",a)},r.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},r.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},r.rgba=function(){return C("background-color:rgba(150,255,150,.5)"),F(i.backgroundColor,"rgba")},r.fontface=function(){var a;return x('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},r.generatedcontent=function(){var a;return x(["#",g,"{font:0/0 a}#",g,':after{content:"',k,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},r.localstorage=function(){try{return localStorage.setItem(g,g),localStorage.removeItem(g),!0}catch(a){return!1}},r.sessionstorage=function(){try{return sessionStorage.setItem(g,g),sessionStorage.removeItem(g),!0}catch(a){return!1}},r.webworkers=function(){return!!a.Worker},r.applicationcache=function(){return!!a.applicationCache},r.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==q.svg};for(var J in r)B(r,J)&&(w=J.toLowerCase(),e[w]=r[J](),u.push((e[w]?"":"no-")+w));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)B(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},C(""),h=j=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.mq=y,e.hasEvent=z,e.testProp=function(a){return G([a])},e.testAllProps=I,e.testStyles=x,e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};

var Q = {
	
	expected_rsrc_count:   0, //< count of critical rsrcs we should load
	successful_rsrc_count: 0, //< count of critical rsrcs we have successfully loaded
	failed_rsrc_count:     0, //< count of critical rsrcs we have failed to load
	unmetable_dependency:  false, //< if failure of a rsrc whom other rsrc depend on, set this to true
	
	content_area: undefined, //< shortcut to the DOM element which holds the content
	loading_area: undefined, //< shortcut to the DOM element which holds the loader
	resources:             {}, //< list of rsrc objects we are loading
	resources_callbacks:   {}, //< list of callbacks to fire when rsrcs are loaded
	
	/////// Init functions
	
	/////// main init func, to call first
	init: function() {
		// hide the content while loading is not done
		// (not initially hidden for SEO reason)
		this.content_area = document.getElementById('content');
		this.loading_area = document.getElementById('q-loader');
		
		this.show_content_(false);
		this.show_loader_(true);
		
		// add other SEO unfriendly stuff
		document.getElementById('q-simple-loading-indicator').style.textDecoration="blink";
		
		// other inits
		this.init_console_();
		this.init_yepnope_();
		
		// we ourself need some rsrc (fast declare)
		this.resources["window.ready"] = {"name": "window.ready", "loaded": false};
	},
	/////// register a callback to fire when all critical rsrc are loaded
	on_load_complete: function(f) {
		this.add_rsrc_callback("Q-load-complete", f, "load-complete");
	},
	/////// Load a list of rsrcs
	load: function(rsrc_list) {
		for (var i = 0; i < rsrc_list.length; i++)
		{
			this.load_rsrc(rsrc_list[i]);
		}
	},
	/////// DOM manipulation
	show_content_: function(visible) {
		if(visible) {
			this.content_area.style.display = 'block';
		}
		else {
			this.content_area.style.display = 'none';
		}
	},
	show_loader_: function(visible) {
		if(visible) {
			this.loading_area.style.display = 'block';
		}
		else {
			this.loading_area.style.display = 'none';
		}
	},
	/////// sub_init functions
	init_console_: function() {
		if ( window.console && window.console.log ) {
			// console is available
			this.log      = console.log;
			this.debug    = console.debug;
			this.info     = console.info;
			this.warn     = console.warn;
			this.error    = console.error;
			this.group    = console.group;
			this.groupEnd = console.groupEnd;
			this.trace    = console.trace;
			this.dir      = console.dir;
			this.assert   = console.assert;
		}
		else
		{
			// console is not available
			// (TODO load firebug lite ?)
			this.log      = function() {};
			this.debug    = function() {};
			this.info     = function() {};
			this.warn     = function() {};
			this.error    = function() {};
			this.group    = function() {};
			this.groupEnd = function() {};
			this.trace    = function() {};
			this.dir      = function() {};
			this.assert   = function() {};
		}
	},
	init_yepnope_: function() {
		// config yepnope
		if (typeof yepnope === 'undefined'){
			// should never happen since we rely on it !
			document.getElementById('q-loader-msg').innerHTML = 'Error loading loader itself !';
		}
		yepnope.errorTimeout = 3000; // set to x ms error timeout
		// add css support http://stackoverflow.com/a/7683161/587407
		yepnope.addPrefix( 'css', function ( resource ) {
			// Set the force flag
			resource.forceCSS = true;
			//carry on
			return resource;
		} );
		// add less support http://stackoverflow.com/a/10036318/587407
		yepnope.addPrefix('less', function(resourceObj) {
			resourceObj.forceCSS = true;
			resourceObj.attrs = {
				'rel' : "stylesheet/less",
				'type': "text/css"
			};
			return resourceObj;
		});
	},
	/////// Utilities
	// get style property of an element
	// http://robertnyman.com/2006/04/24/get-the-rendered-style-of-an-element/
	get_style_of_element: function(oElm, strCssRule) {
		var strValue = "";
		if(document.defaultView && document.defaultView.getComputedStyle){
			strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
		}
		else if(oElm.currentStyle){
			strCssRule = strCssRule.replace(/\-(\w)/g, function(strMatch, p1) {
				return p1.toUpperCase();
			});
			strValue = oElm.currentStyle[strCssRule];
		}
		return strValue;
	},
	// test if the given element has the expected style properties,
	// (which may indicate successful css loading)
	// http://stackoverflow.com/a/8122005/587407
	test_css: function(element_name, element_classes, expected_styles, rsrc_name, callback) {
		// create an element of given type
		var elem = document.createElement(element_name);
		// immediately hide it
		elem.style.display = 'none';
		// give it the class(es)
		for (var i = 0; i < element_classes.length; i++)
		{
			elem.className = elem.className + " " + element_classes[i];
		}
		// and add it
		document.body.appendChild(elem);
		
		// test the given properties
		// it happens (~1/3 times in local)
		// that the css takes a few ms to apply.
		// so we need a function that we can try directly first
		// and retry again later in case of failure
		var handle = -1;
		var try_count = 0;
		var Q = this;
		var test_function = function() {
			var match = true; // so far
			try_count++;
			for (var key in expected_styles)
			{
				Q.log("[Q loader] testing " + rsrc_name + " css : " + key + " = '" + expected_styles[key] + "', actual = '" + Q.get_style_of_element(elem, key) + "'");
				if(Q.get_style_of_element(elem, key) === expected_styles[key])
				{
					match = match && true;
				}
				else
				{
					Q.error("[Q loader] css " + rsrc_name + " test failed (not ready yet ?) : " + key + " = " + expected_styles[key] + ", actual = " + Q.get_style_of_element(elem, key) );
					match = false;
				}
			}
			
			if (match === true || try_count >= 3) {
				if (handle >= 0)
					window.clearTimeout(handle);
				// remove our test element from the DOM
				document.body.removeChild(elem);
				if (!match)
					Q.error("[Q loader] giving up on css " + rsrc_name + "..." );
				else
					Q.log("[Q loader] css " + rsrc_name + " load success !" );
				callback(rsrc_name, match);
			}
			return match;
		}
		
		// use and program the function
		if(! test_function() )
		{
			this.info("" + rsrc_name + " css test failed, programming a retry...");
			handle = window.setInterval(test_function, 20);
		}
	},
	register_expected_rsrc: function(rsrc_name) {
		this.expected_rsrc_count++;
		document.getElementById('q-expected-rsrc-count').innerHTML = this.expected_rsrc_count;
		//this.log("[Q loader] expecting rsrc : " + rsrc_name);
		return true;
	},
	report_missing_rsrc: function(rsrc_name) {
		this.failed_rsrc_count++;
		var new_entry = document.createElement("li");
		new_entry.innerHTML = "Error loading rsrc : " + rsrc_name;
		document.getElementById('q-loader-log').appendChild(new_entry);
		this.error("[Q loader] error loading rsrc : ", rsrc_name);
		// has it deps ?
		if(Q.resources_callbacks[rsrc_name] !== undefined) {
			// has dependencies ! we'll never be able to load everything...
			this.unmetable_dependency = true;
		}
		this.check_completion_();
	},
	report_loaded_rsrc: function(rsrc_name) {
		this.resources[rsrc_name].loaded = true;
		this.successful_rsrc_count++;
		this.content_area.style.display = 'none'; // in case it was displayed back
		document.getElementById('q-loaded-rsrc-count').innerHTML = this.successful_rsrc_count;
		this.info("[Q loader] rsrc successfully loaded : ", rsrc_name);
		// fire potential callback
		this.exec_rsrc_callbacks(rsrc_name);
		this.check_completion_();
	},
	/////// check if all crit rsrcs are processed (success or failure)
	/////// and call complete func if needed
	check_completion_: function(rsrc) {
		if( this.successful_rsrc_count + this.failed_rsrc_count >= this.expected_rsrc_count || this.unmetable_dependency ) {
			this.on_complete_();
		}
	},
	/////// called when all crit rsrcs are processed (success or failure)
	on_complete_: function() {
		// as soon as page is loaded, swap content
		var success = (this.successful_rsrc_count == this.expected_rsrc_count && ! this.unmetable_dependency);
		if( !success )
		{
			document.getElementById('q-loader-msg').innerHTML = 'Application failed to load.';
			document.getElementById('q-loader-msg').style.color = 'red';
		}
		else
		{
			this.loading_area.style.display = 'none';
			this.content_area.style.display = 'block';
			this.exec_rsrc_callbacks("Q-load-complete");
		}
	},
	/////// check if given rsrc is loaded
	is_rsrc_loaded: function(rsrc_name) {
		if(this.resources[rsrc_name] !== undefined) {
			if(this.resources[rsrc_name].loaded) {
				return true;
			}
		}
		return false;
	},
	/////// load one rsrc
	load_rsrc: function(rsrc) {
		//this.log("[Q Loader] trying to load rsrc : " + rsrc.name);
		var elem = this.resources[rsrc.name];
		if(elem === undefined) {
			// install this new expected rsrc
			elem = rsrc;
			elem.current_src = -1;
			elem.loaded = false;
			//this.log("[Q loader] creating :", rsrc.name);
			this.resources[rsrc.name] = elem;
			// todo check preload
			Q.register_expected_rsrc(rsrc.name);
			// check requirements and install callbacks
			if(elem.require !== undefined) {
				for (var i = 0; i < elem.require.length; i++)
				{
					this.add_rsrc_callback(elem.require[i], function() {
							Q.load_rsrc({"name": rsrc.name});
						},
						elem.name
					);
				}
			}
			// is this rsrc jQuery ? if yes, we use it
			// we declare this rsrc as critical since we'll be able to serve it
			this.register_expected_rsrc("window.ready");
			// when document is loaded (jquery style), mark this rsrc as available
			this.add_rsrc_callback("jquery.js", function() {
					$( document ).ready(function(){
						Q.report_loaded_rsrc("window.ready");
					}
					);
				},
				"window.ready"
			);
		}
		// need load ?
		if(!elem.loaded)
		{
			// requirements met ?
			if(elem.require !== undefined) {
				for (var i = 0; i < elem.require.length; i++)
				{
					if(!this.is_rsrc_loaded(elem.require[i])) {
						this.log("[Q loader] " + elem.name + " still waiting for dep : ", elem.require[i]);
						// todo start preload while waiting for reqs ?
						return; // xxx
					}
				}
			}
			// if we arrive here, it means requirements are met
			if (elem.current_src >= 0) {
				//this.log("[Q loader] failed to load : " + elem.name + " from " + elem.src[elem.current_src]);
			}
			elem.current_src++;
			if (elem.current_src >= elem.src.length)
			{
				// no more src => failure !
				Q.report_missing_rsrc(elem.name);
			}
			else
			{
				this.resources[elem.name] = elem;
				var temp = {};
				temp[elem.name] = elem.src[elem.current_src];
				this.info("[Q loader] starting yepnope load of : ", temp);
				yepnope({
					load: temp,
					callback: function (url, result, key) {
						// test for successful load
						elem.test(key, Q.rsrc_load_callback);
					}
				});
			}
		}
		//this.resources[rsrc.name] = elem;
	},
	rsrc_load_callback: function(rsrc_name, success) {
		//Q.log("[Q loader] rsrc_load_callback :", rsrc_name, success);
		if(success) {
			Q.report_loaded_rsrc(rsrc_name);
		} else {
			// try to load from next src (if any)
			Q.load_rsrc({ "name": rsrc_name });
		}
	},
	add_rsrc_callback: function(rsrc_name, f, src) {
		src = src || "?";
		Q.log("[Q loader] " + src + " is waiting for dep :", rsrc_name);
		if(Q.resources_callbacks[rsrc_name] === undefined) {
			Q.resources_callbacks[rsrc_name] = [f];
		}
		else {
			Q.resources_callbacks[rsrc_name].push(f);
		}
		if(Q.is_rsrc_loaded(rsrc_name)) {
			f();
		}
	},
	exec_rsrc_callbacks: function(rsrc_name) {
		//Q.log("[Q loader] firing cb for dep :", rsrc_name);
		var elem = Q.resources_callbacks[rsrc_name];
		if(elem !== undefined) {
			for (var i = 0; i < elem.length; i++)
			{
				elem[i]();
			}
		}
	}
}; // Q