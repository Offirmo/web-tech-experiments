# connective
combine predicate (bool returning) functions with propositional logic connectives (and, or, not)

## installation

    $ npm install connective

## usage
```js
var connective = require('connective')
var or = connective.or
var and = connective.and
var not = connective.and

function wearsFlannel (person) {
  return person.wearing === 'flannel'
}

function ridesBikes (person) {
  return person.rides === 'bikes'
}

var isSquare = not(or(wearsFlannel, ridesBikes))
var isHipster = and(wearsFlannel, ridesBikes)
var isLumberjack = and(wearsFlannel, not(ridesBikes))

var people = {
  jon: { wearing: 'flannel', rides: 'nothing'}
  kurt: { wearing: 'flannel', rides: 'bikes'}
  bob: { wearing: 'hoodie', rides: 'scooters'}
}

for(var name in people) {
  var person = people[name]
  console.log(name, isSquare(person), isHipster(person), isLumberjack(person))
}
```

## about

In propositional logic, boolean statements are joined together by connectives. Logicians would call them conjunctions,  disjunctions, and negations, but programmers know them as `&&`, `||`, and `!`. The problem with using these language-level connective operators is that they apply at evaluation time, and thus aren't very composable.

Functions which take a value and return a boolean are known as predicates. They are useful, for example, in conditional branching, validation, and business rules.

The functions in `connective` let you compose predicates into composite expressions which can be used as functions and evaluated later against other data.

## api

In describing function signatures below, `Predicate` is a function which takes any number of arguments and returns a `boolean`: `function(...) => boolean`

### `connective.or: function (term1 : Predicate, ..., termN : Predicate) => Predicate`

Returns a Predicate combining one or more Predicate terms with a logical `or` (disjunction), roughly equivalent to writing

    function (x) { return Predicate1(x) || Predicate2(x) }

The returned Predicate will pass through its `this` context and arguments to each of the Predicate terms which are necessary to evaluate the expression.

### `connective.and: function (term1 : Predicate, ... termN : Predicate) => Predicate`

Returns a Predicate combining one or more Predicate terms with a logical `and` (conjunction), roughly equivalent to writing

    function (x) { return Predicate1(x) && Predicate2(x) }

The returned Predicate will pass through its `this` context and arguments to each of the Predicate terms.

### `connective.not: function (term : Predicate) => Predicate`

Returns a Predicate negating `term`, roughly equivalent to writing

    function (x) { return !Predicate(x) }

The returned Predicate will pass through its `this` context and arguments to `term`

## running the tests

    $ npm install
    $ npm test

## contributors

jden <jason@denizac.org>

## license
MIT. (c) 2013 Agile Diagnosis. See LICENSE.md