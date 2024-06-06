/* eslint-disable @typescript-eslint/no-explicit-any */
export function getPosition(node: any) {
  const offset = {
    top: 0,
    left: 0,
  };
  while (node) {
    offset.top += node.offsetTop;
    offset.left += node.offsetLeft;
    node = node.offsetParent;
  }

  return offset;
}
