/* global describe, it */

'use strict'

var myLog = require('..')
var chalk = require('chalk')
var format = require('dateformat')
var util = require('util')

require('should')

describe('oh-my-log', function () {
  it('should use default values', function (done) {
    var log = myLog('TEST', {
      func: function (message) {
        var date = format(new Date(), 'hh:MM:ss TT')
        var expected = util.format('[%s] %s: Foo', chalk.bold.blue('TEST'), chalk.green(date))
        message.should.be.equal(expected)

        done()
      }
    })

    log('Foo')
  })

  it('should use custom prefix', function (done) {
    var log = myLog('TEST', {
      prefix: '[hello:%__name:red]',
      func: function (message) {
        var expected = util.format('[hello:%s] Foo', chalk.red('TEST'))
        message.should.be.equal(expected)

        done()
      }
    })

    log('Foo')
  })

  it('should allow custom locals', function (done) {
    var log = myLog(null, {
      prefix: '[%foo:%bar]',
      locals: {
        foo: 'hello',
        bar: 'world'
      },

      func: function (message) {
        message.should.be.equal('[hello:world] Foo')

        done()
      }
    })

    log('Foo')
  })

  it('should use custom date format', function (done) {
    var log = myLog('TEST', {
      date: 'isoUtcDateTime',

      func: function (message) {
        var date = format(new Date(), 'isoUtcDateTime')
        var expected = util.format('[%s] %s: Foo', chalk.bold.blue('TEST'), chalk.green(date))
        message.should.be.equal(expected)

        done()
      }
    })

    log('Foo')
  })

  it('should not display dates', function (done) {
    var log = myLog('TEST', {
      date: false,

      func: function (message) {
        var expected = util.format('[%s] : Foo', chalk.bold.blue('TEST'))
        message.should.be.equal(expected)

        done()
      }
    })

    log('Foo')
  })

  it('should use custom modifiers', function (done) {
    var log = myLog('TEST', {
      modifiers: {
        upper: function (string) {
          return string.toUpperCase()
        }
      },

      func: function (message) {
        var date = format(new Date(), 'hh:MM:ss TT')
        var expected = util.format('[%s] %s: FOO', chalk.bold.blue('TEST'), chalk.green(date))
        message.should.be.equal(expected)

        done()
      }
    })

    log('%s:upper', 'foo')
  })

  it('should use chalk styles', function (done) {
    var log = myLog('TEST', {
      func: function (message) {
        var date = format(new Date(), 'hh:MM:ss TT')
        var expected = util.format('[%s] %s: %s', chalk.bold.blue('TEST'), chalk.green(date), chalk.bold.yellow('foo'))
        message.should.be.equal(expected)

        done()
      }
    })

    log('%s:yellow:bold', 'foo')
  })

  it('should not use chalk styles', function (done) {
    var log = myLog('TEST', {
      chalk: false,
      prefix: '[%__name] %__date:',
      func: function (message) {
        var date = format(new Date(), 'hh:MM:ss TT')
        var expected = util.format('[TEST] %s: foo:yellow:bold', date)
        message.should.be.equal(expected)

        done()
      }
    })

    log('%s:yellow:bold', 'foo')
  })
})
