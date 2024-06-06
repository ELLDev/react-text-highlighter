import { useEffect, useRef, useState } from "react";
import { HighlighterMenu } from "./HighlighterMenu";
import MarkerIcon from "./MarkerIcon";
import { HighlighterButton, HighlighterWrapper } from "./styles";
import { HighlightColorName } from "../../constants";

type TextHighlighterProps = {
  isHighlighterActive: boolean;
  selectedHighlightColor: HighlightColorName;
  onToggleHighlighter: () => void;
  onSelectColor: (color: HighlightColorName) => void;
  onClearTextHighlights: () => void;
};

export function TextHighlighter({
  isHighlighterActive,
  selectedHighlightColor,
  onToggleHighlighter,
  onSelectColor,
  onClearTextHighlights,
}: TextHighlighterProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        handleCloseMenu();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <HighlighterWrapper ref={wrapperRef}>
      <HighlighterButton
        type="button"
        data-active={isHighlighterActive}
        onClick={toggleMenu}
      >
        <MarkerIcon />
      </HighlighterButton>

      <HighlighterMenu
        isMenuOpen={isMenuOpen}
        onCloseMenu={handleCloseMenu}
        isHighlighterActive={isHighlighterActive}
        selectedHighlightColor={selectedHighlightColor}
        onToggleHighlighter={onToggleHighlighter}
        onSelectColor={onSelectColor}
        onClearTextHighlights={onClearTextHighlights}
      />
    </HighlighterWrapper>
  );
}
