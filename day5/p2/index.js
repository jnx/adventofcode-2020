let fs = require('fs-extra')
let data = fs.readFileSync('../../common/day5.data.txt').toString().split('\n')

const seats = []
for (let i = 0; i < data.length; i++) {
  const row = decode(data[i].substr(0, 7), [0, 127], 'B')
  const col = decode(data[i].substr(7, 3), [0, 7], 'R')
  const seat = { row, col, id: (row * 8 + col) }
  seats.push(seat.id)
}

console.log(missingNumbers(seats))

function missingNumbers (arr) {
  const max = Math.max(...arr)
  const min = Math.min(...arr)
  const missing = []

  for (let i = min; i <= max; i++) {
    if (!arr.includes(i)) missing.push(i)
  }
  return missing
}

function decode (str, arr, checkForChar) {
  let lastChar = ''

  str.split('').forEach(char => {
    if (char === checkForChar) {
      arr[0] = Math.ceil(((arr[1] - arr[0]) / 2) + arr[0])
    } else {
      arr[1] = Math.floor(((arr[1] - arr[0]) / 2) + arr[0])
    }
    lastChar = char
  })

  return lastChar === checkForChar ? arr[1] : arr[0]
}
