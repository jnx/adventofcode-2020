let fs = require('fs-extra')
let map = fs.readFileSync('../passport.txt').toString().split('\n\n')
let correct = 0

map.forEach(str => {
  if (['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every(w => str.replace(/\n/gi, ' ').includes(w))) correct++
})

console.log(correct)
