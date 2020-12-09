const fs = require('fs')
const program = fs.readFileSync('../data.txt').toString().split('\n').filter(line => line).map(row => {
  const [command, instruction] = row.split(' ')
  return { command, instruction: parseInt(instruction)
  }
})

const clone = (program) => program.map(row => Object.assign({}, row))

const execute = (prg) => {
  let accumelator = 0
  let idx = 0
  let visited = []

  while (!visited.includes(idx)) {
    visited.push(idx)
    let line = prg[idx]

    if (line === undefined) return { idx, accumelator }

    switch (line.command) {
      case 'acc':
        accumelator += line.instruction
        idx++
        break
      case 'jmp':
        idx += line.instruction
        break
      default:
        idx++
        break
    }
  }

  return { idx, accumelator }
}

for (let i = 0; i < program.length; i++) {
  if (program[i].command === 'acc') continue

  let clonedProgram = clone(program)
  const line = clonedProgram[i]

  if (['nop', 'jmp'].includes(line.command)) {
    clonedProgram[i].command = (line.command === 'nop' ? 'jmp' : 'nop')
    let result = execute(clonedProgram)

    if (result.idx === program.length) {
      console.log(result.accumelator)
    }
  }
}
