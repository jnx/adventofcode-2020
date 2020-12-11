const fs = require('fs')
let seatsMap = fs.readFileSync('../data.txt', 'utf-8').split('\n').map(row => row.split(''))
let newMap = []

const occupied = (spot) => spot === '#'
const compact = (arr) => arr.map(e => e.join('')).join('')
const clone = (arr) => JSON.parse(JSON.stringify(arr))
const differ = () => {
  const res = compact(seatsMap) !== compact(newMap)
  if (res) seatsMap = clone(newMap)

  return res
}
const checkAround = (x, y, totalAllowed = 0) => {
  let total = 0

  if (seatsMap[y - 1] && occupied(seatsMap[y - 1][x - 1])) total++
  if (seatsMap[y - 1] && occupied(seatsMap[y - 1][x])) total++
  if (seatsMap[y - 1] && occupied(seatsMap[y - 1][x + 1])) total++
  if (seatsMap[y] && occupied(seatsMap[y][x - 1])) total++
  if (seatsMap[y] && occupied(seatsMap[y][x + 1])) total++
  if (seatsMap[y + 1] && occupied(seatsMap[y + 1][x - 1])) total++
  if (seatsMap[y + 1] && occupied(seatsMap[y + 1][x])) total++
  if (seatsMap[y + 1] && occupied(seatsMap[y + 1][x + 1])) total++

  return totalAllowed === 0 ? total === 0 : total >= totalAllowed
}

do {
  newMap = clone(seatsMap)

  for (let y = 0; y < newMap.length; y++) {
    const seatsRow = newMap[y]

    for (let x = 0; x < seatsRow.length; x++) {
      const seat = seatsRow[x]

      switch (seat) {
        case 'L':
          if (checkAround(x, y)) newMap[y][x] = '#'
          break
        case '#':
          if (checkAround(x, y, 4)) newMap[y][x] = 'L'
          break
      }
    }
  }
} while (differ())

console.log([...seatsMap.join()].filter(x => x === '#').length)
