import { cva } from "class-variance-authority";
import { useAtomValue } from "jotai";
import { widgetStyleConfigAtom } from "../store/widget-style-config";

// Button variants using CVA
export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        tertiary: "bg-tertiary text-tertiary-foreground hover:bg-tertiary/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

// Hook to get dynamic styles based on config
// eslint-disable-next-line ts/explicit-function-return-type
export function useWidgetStyles() {
  const config = useAtomValue(widgetStyleConfigAtom);

  return {
    // Theme
    theme: config.theme,
    // Fonts
    fontPrimary: config.font_primary,
    fontSecondary: config.font_secondary,
    // Padding
    padding: config.padding,
    // Rounding
    rounding: config.rounding,
    // Widget width
    widgetWidth: config.widget_width,
    // Widget style
    widgetStyle: config.widget_style,
    // Navigation
    navigation: config.navigation,
    // Show navigation icons
    showNavigationIcons: config.show_navigation_icons,
    // Show wallet
    showWallet: config.show_wallet,
    // Multi chain
    multiChain: config.multi_chain,
    // Dynamic CSS variables based on config
    cssVariables: {
      // Brand colors
      "--color-brand-primary": config.styles?.color_brand_primary,
      "--color-brand-secondary": config.styles?.color_brand_secondary,
      "--color-brand-secondary-10": config.styles?.color_brand_secondary_10,

      // Surface colors
      "--color-surface-primary": config.styles?.color_surface_primary,
      "--color-surface-input": config.styles?.color_surface_input,
      "--color-surface-world": config.styles?.color_surface_world,
      "--color-surface-transparent": config.styles?.color_surface_transparent,
      "--color-surface-underlay": config.styles?.color_surface_underlay,

      // Text colors
      "--color-text-primary": config.styles?.color_text_primary,
      "--color-text-secondary": config.styles?.color_text_secondary,
      "--color-text-tertiary": config.styles?.color_text_tertiary,
      "--color-text-additional": config.styles?.color_text_additional,
      "--color-text-positive": config.styles?.color_text_positive,
      "--color-text-negative": config.styles?.color_text_negative,

      // Border colors
      "--color-border-primary": config.styles?.color_border_primary,
      "--color-border-secondary": config.styles?.color_border_secondary,
      "--color-border-input": config.styles?.color_border_input,
      "--color-border-divider": config.styles?.color_border_divider,

      // Button colors
      "--color-button-primary": config.styles?.color_button_primary,
      "--color-button-primary-text": config.styles?.color_button_primary_text,
      "--color-button-secondary": config.styles?.color_button_secondary,
      "--color-button-tertiary": config.styles?.color_button_tertiary,

      // Border radius
      "--radius-0": config.styles?.radius_0,
      "--radius-4": config.styles?.radius_4,
      "--radius-8": config.styles?.radius_8,
      "--radius-12": config.styles?.radius_12,
      "--radius-16": config.styles?.radius_16,
      "--radius-20": config.styles?.radius_20,
      "--radius-24": config.styles?.radius_24,
      "--radius-28": config.styles?.radius_28,
      "--radius-32": config.styles?.radius_32,
      "--radius-100": config.styles?.radius_100,

      // Default radius from config
      "--radius-default": config.rounding,
    },
  };
}
