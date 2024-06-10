import React from "react";
import { HighlightTooltipContainer } from "./styles";

export type TooltipProps = {
  id: string;
  top: number;
  left: number;
  width: number;
  isDeleteTooltip: boolean;
  isVisible: boolean;
};

export interface HighlightTooltipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  top: number;
  left: number;
  width: number;
}

export default function HighlightTooltip({
  top,
  left,
  width,
  ...rest
}: HighlightTooltipProps) {
  return (
    <HighlightTooltipContainer
      left={left}
      top={top}
      width={width}
      type="button"
      {...rest}
    />
  );
}
