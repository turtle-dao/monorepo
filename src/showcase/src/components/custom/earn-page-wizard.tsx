import { useConnectModal } from "@rainbow-me/rainbowkit";
import { defaultThemeConfig, EarnPage, TurtleLogo, TurtleProvider, type TurtleThemeConfig, useWagmiAdapter } from "@turtledev/react";
import clipboard from "clipboardy";
import { RefreshCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { type IColor, useColor } from "react-color-palette";
import { createHighlighter } from "shiki";
import { useAccount } from "wagmi";
import Clipboard from "~icons/heroicons/clipboard-20-solid";
import { useAsync } from "@/components/hooks/use-async";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ColorPicker } from "@/components/ui/color-picker";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function SliderControl({
  label,
  value,
  defaultValue,
  min = 0,
  max = 2,
  step = 0.05,
  onChange,
  suffix = "rem",
  prefix = "",
}: {
  label: string;
  value: string;
  defaultValue: string;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: string) => void;
  suffix?: string;
  prefix?: string;
}): React.ReactElement {
  const isChanged = value !== defaultValue;

  const getNumericValue = (val: string): number => {
    if (suffix) {
      val = val.replace(suffix, "");
    }
    if (prefix) {
      val = val.replace(prefix, "");
    }
    const parsed = Number.parseFloat(val);
    return Number.isNaN(parsed) ? min : parsed;
  };

  const numericValue = getNumericValue(value);

  const handleReset = (): void => {
    onChange(defaultValue);
  };

  return (
    <div className="h-[36px]">
      <div className="flex justify-between items-center h-4">
        <Label className="text-sm text-muted-foreground">
          {label}
          :
          {" "}
          {value}
        </Label>
        {isChanged && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleReset}
            title="Reset to default"
          >
            <RefreshCcw className="h-3 w-3" />
          </Button>
        )}
      </div>
      <Slider
        className="mt-2"
        min={min}
        max={max}
        step={step}
        value={[numericValue]}
        onValueChange={values => onChange(`${prefix}${values[0]}${suffix}`)}
      />
    </div>
  );
}

