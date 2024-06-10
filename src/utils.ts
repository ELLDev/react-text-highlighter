export function getPosition(node: HTMLElement) {
  const offset = {
    top: 0,
    left: 0,
    width: node.offsetWidth,
  };
  while (node) {
    offset.top += node.offsetTop;
    offset.left += node.offsetLeft;
    node = node.offsetParent as HTMLElement;
  }

  return offset;
}
