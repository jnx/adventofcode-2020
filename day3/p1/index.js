let fs = require('fs-extra')
let map = fs.readFileSync('../../common/trees.txt').toString().split('\n')
let [multiplier, trees, index] = [1, 0, 3]

for (let i = 1; i < map.length; i++) {
  if (index > map[i].repeat(multiplier).length - 1) multiplier++
  if (map[i].repeat(multiplier)[index] === '#') trees++
  index += 3
}

console.log(trees)
