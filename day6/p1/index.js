let fs = require('fs-extra')
let groups = fs.readFileSync('../data.txt').toString().split('\n\n')
let sum = 0

for (let group of groups) {
  let uniq = new Set([...group.replace(/\n/gi, '')])
  sum += uniq.size
}

console.log(sum)
