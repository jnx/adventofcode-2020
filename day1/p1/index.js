const fs = require('fs-extra')

let data = fs.readFileSync('../../common/data.txt').toString()
data = data.split('\n')

let sum

for (let i = 0; i < data.length; i++) {
  sum = 0
  const num1 = parseInt(data[i])
  for (let j = 0; j < data.length; j++) {
    const num2 = parseInt(data[j])

    if (num1 + num2 === 2020) { sum = num1 * num2 }
  }

  if (sum > 0) {
    console.log(sum)
  }
}
