Testing debounce throttle with lodash 4.13.0


at long last
https://github.com/lodash/lodash/issues/2054#issuecomment-220152292

https://github.com/lodash/lodash/issues/2385

issues

https://github.com/lodash/lodash/issues/2054
Problem testing debounce with sinon · Issue #2054 · lodash/lodash
It is not possible to test debounce using sinon and fake timers: import test from 'tape'; import sinon from 'sinon'…github.com

https://github.com/lodash/lodash/issues/304
Local copies of setTimeout/clearTimeout break sinon.js tests · Issue #304 · lodash/lodash
Using sinon.js to run tests with fake timers turns out to break if you load lodash before you trigger sinon…github.com

https://github.com/lodash/lodash/issues/810
Revisiting Lodash's internal caching of window context (mocking setTimeout) · Issue #810 · lodash…
I looked through #304 and I guess I am a little confused of what users are asked to do to get Lodash to fit in with…github.com

@jdalton that would require being sure that sinon setup happened before lodash.debounce was loaded. This is tricky to do.

I’m stuck with this problem, wanting to test that an expected debounce is correctly implemented by my code. I’m having a hard time advocating unit tests in my company precisely because of such problems.

Even if you have arguments, removing this useless caching would make our lives easier without harming lodash at all… Caching Date.now makes no sense today.



Propagate recent changes to lodash.debounce
https://github.com/lodash/lodash/issues/2385#issuecomment-222171335
