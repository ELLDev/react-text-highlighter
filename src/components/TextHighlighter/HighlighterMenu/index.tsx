import { IoCheckmarkOutline, IoClose } from "react-icons/io5";
import {
  CloseButton,
  ColorButton,
  GreenButton,
  HighlightColors,
  HighlighterMenuContainer,
  HighlighterMenuHeader,
  HighlighterMenuWrapper,
  TextButton,
} from "./styles";
import { COLOR_MAPPER, HighlightColorName } from "../../../constants";

type HighlighterMenuProps = {
  isMenuOpen: boolean;
  onCloseMenu: () => void;
  isHighlighterActive: boolean;
  selectedHighlightColor: HighlightColorName;
  onToggleHighlighter: () => void;
  onSelectColor: (color: HighlightColorName) => void;
  onClearTextHighlights: () => void;
};

export function HighlighterMenu({
  isMenuOpen,
  onCloseMenu,
  isHighlighterActive,
  selectedHighlightColor,
  onToggleHighlighter,
  onSelectColor,
  onClearTextHighlights,
}: HighlighterMenuProps) {
  return (
    <HighlighterMenuWrapper isOpen={isMenuOpen}>
      <HighlighterMenuHeader>
        <span>Marcação de texto</span>
        <CloseButton onClick={onCloseMenu}>
          <IoClose size={24} color="#9BA5AB" />
        </CloseButton>
      </HighlighterMenuHeader>

      <HighlighterMenuContainer>
        <span>Selecione a cor e ative a marcação</span>

        <HighlightColors>
          {Array.from(Object.keys(COLOR_MAPPER))
            .filter((color) => color !== "disabled")
            .map((color: unknown) => (
              <ColorButton
                key={color as HighlightColorName}
                color={COLOR_MAPPER[color as HighlightColorName].hex}
                onClick={() => onSelectColor(color as HighlightColorName)}
              >
                {selectedHighlightColor === color && (
                  <IoCheckmarkOutline
                    color={
                      color === "yellow" || color === "red" ? "#fff" : "#000"
                    }
                    size={16}
                  />
                )}
              </ColorButton>
            ))}
        </HighlightColors>

        <GreenButton onClick={onToggleHighlighter} style={{ height: 32 }}>
          {isHighlighterActive ? "Desativar marcação" : "Ativar marcação"}
        </GreenButton>

        <TextButton
          onClick={onClearTextHighlights}
          style={{ height: 21, padding: 0 }}
        >
          Limpar todas as marcações
        </TextButton>
      </HighlighterMenuContainer>
    </HighlighterMenuWrapper>
  );
}
