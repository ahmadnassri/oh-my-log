'use strict'

const myLog = require('../src')
const chalk = require('chalk')
const format = require('dateformat')
const util = require('util')
const test = require('tap').test

test('should use default values', assert => {
  assert.plan(1)

  let log = myLog('TEST', {
    func: message => {
      let date = format(new Date(), 'hh:MM:ss TT')
      let expected = util.format('[%s] %s: Foo', chalk.bold.blue('TEST'), chalk.green(date))

      assert.equal(message, expected)
    }
  })

  log('Foo')
})

test('should use custom prefix', assert => {
  assert.plan(1)

  let log = myLog('TEST', {
    prefix: '[hello:%__name:red]',
    func: message => {
      let expected = util.format('[hello:%s] Foo', chalk.red('TEST'))

      assert.equal(message, expected)
    }
  })

  log('Foo')
})

test('should allow custom locals', assert => {
  assert.plan(1)

  let log = myLog(null, {
    prefix: '[%foo:%bar]',
    locals: {
      foo: 'hello',
      bar: 'world'
    },

    func: (message) => assert.equal(message, '[hello:world] Foo')
  })

  log('Foo')
})

test('should use custom date format', assert => {
  assert.plan(1)

  let log = myLog('TEST', {
    date: 'isoUtcDateTime',

    func: message => {
      let date = format(new Date(), 'isoUtcDateTime')
      let expected = util.format('[%s] %s: Foo', chalk.bold.blue('TEST'), chalk.green(date))

      assert.equal(message, expected)
    }
  })

  log('Foo')
})

test('should not display dates', assert => {
  assert.plan(1)

  let log = myLog('TEST', {
    date: false,

    func: message => {
      let expected = util.format('[%s] : Foo', chalk.bold.blue('TEST'))

      assert.equal(message, expected)
    }
  })

  log('Foo')
})

test('should use custom modifiers', assert => {
  assert.plan(1)

  let log = myLog('TEST', {
    modifiers: {
      upper: function (string) {
        return string.toUpperCase()
      }
    },

    func: message => {
      let date = format(new Date(), 'hh:MM:ss TT')
      let expected = util.format('[%s] %s: FOO', chalk.bold.blue('TEST'), chalk.green(date))

      assert.equal(message, expected)
    }
  })

  log('%s:upper', 'foo')
})

test('should use chalk styles', assert => {
  assert.plan(1)

  let log = myLog('TEST', {
    func: message => {
      let date = format(new Date(), 'hh:MM:ss TT')
      let expected = util.format('[%s] %s: %s', chalk.bold.blue('TEST'), chalk.green(date), chalk.bold.yellow('foo'))

      assert.equal(message, expected)
    }
  })

  log('%s:yellow:bold', 'foo')
})

test('should not use chalk styles', assert => {
  assert.plan(1)

  let log = myLog('TEST', {
    chalk: false,
    prefix: '[%__name] %__date:',
    func: message => {
      let date = format(new Date(), 'hh:MM:ss TT')
      let expected = util.format('[TEST] %s: foo:yellow:bold', date)

      assert.equal(message, expected)
    }
  })

  log('%s:yellow:bold', 'foo')
})
