let fs = require('fs-extra')
let groups = fs.readFileSync('../data.txt').toString().split('\n\n')
let sum = 0

for (let group of groups) {
  let uniq = new Set([...group.replace(/\n/gi, '')])
  sum += [...uniq].filter(char =>  group.split('\n').every(form => form.includes(char))).length
}

console.log(sum)
