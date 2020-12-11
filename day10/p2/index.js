const fs = require('fs')

let numbers = [0, ...fs.readFileSync('../data.txt', 'utf-8').split('\n')].map(num => parseInt(num)).sort((a, b) => a - b)

let arr = new Array(numbers.length).fill(0)
arr[0] = 1

for (let i = 1; i < numbers.length; i++) {
  for (let j = 0; j < i; j++) {
    if (numbers[i] - numbers[j] <= 3) arr[i] += arr[j]
  }
}

console.log(arr[numbers.length - 1])
