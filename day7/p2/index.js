const fs = require('fs')
const bags = {}

fs.readFileSync('../data.txt').toString().split('\n').filter(line => line).map((row) => {
  const [oEncoded, iEncoded] = row.split(' bags contain ')
  const iBags = iEncoded.split(', ').map((iEncoded) => decodeBag(iEncoded)).filter(iBag => iBag)
  const color = oEncoded.trim()
  bags[color] = { iBags, color }
})

function decodeBag (row) {
  if (row.indexOf('no other bags') !== -1) { return null }

  let num, color
  [, num, color] = /([0-9])\s(([a-z]+\s){2})bag(s?)/.exec(row)

  return { num: parseInt(num.trim()),
    color: color.trim()
  }
}

function findBags (color) {
  return bags[color].iBags.reduce((count, iBag) => count + iBag.num + iBag.num * findBags(iBag.color), 0)
}

console.log(findBags('shiny gold'))
