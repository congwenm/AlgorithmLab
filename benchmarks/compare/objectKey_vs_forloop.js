const { simple } = require('./helper/tools')

const expand = n => Object.keys([...Array(n)]).map(n=>+n)
const range = expand(100)
const object = range.reduce((accu, next) => {
  return Object.assign(accu, { [next]: next })
}, {})

simple({
  'for of loop': function() {
    var arr = []
    for (let i of object) {
      arr.push(i)
    }
    return arr
  },
  'for in loop': function() {
    var arr = []
    for (let i in object) {
      arr.push(i)
    }
    return arr
  },
  'for in loop - hasOwnProperty': function() {
    var arr = []
    for (let i in object) {
      if (arr.hasOwnProperty(i)) {
        arr.push(i)
      }
    }
    return arr
  },
  'Object.key': function() {
    var arr = []
    Object.keys(object).forEach(value => {
      arr.push(value)
    });
    return arr
  },
  'Object.key - no hold': function() {
    return Object.keys(object);
  },
})

// result:
//
