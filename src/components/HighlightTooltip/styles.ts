import styled from "styled-components";

export const HighlightTooltipContainer = styled.button<{
  left: number;
  top: number;
  width: number;
}>`
  display: none;
  box-sizing: border-box;
  position: absolute;
  border: 1px solid #606a71;
  background-color: #363e46;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  line-height: 18px;
  overflow: visible;
  padding: 8px;
  z-index: 1;
  left: ${(props) => `${props.left}px`};
  top: ${(props) => `${props.top}px`};
  transform: translateX(-50%);

  &[data-visible="true"] {
    display: block;
  }

  &::after {
    content: "";
    position: absolute;
    height: 10px;
    width: 10px;
    background-color: #363e46;
    transform: rotate(45deg);
    border-radius: 2px;
    border-bottom: 1px solid #606a71;
    border-right: 1px solid #606a71;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
  }
`;
