export class Node {
  constructor(r, c, ) {
    this.r = r
    this.c = c
  }

  equals(node) {
    return (
      this.r === node.r &&
      this.c === node.c
    )
  }
}
