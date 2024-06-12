export function getPosition(highlightNodes: HTMLElement[]) {
  const firstDom = highlightNodes[0].getBoundingClientRect();
  const lastDom =
    highlightNodes[highlightNodes.length - 1].getBoundingClientRect();

  const position = {
    top: (firstDom.top + lastDom.bottom) / 2 - 55,
    left: (firstDom.left + lastDom.right) / 2,
    width: firstDom.width,
  };

  return position;
}
