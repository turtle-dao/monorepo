import type { Styles, WidgetStyleConfig } from "../types/style-config";
import { atom } from "jotai";

const defaultStyles: Styles = {
  color_brand_primary: "#000000",
  color_brand_secondary: "#ffffff",
  color_brand_secondary_10: "#ffffff1a",
  color_surface_primary: "#ffffff",
  color_surface_input: "#f5f5f5",
  color_surface_world: "#000000",
  color_surface_transparent: "#ffffff00",
  color_surface_underlay: "#0000000d",
  color_text_primary: "#000000",
  color_text_secondary: "#666666",
  color_text_tertiary: "#999999",
  color_text_additional: "#666666",
  color_text_positive: "#00c853",
  color_text_negative: "#ff3d00",
  color_border_primary: "#e0e0e0",
  color_border_secondary: "#f5f5f5",
  color_border_input: "#e0e0e0",
  color_border_divider: "#e0e0e0",
  color_button_primary: "#000000",
  color_button_primary_text: "#ffffff",
  color_button_secondary: "#f5f5f5",
  color_button_tertiary: "#ffffff",
  radius_0: "0px",
  radius_4: "4px",
  radius_8: "8px",
  radius_12: "12px",
  radius_16: "16px",
  radius_20: "20px",
  radius_24: "24px",
  radius_28: "28px",
  radius_32: "32px",
  radius_100: "100px",
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
  styles: defaultStyles,
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
  styles: defaultStyles,
};

export const config4: WidgetStyleConfig = {
  logo: {
    light_url: "",
    dark_url: "",
  },
  theme: "dark",
  rounding: "lg",
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

export const widgetStyleConfigAtom = atom<WidgetStyleConfig>(defaultWidgetStyleConfig);
