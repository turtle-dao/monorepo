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
    cssligth: {
      // Surface colors
      "--color-surface-primary": config.styles.color_surface_primary,
      "--color-surface-secondary": config.styles.color_surface_secondary,

      // Text colors
      "--color-text-primary": config.styles.color_text_primary,
      "--color-text-muted": config.styles.color_text_muted,
      "--color-text-accent": config.styles.color_text_accent,
    },
    cssdark: {
      // Surface colors
      "--color-surface-primary-dark": config.styles.color_surface_primary_dark,
      "--color-surface-secondary-dark": config.styles.color_surface_secondary_dark,
      // Text colors
      "--color-text-primary-dark": config.styles.color_text_primary_dark,
      "--color-text-muted-dark": config.styles.color_text_muted_dark,
      "--color-text-accent-dark": config.styles.color_text_accent,
    },
  };
}
