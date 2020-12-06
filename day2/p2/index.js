const fs = require('fs-extra')

let passwords = fs.readFileSync('../passwords.txt').toString()
passwords = passwords.split('\n')

const ruleChecker = (password, letter, ruleset) => {
  let [first, second] = ruleset.split('-')

  first--
  second--

  if (first >= 0 || second >= 0) {
    const [l1, l2] = [password[first], password[second]]

    return ((l1 === letter || l2 === letter) && l1 !== l2)
  } else {
    return false
  }
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
