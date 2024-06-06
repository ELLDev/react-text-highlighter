import { ButtonHTMLAttributes } from "react";
import { HighlightTooltipContainer } from "./styles";

export interface HighlightTooltipProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  top: number;
  left: number;
  id: string;
  isDeleteTooltip: boolean;
  isVisible: boolean;
}

export default function HighlightTooltip({
  top,
  left,
  id,
  isDeleteTooltip,
  isVisible,
  ...rest
}: HighlightTooltipProps) {
  return (
    <HighlightTooltipContainer
      data-id={id}
      left={left}
      top={top}
      visible={isVisible}
      type="button"
      {...rest}
    >
      {isDeleteTooltip ? "Limpar Marcação" : "Marcar texto"}
    </HighlightTooltipContainer>
  );
}
