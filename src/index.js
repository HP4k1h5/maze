import { Node } from './lib/index.js'

export function analyze(arr, start, end) {
  const nodes = [new Node(start[0], start[1])]
  const routes = []

  const dirs = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ]

  // single pass over nested array
  for (let r = 1; r < arr.length - 1; r++) {
    let row = arr[r]
    for (let c = 1; c < row.length - 1; c++) {
      // wall -> ignore
      if (row[c]) continue

      // free cell -> check directions
      const d = dirs.map(_d => {
        return arr[r + _d[0]][c + _d[1]]
      })

      //  n/s walls       e/w walls
      if ((d[0] & d[2]) | (d[1] & d[3])) {
        // not a node
        continue
      }

      // node -> find connections
      dirs.slice(0, 4).forEach(o => {
        findRoutes(arr, r, c, o, nodes, routes)
      })

      // nodes -> add new node
      nodes.push(new Node(r, c))
    }
  }

  // connect end
  dirs.slice(0, 4).forEach(o => {
    findRoutes(arr, end[0], end[1], o, nodes, routes)
  })

  // add end node
  nodes.push(new Node(end[0], end[1]))

  return { nodes, routes }
}

function findRoutes(a, r, c, o, nodes, routes) {
  // start where you are
  let _cell = a[r][c]

  let dist = 1
  // find nearest wall in o(rientation)
  while (_cell === false) {
    let _row = a[r + o[0] * dist]

    // out of bounds
    if (_row === undefined) break

    _cell = _row[c + o[1] * dist]
    if (_cell === undefined) break

    // found wall
    if (_cell) {
      // previous cell was longest connection
      dist--
      break
    }

    // keep looking
    dist++
  }

  // no routes in this direction
  if (dist === 0) {
    return
  }

  // nodes -> find nearest node
  const rn = r + dist * o[0]
  const rl = Math.min(r, rn)
  const rh = Math.max(r, rn)

  const cn = c + dist * o[1]
  const cl = Math.min(c, cn)
  const ch = Math.max(c, cn)

  nodes.forEach((node, i) => {
    const rd = Math.abs(node.r - r)
    const cd = Math.abs(node.c - c)
    const d = rd || cd
    if (
      // within dist to wall
      node.r >= rl &&
      node.r <= rh &&
      node.c >= cl &&
      node.c <= ch &&
      // not our current node
      rd ^ cd
    ) {
      // push bi-directional links
      const f = { f: i, t: nodes.length, d }
      const t = { f: nodes.length, t: i, d }
      routes.push(f, t)
    }
  })
}

export function findPaths({ nodes: _nodes, routes }) {
  const exit = _nodes[_nodes.length - 1]

  const paths = []
  let shortestDist = Infinity
  function recurse(nodes, path = []) {
    const last = path[path.length - 1].node
    const atEnd = last.equals(exit)

    if (atEnd) {
      // check for maze end
      path.dist = path.reduce((a, v) => (a += v.dist), 0)
      if (path.dist < shortestDist * 1.5) {
        if (path.dist < shortestDist) {
          shortestDist = path.dist
        }

        paths.push(path)
        console.log('path count', paths.length)
      }
      return
    } else if (nodes.length < 2) {
      // end of path
      return
    }

    let cur = path[path.length - 1].node

    const connections = routes.filter(rte => {
      // no backtracking
      let pi = path.find(step => {
        if (step.node.equals(_nodes[rte.t])) {
          return true
        }
      })

      if (!pi && cur.equals(_nodes[rte.f])) {
        return true
      }
    })

    connections.forEach(con => {
      const p = [...path, { dist: con.d, node: _nodes[con.t] }]
      recurse(nodes.slice(1), p)
    })
  }

  recurse(_nodes.slice(), [{ dist: 0, node: _nodes[0] }])
  return paths.sort((a, b) => b.dist - a.dist)
}
