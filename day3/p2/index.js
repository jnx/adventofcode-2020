let fs = require('fs-extra')
let map = fs.readFileSync('../trees.txt').toString().split('\n')

let totalTrees = [
  calculateTrees(1, 1),
  calculateTrees(3, 1),
  calculateTrees(5, 1),
  calculateTrees(7, 1),
  calculateTrees(1, 2)
]

console.log(totalTrees.reduce((a, b) => a * b))

function calculateTrees (stepRight, stepDown) {
  let [multiplier, trees, index] = [1, 0, stepRight]

  for (let i = stepDown; i < map.length; i = i + stepDown) {
    if (index > map[i].repeat(multiplier).length - 1) multiplier++
    if (map[i].repeat(multiplier)[index] === '#') trees++
    index += stepRight
  }

  return trees
}
