'use strict'

var chalk = require('chalk')
var dateformat = require('dateformat')
var debug = require('debug-log')('oh-my-log')
var furmat = require('furmat')
var extend = require('extend')

module.exports = function (name, options) {
  // avoid errors
  options = options || {}

  // general options
  var opts = {
    chalk: options.chalk,
    date: options.date === undefined ? 'hh:MM:ss TT' : options.date,
    func: options.func || console.log,
    locals: options.locals || false,
    modifiers: options.modifiers,
    prefix: options.prefix || '[%__name:blue:bold] %__date:green:'
  }

  debug('%s %j', chalk.yellow('[options]'), opts)

  // magic starts here
  return function () {
    var now = ''
    var args = Array.prototype.slice.call(arguments)

    debug('%s %j', chalk.yellow('[args:original]'), args)

    if (opts.date !== false) {
      now = dateformat(new Date(), opts.date)
    }

    var first = args.shift()

    // setup furmat
    var format = furmat({
      chalk: opts.chalk,
      modifiers: opts.modifiers,
      locals: extend(opts.locals, {
        __name: name,
        __date: now
      })
    })

    // make this the first argument
    args.unshift(format(opts.prefix, first))

    // run through furmat
    var result = format.apply(null, args)

    debug('%s %j', chalk.yellow('[args:final]'), result)

    // pass along to the logger functions
    opts.func.call(null, result)
  }
}
