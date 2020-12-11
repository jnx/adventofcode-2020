const fs = require('fs')
let numbers = fs.readFileSync('../data.txt', 'utf-8').split('\n').map(num => parseInt(num)).sort((a, b) => a - b)

let last = 0
let oneJolts = 0
let threeJolts = 0

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] - last === 1) oneJolts++
  if (numbers[i] - last === 3) threeJolts++
  if (i === numbers.length - 1) threeJolts++
  last = numbers[i]
}

console.log(oneJolts * threeJolts)
