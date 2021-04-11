import {makeMaze, mazeStrToArr, printNodes, printPath} from '../src/util/print.js'
import {analyze, findPaths } from '../src/index.js'
const mazes = [`
@@@@@@
@    @
@ @  @
@    @
@s@@e@`,

`@@@@@@
@    @
@ @@ @
@ @@ @
@    @
@@@@ @
@  @ @
@es@@@`,`

@@@@@@@@@@@@
@          @
@ @@@ @@@@ @
@@@   @    @
@ @ @@@@@@ @
@      @   @
@ @@  @@@@ @
@      @   @
@ @ @@@@@@ @
@       @  @
@@@@s@@@@@e@`,

makeMaze(10, 10, .3, ['#', ' '])
]

mazes.slice(2, 3).forEach(maze_str => {
  console.log(maze_str, '\n')
  const {maze, start, end} = mazeStrToArr(maze_str)

  const {nodes, routes} = analyze(maze, start, end)
  printNodes(maze_str, nodes)

  const paths = findPaths({nodes, routes})

  paths.slice().forEach(path => {
    printPath(maze_str, path)
  })
  console.log('path count', paths.length)
})
