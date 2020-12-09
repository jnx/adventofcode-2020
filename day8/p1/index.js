const fs = require('fs')
const program = fs.readFileSync('../data.txt').toString().split('\n').filter(line => line).map(row => {
  const [command, instruction] = row.split(' ')
  return {
    command,
    instruction: parseInt(instruction),
    executed: false
  }
})
let accumelator = 0

for (let i = 0; i < program.length; i++) {
  let line = program[i]
  if (line.executed) break

  switch (line.command) {
    case 'acc':
      accumelator += line.instruction
      break
    case 'jmp':
      i += line.instruction - 1
      break
  }
  line.executed = true
}

console.log(accumelator)