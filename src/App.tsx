/* eslint-disable @typescript-eslint/no-explicit-any */
import Highlighter from "web-highlighter";
import "./App.css";
// import LocalStore from "./LocalStore";
import { useCallback, useEffect, useRef, useState } from "react";
import HighlightTooltip, {
  HighlightTooltipProps,
} from "./components/HighlightTooltip";
import {
  COLOR_MAPPER,
  DEFAULT_COLOR,
  DISABLED_COLOR,
  HighlightColorName,
} from "./constants";
import { getPosition } from "./utils";
import { TextSample } from "./components/TextSample";
import { TextHighlighter } from "./components/TextHighlighter";

function App() {
  const [isHighlighterActive, setIsHighlighterActive] = useState(false);
  const [selectedColor, setSelectedColor] =
    useState<HighlightColorName>("yellow");
  const [highlightTooltips, setHighlightTooltips] = useState<
    HighlightTooltipProps[]
  >([]);
  const highlighterRef = useRef<Highlighter | null>(null);
  // const store = useRef(new LocalStore()).current;
  const isHighlighterActiveRef = useRef(isHighlighterActive);

  const switchColor = useCallback((color: HighlightColorName) => {
    setSelectedColor(color);

    highlighterRef.current?.setOption({
      style: {
        className: isHighlighterActiveRef.current
          ? COLOR_MAPPER[color].className
          : DISABLED_COLOR.className,
      },
    });
  }, []);

  const toggleHighlighter = useCallback(() => {
    setIsHighlighterActive((isActive) => {
      highlighterRef.current?.setOption({
        style: {
          className: !isActive
            ? COLOR_MAPPER[selectedColor].className
            : DISABLED_COLOR.className,
        },
      });

      return !isActive;
    });
  }, [selectedColor]);

  function hideTooltips() {
    setHighlightTooltips((prev) =>
      prev.map((tooltip) => ({ ...tooltip, isVisible: false }))
    );
  }

  function deleteHighlight(id: string) {
    setHighlightTooltips((prev) => prev.filter((tooltip) => tooltip.id !== id));
    highlighterRef.current?.removeClass("highlight-wrap-hover", id);
    highlighterRef.current?.remove(id);
  }

  function addHighlight(id: string) {
    const highlightedElement = document.querySelector(
      `[data-highlight-id="${id}"]`
    );

    if (highlightedElement instanceof HTMLElement) {
      highlightedElement.className = COLOR_MAPPER[selectedColor].className;
      highlightTooltips[0].isDeleteTooltip = true;
      highlightTooltips[0].isVisible = false;
    }
  }

  function handleAddHighlight(id: string) {
    if (!isHighlighterActiveRef.current) {
      toggleHighlighter();
    }

    const blankHighlights: NodeListOf<HTMLElement> =
      document.querySelectorAll(".blank-highlight");
    const hasMultipleBlankHighlights = blankHighlights.length > 0;

    if (!hasMultipleBlankHighlights) {
      addHighlight(id);
      return;
    }

    blankHighlights.forEach((highlight) => {
      highlight.className = COLOR_MAPPER[selectedColor].className;
      highlightTooltips[0].isDeleteTooltip = true;
      highlightTooltips[0].isVisible = false;
    });
  }

  function toggleTooltipVisibility({ highlightId }: { highlightId: string }) {
    setHighlightTooltips((prev) =>
      prev.map((tooltip) =>
        tooltip.id === highlightId
          ? {
              ...tooltip,
              isVisible: !tooltip.isVisible,
            }
          : { ...tooltip, isVisible: false }
      )
    );
  }

  function handleClearTextHighlights() {
    highlighterRef.current?.removeAll();
    setHighlightTooltips([]);
  }

  useEffect(() => {
    const highlighter = new Highlighter({
      exceptSelectors: [".highlight-tooltip", "b", "img", "button", "header"],
      style: {
        className: isHighlighterActive
          ? DEFAULT_COLOR.className
          : DISABLED_COLOR.className,
      },
    });
    highlighterRef.current = highlighter;

    // const storedHighlights = store.getAll();
    // storedHighlights.forEach(({ hs }) =>
    //   highlighter.fromStore(hs.startMeta, hs.endMeta, hs.text, hs.id, hs.extra)
    // );

    highlighter
      .on(Highlighter.event.CLICK, ({ id }) => {
        const isBlankHighlight =
          document.querySelector(`[data-highlight-id="${id}"]`)?.className ===
          "blank-highlight";

        if (isBlankHighlight) {
          highlighterRef.current?.removeClass("highlight-wrap-hover", id);
          highlighterRef.current?.remove(id);
          setHighlightTooltips((prev) =>
            prev.filter((tooltip) => tooltip.id !== id)
          );

          return;
        }

        toggleTooltipVisibility({
          highlightId: id,
        });
      })
      .on(Highlighter.event.CREATE, ({ sources }) => {
        sources.forEach((source) => {
          const position = getPosition(highlighter.getDoms(source.id)[0]);

          const tooltip = {
            id: source.id,
            top: position.top,
            left: position.left,
            isDeleteTooltip: isHighlighterActiveRef.current ? true : false,
            isVisible: isHighlighterActiveRef.current ? false : true,
          };

          if (isHighlighterActiveRef.current) {
            setHighlightTooltips((prev) => [...prev, tooltip]);
          } else {
            const tooltipsWithoutBlankHighlights = [
              ...highlightTooltips,
            ].filter((tooltip) => tooltip.isDeleteTooltip);

            setHighlightTooltips([...tooltipsWithoutBlankHighlights, tooltip]);
          }
        });
        // store.save(sources.map((hs) => ({ hs })));
      });
    // .on(Highlighter.event.REMOVE, ({ ids }) => {
    //   ids.forEach((id) => store.remove(id));
    // });

    highlighter.run();

    return () => {
      highlighter.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    isHighlighterActiveRef.current = isHighlighterActive;
  }, [isHighlighterActive]);

  useEffect(() => {
    function handleDocumentMouseDown(e: MouseEvent) {
      if (
        e.target instanceof HTMLElement &&
        (e.target.dataset.highlightId || e.target.dataset.id)
      ) {
        return;
      }
      hideTooltips();

      if (
        isHighlighterActiveRef.current ||
        (e.target instanceof HTMLElement && e.target.dataset.id)
      ) {
        return;
      }

      const blankHighlights: NodeListOf<HTMLElement> =
        document.querySelectorAll(".blank-highlight");

      if (blankHighlights.length > 0) {
        blankHighlights.forEach((highlight) => {
          const highlightId = highlight.dataset.highlightId;

          if (highlightId) {
            highlighterRef.current?.removeClass(
              "highlight-wrap-hover",
              highlightId
            );
            highlighterRef.current?.remove(highlightId);

            setHighlightTooltips((prev) =>
              prev.filter((tooltip) => {
                if (tooltip.id !== highlightId) {
                  return tooltip;
                }
              })
            );
          }
        });
      }
    }

    document.addEventListener("mousedown", handleDocumentMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
    };
  }, [highlightTooltips]);

  return (
    <>
      <main>
        <header>
          <TextHighlighter
            isHighlighterActive={isHighlighterActive}
            selectedHighlightColor={selectedColor}
            onToggleHighlighter={toggleHighlighter}
            onSelectColor={switchColor}
            onClearTextHighlights={handleClearTextHighlights}
          />
        </header>

        <TextSample />
      </main>

      {highlightTooltips.map(
        (tooltip) =>
          tooltip.isVisible && (
            <HighlightTooltip
              key={tooltip.id}
              className="highlight-tooltip"
              top={tooltip.top}
              left={tooltip.left}
              id={tooltip.id}
              isDeleteTooltip={tooltip.isDeleteTooltip}
              isVisible={true}
              onClick={() =>
                tooltip.isDeleteTooltip
                  ? deleteHighlight(tooltip.id)
                  : handleAddHighlight(tooltip.id)
              }
            />
          )
      )}
    </>
  );
}

export default App;
