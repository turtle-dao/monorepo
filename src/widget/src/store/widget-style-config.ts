import type { Styles, WidgetStyleConfig } from "../types/style-config";
import { atom } from "jotai";

const defaultStyles: Styles = {
  color_surface_primary: "#141514",
  color_surface_primary_dark: "#e4efe1",

  color_surface_secondary: "#191A19",
  color_surface_secondary_dark: "#c5ccc3",

  color_text_primary: "#F9F9F9",
  color_text_primary_dark: "#2a2a2a",

  color_text_muted: "#7E7E7E",
  color_text_muted_dark: "#3c3c3c",

  color_text_accent: "#5d904f",
  color_text_accent_dark: "#8DE276",
};

export const defaultWidgetStyleConfig: WidgetStyleConfig = {
  logo: {
    light_url: "",
    dark_url: "",
  },
  theme: "light",
  rounding: "2xl",
  widget_style: "default",
  widget_width: "default",
  padding: "large",
  navigation: "segments",
  font_primary: "Inter",
  font_secondary: "Inter",
  show_navigation_icons: true,
  show_wallet: true,
  multi_chain: false,
  styles: defaultStyles,
};

export const config2: WidgetStyleConfig = {
  logo: {
    light_url: "",
    dark_url: "",
  },
  theme: "dark",
  rounding: "lg",
  widget_style: "default",
  widget_width: "full",
  padding: "xlarge",
  navigation: "segments",
  font_primary: "Inter",
  font_secondary: "Inter",
  show_navigation_icons: true,
  show_wallet: true,
  multi_chain: false,
  styles: {
    ...defaultStyles,
    color_surface_primary: "#22223b",
    color_surface_primary_dark: "#4a4e69",
    color_surface_secondary: "#9a8c98",
    color_surface_secondary_dark: "#c9ada7",
    color_text_primary: "#f2e9e4",
    color_text_primary_dark: "#22223b",
    color_text_muted: "#b8b8d1",
    color_text_muted_dark: "#22223b",
    color_text_accent: "#c9ada7",
    color_text_accent_dark: "#f2e9e4",
  },
};

export const config3: WidgetStyleConfig = {
  logo: {
    light_url: "",
    dark_url: "",
  },
  theme: "light",
  rounding: "md",
  widget_style: "default",
  widget_width: "full",
  padding: "large",
  navigation: "segments",
  font_primary: "Inter",
  font_secondary: "Inter",
  show_navigation_icons: true,
  show_wallet: true,
  multi_chain: false,
  styles: {
    ...defaultStyles,
    color_surface_primary: "#e0fbfc",
    color_surface_primary_dark: "#3d5a80",
    color_surface_secondary: "#98c1d9",
    color_surface_secondary_dark: "#293241",
    color_text_primary: "#293241",
    color_text_primary_dark: "#e0fbfc",
    color_text_muted: "#7b8794",
    color_text_muted_dark: "#3d5a80",
    color_text_accent: "#ee6c4d",
    color_text_accent_dark: "#98c1d9",
  },
};

export const widgetStyleConfigAtom = atom<WidgetStyleConfig>(defaultWidgetStyleConfig);
