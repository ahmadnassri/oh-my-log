'use strict'

var chalk = require('chalk')
var config = require('pkg-config')('oh-my-log')
var dateformat = require('dateformat')
var debug = require('debug-log')('oh-my-log')
var furmat = require('furmat')

module.exports = function (name, options) {
  // avoid errors
  config = config || {}
  options = options || {}

  // date options
  var date = options.date !== undefined ? options.date : config.date !== undefined ? config.date : {}

  // color options
  var styles = options.styles !== undefined ? options.styles : config.styles !== undefined ? config.styles : {}

  // general options
  var opts = {
    locals: options.locals || false,
    prefix: options.prefix || '[%name] %date:',
    func: options.func || console.log,
    date: date === false ? false : {
      format: date.format || 'hh:MM:ss TT'
    },
    styles: styles === false ? false : {
      name: styles.name || ['blue', 'bold'],
      date: styles.date || ['green']
    }
  }

  debug('%s %j', chalk.yellow('[options]'), opts)

  // magic starts here
  return function () {
    var now = ''
    var args = Array.prototype.slice.call(arguments)

    debug('%s %j', chalk.yellow('[args:original]'), args)

    if (opts.date !== false) {
      now = dateformat(new Date(), opts.date.format)
    }

    // lets set some styles
    if (opts.styles !== false) {
      now = chalk[opts.styles.date](now)

      // ensure array
      opts.styles.name = Object.prototype.toString.call(opts.styles.name) === '[object Array]' ? opts.styles.name : [opts.styles.name]

      opts.styles.name.forEach(function (style) {
        name = chalk[style](name)
      })
    }

    var first = args.shift()

    // setup format
    var format = furmat({
      locals: opts.locals || {
        name: name,
        date: now
      }
    })

    // make this the first argument
    args.unshift(format(opts.prefix, first))

    debug('%s %j', chalk.yellow('[args:final]'), args)

    // pass along to the logger functions
    opts.func.apply(null, args)
  }
}
