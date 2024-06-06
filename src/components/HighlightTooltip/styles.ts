import styled from "styled-components";

export const HighlightTooltipContainer = styled.button<{
  left: number;
  top: number;
  visible: boolean;
}>`
  display: ${(props) => (props.visible ? "block" : "none")};
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
  font-size: 12px;
  z-index: 1;
  left: ${(props) => `${props.left - 60}px`};
  top: ${(props) => `${props.top - 46}px`};

  &::after {
    content: "";
    position: absolute;
    height: 10px;
    width: 10px;
    border: solid #c2ced6;
    background-color: #edf0f2;
    transform: rotate(45deg);
    border-top-left-radius: 2px;
    border-width: 0 0 1px 1px;
    top: unset;
    right: unset;
    bottom: -4px;
    left: 50%;
  }
`;
