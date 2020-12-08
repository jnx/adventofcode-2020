const fs = require('fs')
const program = fs.readFileSync('../data.txt').toString().split('\n').filter(line => line).map(row => {
  const [command, instruction] = row.split(' ')

  return { command, instruction }
})
const check = new Set()

let accumelator = 0

for (let i = 0; i < program.length; i++) {
  if (check.has(i)) break

  let line = program[i]
  switch (line.command) {
    case 'acc':
      accumelator += parseInt(line.instruction)
      break
    case 'jmp':
      i += parseInt(line.instruction) - 1
      break
  }
  check.add(i)
}

console.log(accumelator)
