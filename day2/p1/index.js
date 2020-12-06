const fs = require('fs-extra')

let passwords = fs.readFileSync('../passwords.txt').toString()
passwords = passwords.split('\n')

const ruleChecker = (password, letter, ruleset) => {
  const [min, max] = ruleset.split('-')
  const re = new RegExp(letter, 'g')
  const count = (password.match(re) || []).length

  return (count >= min && count <= max)
}

let valid = 0

for (let i = 0; i < passwords.length; i++) {
  const passwordData = passwords[i]
  const [rest, password] = passwordData.split(': ')
  const [ruleset, letter] = rest.split(' ')

  if (ruleChecker(password, letter, ruleset)) {
    valid++
  }
}

console.log(valid)
