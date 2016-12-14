'use strict'

const chalk = require('chalk')
const dateformat = require('dateformat')
const extend = require('extend')
const furmat = require('furmat')
const util = require('util')

const debug = util.debuglog('oh-my-log')
const defaults = {
  chalk: true,
  date: 'hh:MM:ss TT',
  func: console.log,
  locals: false,
  prefix: '[%__name:blue:bold] %__date:green:'
}

module.exports = function logger (name, options) {
  // always reset
  defaults.modifiers = {}

  options = Object.assign({}, defaults, options)

  debug('%s %j', chalk.yellow('[options]'), options)

  // magic starts here
  return function log () {
    let now = ''
    let args = Array.from(arguments)

    debug('%s %j', chalk.yellow('[args:original]'), args)

    if (options.date !== false) {
      now = dateformat(new Date(), options.date)
    }

    let first = args.shift()

    // setup furmat
    let format = furmat({
      chalk: options.chalk,
      modifiers: options.modifiers,
      locals: extend(options.locals, {
        __name: name,
        __date: now
      })
    })

    // make this the first argument
    args.unshift(format(options.prefix, first))

    // run through furmat
    let result = format.apply(null, args)

    debug('%s %j', chalk.yellow('[args:final]'), result)

    // pass along to the logger functions
    options.func.call(null, result)
  }
}
