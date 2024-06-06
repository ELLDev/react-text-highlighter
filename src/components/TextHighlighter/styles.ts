import styled from "styled-components";

export const HighlighterWrapper = styled.div`
  position: relative;
`;

export const HighlighterButton = styled.button`
  all: unset;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e1e8ed;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &[data-active="true"] {
    background-color: #35bd78;

    svg g path {
      fill: #fff;
    }
  }

  &[data-active="false"] {
    &:hover {
      background-color: #c2ced6;
    }
  }
`;

export const HighlighterTooltipContainer = styled.div`
  position: relative;
  z-index: 30;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    display: none;
    top: 14px;
    left: 48px;
    min-width: 199px;
    height: 142px;
    line-height: 18px;
  }

  :hover {
    > div {
      display: initial;
    }
  }

  @media (max-width: 768px) {
    :hover {
      > div {
        display: none;
      }
    }
  }
`;
