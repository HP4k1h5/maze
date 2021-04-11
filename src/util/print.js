export function makeMaze(h, w, density, chars) {
  const wall = chars[0].repeat(w)
  const maze = [wall]
  for (let _h = h-2; _h>0; _h--) {
    let row = chars[0]
    for (let _w = w-2; _w>0; _w--){
      const c = Math.random() < density ? chars[0]: chars[1] 
      row += c
    }
    row += chars[0]
    maze.push(row)
  } 

  maze.push(wall)

  const start = [ran(0, h), ran(0, w), 's']
  let end = [ran(0, h), ran(0, w), 'e']
  while (start.join('') === end.join('')) {
    end = [ran(0, h), ran(0, w), 'e']
  }

  ;[start,end].forEach(p => {
    const replace = maze[p[0]].split('')
    replace.splice(p[1], 1, p[2])
    maze[p[0]] = replace.join('')
  })

  return maze.join('\n')
}

function ran(min, max) {
  return Math.floor(Math.random()*max) + min
}

export function mazeStrToArr (str) {
  let start, end

  const maze = str.trim().split('\n')
    .map((row, ri) => { 
      return row.split('')
        .map((cell, ci) => {
          if (cell == 's') {
            start = [ri, ci]
            cell = ' '
          }else if (cell == 'e') {
            end = [ri, ci]
            cell = ' '
          }
          return cell == ' ' ? false : true
        })
    })

  if (! (start && end)) throw 'need start (s) and end (e) points'
  return {maze, start, end}
}

export function printNodes(str, nodes) {
  const a = str.trim().split('\n').map(r => r.split(''))
  nodes.forEach((node, i) => {
    a[node.r][node.c] = i
  })
  a.forEach(r => console.log(r.join('')))
  console.log()
}

export function printPath(str, path) {
  if (!path) return console.log('no paths')

  const a = str.trim().split('\n').map(r => r.split(''))

  path.slice(0,-1).forEach((step, i) => {
    let r = step.node.r
    let c = step.node.c

    let rd = path[i+1].node.r - r

    let cd = path[i+1].node.c - c

    while (Math.abs(rd) > 0 || Math.abs(cd) > 0) {
      a[r + rd][c + cd] = '.'
      rd -= (rd ? 1 * Math.sign(rd) : 0) 
      cd -= (cd ? 1 * Math.sign(cd) : 0) 
    }
  })

  a.forEach(r => console.log(r.join('')))
  const dist =path.reduce((a,v) => a+=v.dist, 0)
  console.log('dist', dist, path)
}
