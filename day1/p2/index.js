const fs = require('fs-extra')

let data = fs.readFileSync('../data.txt').toString()
data = data.split('\n')

let sum

for (let i = 0; i < data.length; i++) {
  sum = 0
  const num1 = parseInt(data[i])
  for (let j = 0; j < data.length; j++) {
    const num2 = parseInt(data[j])
    for (let k = 0; k < data.length; k++) {
      const num3 = parseInt(data[k])

      if (num1 + num2 + num3 === 2020) { sum = num1 * num2 * num3 }
    }
  }

  if (sum > 0) {
    console.log(sum)
  }
}
