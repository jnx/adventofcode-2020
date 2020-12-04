let fs = require('fs-extra')
let map = fs.readFileSync('../../common/passport.txt').toString().split('\n\n')
let correct = 0

map.forEach(str => {
  const check = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'] // cid is optional
  if (check.every(w => str.replace(/\n/gi, ' ').includes(w))) correct++
})

console.log(correct)
