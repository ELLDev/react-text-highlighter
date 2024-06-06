export type ColorMapper = {
  [key in HighlightColorName]: HighlightColor;
};

export type HighlightColor = {
  className: string;
  hex: string;
};

export type HighlightColorName = "yellow" | "red" | "green" | "white";

export const COLOR_MAPPER: ColorMapper = {
  yellow: {
    className: "yellow-highlight",
    hex: "#E9C610",
  },
  red: {
    hex: "#FF5B5B",
    className: "red-highlight",
  },
  green: {
    hex: "#27EA8F",
    className: "green-highlight",
  },
  white: {
    hex: "#FFFFFF",
    className: "white-highlight",
  },
};

export const DEFAULT_COLOR = COLOR_MAPPER.yellow;
export const DISABLED_COLOR = {
  className: "blank-highlight",
  hex: "#acd2fe",
};

export const COLORS = ["yellow", "red", "green", "white", "disabled"] as const;
