let fs = require('fs-extra')
let map = fs.readFileSync('../../common/passport.txt').toString().split('\n\n')
let correct = 0
let words = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
let q

map.forEach(str => {
  q = {}
  str = str.replace(/\n/gi, ' ')
  if (words.every(w => str.includes(w))) {
    str.split(' ').forEach(chunk => {
      chunk = chunk.split(':')
      q[chunk[0]] = chunk[1]
    })

    if (validate(q)) {
      correct++
    }

    q = {}
  }
})

console.log(correct)

function validate (obj) {
  if (!(parseInt(obj.byr) >= 1920 && parseInt(obj.byr) <= 2002)) return false
  if (!(parseInt(obj.iyr) >= 2010 && parseInt(obj.iyr) <= 2020)) return false
  if (!(parseInt(obj.eyr) >= 2020 && parseInt(obj.eyr) <= 2030)) return false

  if (obj.hgt.includes('cm')) {
    obj.hgt = obj.hgt.replace('cm', '')
    if (!(parseInt(obj.hgt) >= 150 && parseInt(obj.hgt) <= 193)) return false
  } else if (obj.hgt.includes('in')) {
    obj.hgt = obj.hgt.replace('in', '')
    if (!(parseInt(obj.hgt) >= 59 && parseInt(obj.hgt) <= 76)) return false
  } else {
    return false
  }

  if (!(/^#[0-9a-f]{6}$/is.test(obj.hcl))) return false
  if (!obj.ecl.length === 3) return false
  if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(obj.ecl)) return false
  if (!(/^\d{9}$/s.test(obj.pid))) return false

  return true
}
