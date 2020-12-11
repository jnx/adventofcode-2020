const fs = require('fs')
const numbers = fs.readFileSync('../data.txt', 'utf-8').split('\n').map(num => parseInt(num))

const run = (preamble) => {
  for (let idx = 0; idx < numbers.length; idx++) {
    let range = numbers.slice(idx, preamble + 1 + idx)
    const set = new Set(numbers.slice(idx, preamble + idx))
    const sum = range.pop()

    for (let setIdx = 0; setIdx < set.size; setIdx++) {
      const data = sum - range[setIdx]

      if (set.has(data)) break
      if (setIdx === range.length - 1) return sum
    }
  }
}

const result = run(25)
console.log(result)
