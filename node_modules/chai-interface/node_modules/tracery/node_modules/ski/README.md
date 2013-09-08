# ski
eponymous functions from the SKI calculus

## installation

    $ npm install ski

## usage

    var ski = require(ski)
    var S = ski.S
    var K = ski.K
    var I = ski.I

    var log = console.log.bind(console)

    var tenner = S(K, log, 10)
    // 10 logged to console
    // tenner === 10

    var truth = ski.K(true)
    truth()
    // => true

    ski.I(5)
    // => 5

The module is also split into files, so you can use commonjs path syntax to only load the function(s) you need:

    var S = require('ski/s')
    var K = require('ski/k')
    var I = require('ski/i')

## api

descriptions adapted from the [wikipedia article](http://en.wikipedia.org/wiki/SKI_combinator_calculus):

### `I = function (x)`, the identify function

I returns its argument:

    I(x) => x


### `K = function (x)`, the constant function

K, when applied to any argument x, yields a one-argument constant function Kx , which, when applied to any argument, returns x:

    K(x) => (y) => x

### `S = function (x, y, z)`, the substitution function

S is a substitution operator. It takes three arguments and then returns the first argument applied to the third, which is then applied to the result of the second argument applied to the third. More clearly:

    S(x, y, z) === x(z)((yz))

## license
[CC 0](http://creativecommons.org/publicdomain/zero/1.0/) (public domain)