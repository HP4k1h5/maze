# maze
```
@@@@@@@@@@@@
@    ......@
@ @@@.@@@@.@
@@@...@   .@
@ @.@@@@@@.@
@  ..  @  .@
@ @@. @@@@.@
@  ..  @  .@
@ @.@@@@@@.@
@  ..   @ .@
@@@@s@@@@@.@
dist 28
```

learning library for path finding

uses a mix of algorithms and techniques to generate node-based paths in nested
binary arrays (false = path, true = wall). currently only a depth-first graph
search is implemented.

## usage

other than eslint, the project has no dependencies. you can try running the
tests with `yarn test`.

## inputs

`mazeStrToArr()` accepts a string like

```
@@@@@@
@s   @
@ @@ @
@@@@ @
@    @
@@ @ @
@  @ @
@e@@@@
```

where a space ' ' is a free cell and any character except "s" and "e" are
walls. all mazes must contain exactly one "s" (start) and one "e" (end). mazes
may contain more than one route or no route from start to end.

you can generate a random maze with `makeMaze()`, though its usefulness is
limited currently.


