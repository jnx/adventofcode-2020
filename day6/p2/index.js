let fs = require('fs-extra')
let data = fs.readFileSync('../data.txt').toString().split('\n\n')
let sum = 0

data.forEach(row => {
  row = row.replace(/\n/gi, '')
  let store = new Map()
  row.split('').forEach(char => store.set(char))
  sum += store.size
})

console.log(sum)