function ColorControl({
  label,
  value,
  defaultValue,
  onChange,
}: {
  label: string;
  value: string;
  defaultValue: string;
  onChange: (value: string) => void;
}): React.ReactElement {
  const [color, setColor] = useColor(value);
  const isChanged = value !== defaultValue;

  const handleColorChange = (newColor: IColor): void => {
    setColor(newColor);
    onChange(newColor.hex);
  };

  const handleReset = (): void => {
    onChange(defaultValue);
  };

  return (
    <div className="flex items-center gap-3 h-8">
      <Label className="w-24 text-sm text-muted-foreground">
        {label}
        :
      </Label>
      <ColorPicker
        color={color}
        onChange={handleColorChange}
      />
      {isChanged && (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 ml-auto"
          onClick={handleReset}
          title="Reset to default"
        >
          <RefreshCcw className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}

function ThemeSwitch({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}): React.ReactElement {
  return (
    <div className="flex items-center space-x-3">
      <Switch
        checked={checked}
        onCheckedChange={onChange}
      />
      <Label className="block text-base font-medium">{label}</Label>
    </div>
  );
}

function SharedSettingsPanel({
  borderRadius,
  setBorderRadius,
  gap,
  setGap,
  padding,
  setPadding,
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
  fontWeight,
  setFontWeight,
}: {
  borderRadius: string;
  setBorderRadius: (value: string) => void;
  gap: string;
  setGap: (value: string) => void;
  padding: string;
  setPadding: (value: string) => void;
  fontFamily: string;
  setFontFamily: (value: string) => void;
  fontSize: string;
  setFontSize: (value: string) => void;
  fontWeight: string;
  setFontWeight: (value: string) => void;
}): React.ReactElement {
  const isAnyValueChanged
    = borderRadius !== defaultThemeConfig.shared.borderRadius
      || gap !== defaultThemeConfig.shared.gap
      || padding !== defaultThemeConfig.shared.padding
      || fontFamily !== defaultThemeConfig.shared.fontFamily
      || fontSize !== defaultThemeConfig.shared.fontSize
      || fontWeight !== defaultThemeConfig.shared.fontWeight;

  const handleResetAll = (): void => {
    setBorderRadius(defaultThemeConfig.shared.borderRadius);
    setGap(defaultThemeConfig.shared.gap);
    setPadding(defaultThemeConfig.shared.padding);
    setFontFamily(defaultThemeConfig.shared.fontFamily);
    setFontSize(defaultThemeConfig.shared.fontSize);
    setFontWeight(defaultThemeConfig.shared.fontWeight);
  };

  return (
    <TabsContent value="shared" className="space-y-4 mt-4">
      <div className="flex justify-between items-center h-8">
        <div className="text-sm font-medium">Layout Settings</div>
        {isAnyValueChanged && (
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={handleResetAll}
          >
            <RefreshCcw className="h-3 w-3 mr-1" />
            Reset All
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <SliderControl
          label="Border Radius"
          value={borderRadius}
          defaultValue={defaultThemeConfig.shared.borderRadius}
          onChange={setBorderRadius}
          max={1.25}
        />

        <SliderControl
          label="Gap"
          value={gap}
          defaultValue={defaultThemeConfig.shared.gap}
          onChange={setGap}
          min={0.5}
        />

        <SliderControl
          label="Padding"
          value={padding}
          defaultValue={defaultThemeConfig.shared.padding}
          onChange={setPadding}
          min={0.5}
          max={1.5}
        />
      </div>

      <div className="flex flex-col gap-4 pt-4 border-t">
        <div className="text-sm font-medium">Font Settings</div>

        <div className="flex items-center gap-3 h-8">
          <Label className="w-24 text-sm text-muted-foreground">
            Font Family:
          </Label>
          <input
            type="text"
            className="flex-1 h-8 rounded-md border px-3 py-1 text-sm outline-none focus:border-green-500"
            value={fontFamily}
            onChange={e => setFontFamily(e.target.value)}
          />
          {fontFamily !== defaultThemeConfig.shared.fontFamily && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 ml-auto"
              onClick={() => setFontFamily(defaultThemeConfig.shared.fontFamily)}
              title="Reset to default"
            >
              <RefreshCcw className="h-3 w-3" />
            </Button>
          )}
        </div>

        <SliderControl
          label="Font Size"
          value={fontSize}
          defaultValue={defaultThemeConfig.shared.fontSize}
          onChange={setFontSize}
          min={0.75}
          max={1.5}
          step={0.05}
        />

        <SliderControl
          label="Font Weight"
          value={fontWeight}
          defaultValue={defaultThemeConfig.shared.fontWeight}
          onChange={setFontWeight}
          min={300}
          max={700}
          step={100}
          suffix=""
        />
      </div>
    </TabsContent>
  );
}

function ThemeColorsPanel({
  themeType,
  bgPrimary,
  setBgPrimary,
  bgSecondary,
  setBgSecondary,
  bgAccent,
  setBgAccent,
  bgTranslucent,
  setBgTranslucent,
  textPrimary,
  setTextPrimary,
  textSecondary,
  setTextSecondary,
  borderColor,
  setBorderColor,
  buttonBgColor,
  setButtonBgColor,
  buttonTextColor,
  setButtonTextColor,
  errorColor,
  setErrorColor,
}: {
  themeType: "light" | "dark";
  bgPrimary: string;
  setBgPrimary: (value: string) => void;
  bgSecondary: string;
  setBgSecondary: (value: string) => void;
  bgAccent: string;
  setBgAccent: (value: string) => void;
  bgTranslucent: string;
  setBgTranslucent: (value: string) => void;
  textPrimary: string;
  setTextPrimary: (value: string) => void;
  textSecondary: string;
  setTextSecondary: (value: string) => void;
  borderColor: string;
  setBorderColor: (value: string) => void;
  buttonBgColor: string;
  setButtonBgColor: (value: string) => void;
  buttonTextColor: string;
  setButtonTextColor: (value: string) => void;
  errorColor: string;
  setErrorColor: (value: string) => void;
}): React.ReactElement {
  const isAnyValueChanged
    = bgPrimary !== defaultThemeConfig[themeType].bgPrimary
      || bgSecondary !== defaultThemeConfig[themeType].bgSecondary
      || bgAccent !== defaultThemeConfig[themeType].bgAccent
      || textPrimary !== defaultThemeConfig[themeType].textPrimary
      || textSecondary !== defaultThemeConfig[themeType].textSecondary
      || borderColor !== defaultThemeConfig[themeType].borderColor
      || buttonBgColor !== defaultThemeConfig[themeType].buttonBgColor
      || buttonTextColor !== defaultThemeConfig[themeType].buttonTextColor
      || errorColor !== defaultThemeConfig[themeType].errorColor;

  const handleResetAll = (): void => {
    setBgPrimary(defaultThemeConfig[themeType].bgPrimary);
    setBgSecondary(defaultThemeConfig[themeType].bgSecondary);
    setBgAccent(defaultThemeConfig[themeType].bgAccent);
    setTextPrimary(defaultThemeConfig[themeType].textPrimary);
    setTextSecondary(defaultThemeConfig[themeType].textSecondary);
    setBorderColor(defaultThemeConfig[themeType].borderColor);
    setButtonBgColor(defaultThemeConfig[themeType].buttonBgColor);
    setButtonTextColor(defaultThemeConfig[themeType].buttonTextColor);
    setErrorColor(defaultThemeConfig[themeType].errorColor);
  };

  return (
    <TabsContent value={themeType} className="space-y-4 mt-4">
      <div className="flex justify-between items-center h-8">
        <div className="text-sm font-medium">Background Colors</div>
        {isAnyValueChanged && (
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={handleResetAll}
          >
            <RefreshCcw className="h-3 w-3 mr-1" />
            Reset All
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <ColorControl
          label="Primary"
          value={bgPrimary}
          defaultValue={defaultThemeConfig[themeType].bgPrimary}
          onChange={setBgPrimary}
        />

        <ColorControl
          label="Secondary"
          value={bgSecondary}
          defaultValue={defaultThemeConfig[themeType].bgSecondary}
          onChange={setBgSecondary}
        />

        <ColorControl
          label="Accent"
          value={bgAccent}
          defaultValue={defaultThemeConfig[themeType].bgAccent}
          onChange={setBgAccent}
        />

        <ColorControl
          label="Translucent"
          value={bgTranslucent}
          defaultValue={defaultThemeConfig[themeType].bgTranslucent}
          onChange={setBgTranslucent}
        />
      </div>

      <div className="pt-4 border-t">
        <div className="text-sm font-medium mb-3">Text & Border Colors</div>
        <div className="flex flex-col gap-3">
          <ColorControl
            label="Text Primary"
            value={textPrimary}
            defaultValue={defaultThemeConfig[themeType].textPrimary}
            onChange={setTextPrimary}
          />

          <ColorControl
            label="Text Secondary"
            value={textSecondary}
            defaultValue={defaultThemeConfig[themeType].textSecondary}
            onChange={setTextSecondary}
          />

          <ColorControl
            label="Border Color"
            value={borderColor}
            defaultValue={defaultThemeConfig[themeType].borderColor}
            onChange={setBorderColor}
          />

          <ColorControl
            label="Error Color"
            value={errorColor}
            defaultValue={defaultThemeConfig[themeType].errorColor}
            onChange={setErrorColor}
          />
        </div>
      </div>

      <div className="pt-4 border-t">
        <div className="text-sm font-medium mb-3">Button Settings</div>
        <div className="flex flex-col gap-3">
          <ColorControl
            label="Background"
            value={buttonBgColor}
            defaultValue={defaultThemeConfig[themeType].buttonBgColor}
            onChange={setButtonBgColor}
          />

          <ColorControl
            label="Text Color"
            value={buttonTextColor}
            defaultValue={defaultThemeConfig[themeType].buttonTextColor}
            onChange={setButtonTextColor}
          />
        </div>
      </div>
    </TabsContent>
  );
}

function ThemePreview({
  useLightTheme,
  themeConfig,
  enableSearchBar,
  disableText,
}: {
  useLightTheme: boolean;
  themeConfig: TurtleThemeConfig;
  enableSearchBar: boolean;
  disableText: boolean;
}): React.ReactElement {
  const [highlighter] = useAsync(async () =>
    await createHighlighter({ themes: ["github-dark", "github-light"], langs: ["tsx"] }),
  );

  const { toStringify, code } = useMemo(() => {
    if (!highlighter)
      return { toStringify: "", code: "" };

    const props = {
      enableSearch: `{${enableSearchBar}}`,
      disableText: `{${disableText}}`,
      referral: "\"...\"",
    };

    const propsString = Object.entries(props)
      .map(([key, value]) => `    ${key}=${value}`)
      .join("\n");

    const configString = JSON.stringify(themeConfig, null, 2)
      .replace(/"([^"]+)":/g, "$1:")
      .replace(/"([^"]+)"/g, "\"$1\"");

    const code = `<TurtleProvider themeConfig={${configString}}>
  <EarnPage
${propsString}
  />
</TurtleProvider>`;

    const toStringify = highlighter.codeToHtml(code, {
      lang: "tsx",
      theme: useLightTheme ? "github-light" : "github-dark",
    });

    return { toStringify, code };
  }, [highlighter, enableSearchBar, disableText, themeConfig, useLightTheme]);

  return (
    <div className="w-[55%] m-1 flex items-stretch">
      <Tabs defaultValue="showcase" className="w-full flex flex-col">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="showcase">Showcase</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="showcase" className="grow-1 max-h-[650px]">
          <Card className={cn(
            "h-full overflow-y-scroll",
            useLightTheme && "bg-zinc-50 border-zinc-200",
            !useLightTheme && "bg-zinc-900 border-zinc-800",
          )}
          >
            <CardContent>
              <TurtleProvider themeConfig={themeConfig}>
                <InternalEarnPage />
              </TurtleProvider>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="code" className="flex-1 relative">
          <Button
            variant="ghost"
            className="absolute top-2 right-2"
            onClick={async () =>
              await clipboard.write(code)}
            size="icon"
          >
            <Clipboard className="w-4 h-4" />
          </Button>

          {/* eslint-disable-next-line react-dom/no-dangerously-set-innerhtml */}
          {toStringify && <pre className="p-4 h-full overflow-auto rounded-xl border bg-zinc-200 dark:bg-zinc-900" dangerouslySetInnerHTML={{ __html: toStringify }} />}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function InternalEarnPage(): React.ReactElement {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const adapter = useWagmiAdapter();

  const scale = 0.75;
  const width = (1 / scale) * 100;

  return (
    <div style={{
      transform: `scale(${scale})`,
      transformOrigin: "top left",
      width: `${width}%`,
    }}
    >
      <EarnPage
        referral="TURTLE"
        user={address}
        openConnectionModal={openConnectModal ?? (() => {})}
        {...adapter}
      />
    </div>
  );
}

export function EarnPageWizard(): React.ReactElement {
  const [enableSearchBar, setEnableSearchBar] = useState(true);
  const [disableText, setDisableText] = useState(false);
  const [useLightTheme, setUseLightTheme] = useState(false);
  const [activeTab, setActiveTab] = useState<"shared" | "light" | "dark">("shared");

  const [borderRadius, setBorderRadius] = useState(defaultThemeConfig.shared.borderRadius);
  const [gap, setGap] = useState(defaultThemeConfig.shared.gap);
  const [padding, setPadding] = useState(defaultThemeConfig.shared.padding);
  const [fontFamily, setFontFamily] = useState(defaultThemeConfig.shared.fontFamily);
  const [fontSize, setFontSize] = useState(defaultThemeConfig.shared.fontSize);
  const [fontWeight, setFontWeight] = useState(defaultThemeConfig.shared.fontWeight);

  const [lightBgPrimary, setLightBgPrimary] = useState(defaultThemeConfig.light.bgPrimary);
  const [lightBgSecondary, setLightBgSecondary] = useState(defaultThemeConfig.light.bgSecondary);
  const [lightBgAccent, setLightBgAccent] = useState(defaultThemeConfig.light.bgAccent);
  const [lightBgTranslucent, setLightBgTranslucent] = useState(defaultThemeConfig.light.bgTranslucent);
  const [lightBorderColor, setLightBorderColor] = useState(defaultThemeConfig.light.borderColor);
  const [lightTextPrimary, setLightTextPrimary] = useState(defaultThemeConfig.light.textPrimary);
  const [lightTextSecondary, setLightTextSecondary] = useState(defaultThemeConfig.light.textSecondary);
  const [lightButtonBgColor, setLightButtonBgColor] = useState(defaultThemeConfig.light.buttonBgColor);
  const [lightButtonTextColor, setLightButtonTextColor] = useState(defaultThemeConfig.light.buttonTextColor);
  const [lightErrorColor, setLightErrorColor] = useState(defaultThemeConfig.light.errorColor);

  const [darkBgPrimary, setDarkBgPrimary] = useState(defaultThemeConfig.dark.bgPrimary);
  const [darkBgSecondary, setDarkBgSecondary] = useState(defaultThemeConfig.dark.bgSecondary);
  const [darkBgAccent, setDarkBgAccent] = useState(defaultThemeConfig.dark.bgAccent);
  const [darkBgTranslucent, setDarkBgTranslucent] = useState(defaultThemeConfig.dark.bgTranslucent);
  const [darkBorderColor, setDarkBorderColor] = useState(defaultThemeConfig.dark.borderColor);
  const [darkTextPrimary, setDarkTextPrimary] = useState(defaultThemeConfig.dark.textPrimary);
  const [darkTextSecondary, setDarkTextSecondary] = useState(defaultThemeConfig.dark.textSecondary);
  const [darkButtonBgColor, setDarkButtonBgColor] = useState(defaultThemeConfig.dark.buttonBgColor);
  const [darkButtonTextColor, setDarkButtonTextColor] = useState(defaultThemeConfig.dark.buttonTextColor);
  const [darkErrorColor, setDarkErrorColor] = useState(defaultThemeConfig.dark.errorColor);

  const themeConfig: TurtleThemeConfig = {
    theme: useLightTheme ? "light" : "dark",
    shared: {
      borderRadius,
      gap,
      padding,
      fontFamily,
      fontSize,
      fontWeight,
    },
    light: {
      bgPrimary: lightBgPrimary,
      bgSecondary: lightBgSecondary,
      bgAccent: lightBgAccent,
      bgTranslucent: lightBgTranslucent,
      borderColor: lightBorderColor,
      textPrimary: lightTextPrimary,
      textSecondary: lightTextSecondary,
      buttonBgColor: lightButtonBgColor,
      buttonTextColor: lightButtonTextColor,
      errorColor: lightErrorColor,
    },
    dark: {
      bgPrimary: darkBgPrimary,
      bgSecondary: darkBgSecondary,
      bgAccent: darkBgAccent,
      bgTranslucent: darkBgTranslucent,
      borderColor: darkBorderColor,
      textPrimary: darkTextPrimary,
      textSecondary: darkTextSecondary,
      buttonBgColor: darkButtonBgColor,
      buttonTextColor: darkButtonTextColor,
      errorColor: darkErrorColor,
    },
  };

  useEffect(() => {
    if (useLightTheme) {
      document.documentElement.classList.remove("dark");
    }
    else {
      document.documentElement.classList.add("dark");
    }
  }, [useLightTheme]);

  return (
    <Card>
      <div className="flex items-stretch">
        <div className="flex-1 m-4">
          <div className="text-lg font-medium">Theme Wizard</div>

          <div className="flex flex-col gap-2 mt-4">
            <ThemeSwitch
              label="Use light theme"
              checked={useLightTheme}
              onChange={setUseLightTheme}
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <ThemeSwitch
              label="Enable search bar"
              checked={enableSearchBar}
              onChange={setEnableSearchBar}
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <ThemeSwitch
              label="Disable text"
              checked={disableText}
              onChange={setDisableText}
            />
          </div>

          <div className="mt-4">
            <Tabs value={activeTab} onValueChange={value => setActiveTab(value as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="shared">Shared</TabsTrigger>
                <TabsTrigger value="light">Light Theme</TabsTrigger>
                <TabsTrigger value="dark">Dark Theme</TabsTrigger>
              </TabsList>

              <SharedSettingsPanel
                borderRadius={borderRadius}
                setBorderRadius={setBorderRadius}
                gap={gap}
                setGap={setGap}
                padding={padding}
                setPadding={setPadding}
                fontFamily={fontFamily}
                setFontFamily={setFontFamily}
                fontSize={fontSize}
                setFontSize={setFontSize}
                fontWeight={fontWeight}
                setFontWeight={setFontWeight}
              />

              <ThemeColorsPanel
                themeType="light"
                bgPrimary={lightBgPrimary}
                setBgPrimary={setLightBgPrimary}
                bgSecondary={lightBgSecondary}
                setBgSecondary={setLightBgSecondary}
                bgAccent={lightBgAccent}
                setBgAccent={setLightBgAccent}
                bgTranslucent={lightBgTranslucent}
                setBgTranslucent={setLightBgTranslucent}
                textPrimary={lightTextPrimary}
                setTextPrimary={setLightTextPrimary}
                textSecondary={lightTextSecondary}
                setTextSecondary={setLightTextSecondary}
                borderColor={lightBorderColor}
                setBorderColor={setLightBorderColor}
                buttonBgColor={lightButtonBgColor}
                setButtonBgColor={setLightButtonBgColor}
                buttonTextColor={lightButtonTextColor}
                setButtonTextColor={setLightButtonTextColor}
                errorColor={lightErrorColor}
                setErrorColor={setLightErrorColor}
              />

              <ThemeColorsPanel
                themeType="dark"
                bgPrimary={darkBgPrimary}
                setBgPrimary={setDarkBgPrimary}
                bgSecondary={darkBgSecondary}
                setBgSecondary={setDarkBgSecondary}
                bgAccent={darkBgAccent}
                setBgAccent={setDarkBgAccent}
                bgTranslucent={darkBgTranslucent}
                setBgTranslucent={setDarkBgTranslucent}
                textPrimary={darkTextPrimary}
                setTextPrimary={setDarkTextPrimary}
                textSecondary={darkTextSecondary}
                setTextSecondary={setDarkTextSecondary}
                borderColor={darkBorderColor}
                setBorderColor={setDarkBorderColor}
                buttonBgColor={darkButtonBgColor}
                setButtonBgColor={setDarkButtonBgColor}
                buttonTextColor={darkButtonTextColor}
                setButtonTextColor={setDarkButtonTextColor}
                errorColor={darkErrorColor}
                setErrorColor={setDarkErrorColor}
              />
            </Tabs>
          </div>
        </div>

        <ThemePreview
          useLightTheme={useLightTheme}
          themeConfig={themeConfig}
          enableSearchBar={enableSearchBar}
          disableText={disableText}
        />
      </div>
    </Card>
  );
}
