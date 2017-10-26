const fs = require('fs')
const path = require('path')

const noop = () => { }

console.warn('START*******************')
const list = (path1) => {
  return fs.readdirSync(path1, (err, items) => {
    if (err) {
      throw new Error('could not list', err)
    }
  }).map(file => `${path1}/${file}`)
}

const newPath = path => path.replace(/\/spec\//, '/src/')

const startingPath = path.join(__dirname, '../spec')

const processPath = path => {
  const items = list(path)
  items.map(item => {
    const lstat = fs.lstatSync(item)
    if (lstat.isDirectory()) {
      console.log(`${item} is directory`)
      processPath(item)
    }
    else if(lstat.isFile()) {
      console.log(`${item} is file`)
      console.log('rename', item, newPath(item))
      fs.renameSync(item, newPath(item))
    }
  })
}

processPath(startingPath)


console.warn('END*******************')
console.warn('')
