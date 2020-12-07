const fs = require('fs')
const bags = fs.readFileSync('../data.txt').toString().split('\n').filter((line) => line).map((row) => {
  const [outer, inner] = row.split(' bags contain ')
  const iBags = inner.split(', ').map((inner) => decode(inner)).filter(iBag => iBag)
  const color = outer.trim()

  return { iBags, color }
})

function decode (row) {
  if (row.indexOf('no other bags') !== -1) return null

  let num, color
  [, num, color] = /([0-9])\s(([a-z]+\s){2})bag(s?)/.exec(row)

  return { num: parseInt(num), color: color.trim() }
}

function find (oBag) {
  let req = []
  let children = findChildren(oBag)
  req = req.concat(children)

  children.forEach(cBag => {
    const nested = find(cBag.color)
    if (nested && nested.length) {
      req = [...new Set(req.concat(nested))]
    }
  })

  return req
}

function findChildren (color) {
  return bags.filter(bag => bag.iBags.some(iBag => iBag.color === color && iBag.num))
}

console.log(find('shiny gold').length)
