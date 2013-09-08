var each = Array.prototype.forEach
var every = Array.prototype.every
var some = Array.prototype.some

function or () {
  var terms = arguments
  return function () {
    var ctx = this;
    var args = arguments;
    return some.call(terms, function (term) {
      return !!term.apply(ctx, args)
    })
  }
}

function and () {
  var terms = arguments
  return function () {
    var ctx = this;
    var args = arguments;
    return every.call(terms, function (term) {
      return !!term.apply(ctx, args)
    })
  }
}

function not (term) {
  return function () {
    return !term.apply(this, arguments)
  }
}

module.exports.or = or
module.exports.and = and
module.exports.not = not