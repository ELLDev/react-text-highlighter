import styled from "styled-components";

export const HighlighterMenuWrapper = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? "block" : "none")};
  position: absolute;
  width: fit-content;
  top: 42px;
  left: -120px;
  width: 281px;
  height: 241px;
  background-color: #fff;
  border: 1px solid #edf0f2;
  border-radius: 4px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
`;

export const HighlighterMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 56px;
  border-bottom: 1px solid #edf0f2;

  span {
    font-size: 14p1x;
    font-weight: 600;
    color: #606a71;
    line-height: 1.5;
  }
`;

export const HighlighterMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
  font-size: 14px;
  padding: 16px;

  span {
    color: #606a71;
  }
`;

export const HighlightColors = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const CloseButton = styled.button`
  all: unset;
  display: flex;
  height: fit-content;
  align-items: center;
  cursor: pointer;
`;

export const ColorButton = styled.button<{ color: string }>`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid #e1e8ed;
  background-color: ${(props) => props.color};
`;

export const GreenButton = styled.button`
  all: unset;
  background-color: #35bd78;
  width: 100%;
  height: 32px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  cursor: pointer;
`;

export const TextButton = styled.button`
  all: unset;
  font-size: 14px;
  color: #35bd78;
  text-align: center;
  cursor: pointer;
`;
