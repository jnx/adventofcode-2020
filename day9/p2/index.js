const fs = require('fs');
const numbers = fs.readFileSync('../data.txt', 'utf-8').split('\n').map(num => parseInt(num))

const part1 = (preamble) => {
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

const run = (preamble) => {
  const invalid = part1(preamble)
  const max = numbers.slice(0, numbers.indexOf(invalid) + 1)

  let total = 0
  let range = []

  for (let i = 0; i < max.length; i++) {
    total += max[i]
    range.push(max[i])

    for (let maxIdx = i + 1; maxIdx < max.length; maxIdx++) {
      total += max[maxIdx]
      range.push(max[maxIdx])

      if (total > invalid) {
        total = 0
        range = []

        break
      }

      if (total === invalid) {
        const sorted = range.sort((a, b) => a - b)

        return sorted[0] + sorted[sorted.length - 1]
      };
    }
  }
}

const result = run(25)
console.log(result)
