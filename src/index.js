import chalk from 'chalk'
import dateformat from 'dateformat'
import extend from 'extend'
import furmat from 'furmat'
import { debuglog } from 'util'

const debug = debuglog('oh-my-log')
const defaults = {
  chalk: true,
  date: 'hh:MM:ss TT',
  func: console.log,
  locals: false,
  prefix: '[%__name:blue:bold] %__date:green:'
}

export default function (name, options = {}) {
  // always reset
  defaults.modifiers = {}

  options = Object.assign({}, defaults, options)

  debug('%s %j', chalk.yellow('[options]'), options)

  // magic starts here
  return (...args) => {
    let now = ''

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
