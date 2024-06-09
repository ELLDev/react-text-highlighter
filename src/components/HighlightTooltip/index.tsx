import { ButtonHTMLAttributes } from "react";
import { HighlightTooltipContainer } from "./styles";

export type TooltipProps = {
  id: string;
  top: number;
  left: number;
  isDeleteTooltip: boolean;
  isVisible: boolean;
};

export interface HighlightTooltipProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  top: number;
  left: number;
}

export default function HighlightTooltip({
  top,
  left,
  ...rest
}: HighlightTooltipProps) {
  return (
    <HighlightTooltipContainer left={left} top={top} type="button" {...rest} />
  );
}
