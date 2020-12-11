const fs = require('fs')
let seatsMap = fs.readFileSync('../data.txt', 'utf-8').split('\n').map(row => row.split(''))
let newMap = []

const compact = (arr) => arr.map(e => e.join('')).join('')
const clone = (arr) => JSON.parse(JSON.stringify(arr))
const differ = () => {
  const res = compact(seatsMap) !== compact(newMap)
  if (res) seatsMap = clone(newMap)

  return res
}

const ctr = (lX, lY, nxt) => {
  const [x, y] = nxt(lX, lY)

  if (!seatsMap[y] || !seatsMap[y][x] || seatsMap[y][x] === 'L') return 0
  if (seatsMap[y][x] === '#') return 1

  return ctr(x, y, nxt)
}

const checkAround = (x, y, totalAllowed = 0) => {
  let total = 0

  total += ctr(x, y, (x, y) => [x - 1, y - 1])
  total += ctr(x, y, (x, y) => [x, y - 1])
  total += ctr(x, y, (x, y) => [x + 1, y - 1])
  total += ctr(x, y, (x, y) => [x - 1, y])
  total += ctr(x, y, (x, y) => [x + 1, y])
  total += ctr(x, y, (x, y) => [x - 1, y + 1])
  total += ctr(x, y, (x, y) => [x, y + 1])
  total += ctr(x, y, (x, y) => [x + 1, y + 1])

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
          if (checkAround(x, y, 5)) newMap[y][x] = 'L'
          break
      }
    }
  }
} while (differ())

console.log([...seatsMap.join()].filter(x => x === '#').length)
