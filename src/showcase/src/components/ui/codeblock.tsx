import { cn } from "@/components/lib/utils";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import { useEffect, useState } from "react";
import { createHighlighter } from "shiki";
import BunIcon from "~icons/logos/bun";
import CSSIcon from "~icons/logos/css-3";
import GitIcon from "~icons/logos/git-icon";
import GoIcon from "~icons/logos/go";
import HTMLIcon from "~icons/logos/html-5";
import JavaScriptIcon from "~icons/logos/javascript";
import NodeJSIcon from "~icons/logos/nodejs-icon";
import NPMIcon from "~icons/logos/npm-icon";
import PNPMIcon from "~icons/logos/pnpm";
import PythonIcon from "~icons/logos/python";
import ReactIcon from "~icons/logos/react";
import RustIcon from "~icons/logos/rust";
import TypeScriptIcon from "~icons/logos/typescript-icon";
import YarnIcon from "~icons/logos/yarn";
import CheckIcon from "~icons/material-symbols/check-small";
import CopyIcon from "~icons/material-symbols/content-copy-outline";
import PlainTextIcon from "~icons/material-symbols/text-format";
import ShellIcon from "~icons/mdi/console";
import JSONIcon from "~icons/vscode-icons/file-type-json";
import { useAsync } from "../hooks/use-async";

const languageIcons: Record<string, React.ComponentType<{ className: string }>> = {
  typescript: TypeScriptIcon,
  tsx: ReactIcon,
  javascript: JavaScriptIcon,
  jsx: ReactIcon,
  js: JavaScriptIcon,
  react: ReactIcon,
  node: NodeJSIcon,
  nodejs: NodeJSIcon,
  python: PythonIcon,
  py: PythonIcon,
  rust: RustIcon,
  rs: RustIcon,
  go: GoIcon,
  html: HTMLIcon,
  css: CSSIcon,
  bun: BunIcon,
  yarn: YarnIcon,
  npm: NPMIcon,
  pnpm: PNPMIcon,
  bash: ShellIcon,
  shell: ShellIcon,
  sh: ShellIcon,
  zsh: ShellIcon,
  git: GitIcon,
  json: JSONIcon,
  text: PlainTextIcon,
};

const languageExtensions: Record<string, string> = {
  typescript: "ts",
  tsx: "tsx",
  javascript: "js",
  jsx: "jsx",
  js: "js",
  react: "jsx",
  node: "js",
  nodejs: "js",
  python: "py",
  py: "py",
  rust: "rs",
  rs: "rs",
  go: "go",
  html: "html",
  css: "css",
  bun: "sh",
  yarn: "sh",
  npm: "sh",
  pnpm: "sh",
  bash: "sh",
  shell: "sh",
  sh: "sh",
  zsh: "sh",
  git: "sh",
  json: "json",
  text: "txt",
};

export type CodeblockContent = string | Record<string, string>;
export type CodeblockGroup = string | undefined;

function getStoredTabValue(group: string): string | null {
  if (typeof window === "undefined")
    return null;
  return localStorage.getItem(`codeblock-tab-${group}`);
}

function setStoredTabValue(group: string, value: string): void {
  if (typeof window === "undefined")
    return;
  localStorage.setItem(`codeblock-tab-${group}`, value);
}

const CodeblockGroupContext = React.createContext<{
  activeTab: Record<string, string>;
  setActiveTab: (group: string, value: string) => void;
}>({
      activeTab: {},
      setActiveTab: () => {},
    });

export function CodeblockProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [activeTab, setActiveTabState] = useState<Record<string, string>>({});

  const setActiveTab = (group: string, value: string): void => {
    setActiveTabState(prev => ({ ...prev, [group]: value }));
    setStoredTabValue(group, value);
  };

  useEffect(() => {
    const storedTabs: Record<string, string> = {};
    setActiveTabState(storedTabs);
  }, []);

  return (
    <CodeblockGroupContext value={{ activeTab, setActiveTab }}>
      {children}
    </CodeblockGroupContext>
  );
}

interface CodeblockProps {
  children: CodeblockContent;
  language?: string;
  filename?: string;
  group?: CodeblockGroup;
  className?: string;
}

export function Codeblock({
  children,
  language = "text",
  filename,
  group,
  className,
}: CodeblockProps): React.ReactElement {
  const { activeTab, setActiveTab } = React.useContext(CodeblockGroupContext);
  const [copied, setCopied] = useState(false);

  const [highlighter] = useAsync(async () => {
    return await createHighlighter({
      themes: ["github-dark"],
      langs: Object.values(languageExtensions),
    });
  });

  const isMultiTab = typeof children !== "string";
  const entries = isMultiTab ? Object.entries(children as Record<string, string>) : [];
  const hasEntries = entries.length > 0;

  const defaultTabValue = hasEntries ? entries[0][0] : "";
  const groupKey = group || "default";
  const currentTab = hasEntries
    ? activeTab[groupKey] || getStoredTabValue(groupKey) || defaultTabValue
    : "";

  const validTab = hasEntries && entries.some(([key]) => key === currentTab)
    ? currentTab
    : defaultTabValue;

  useEffect(() => {
    if (hasEntries && validTab && validTab !== activeTab[groupKey]) {
      setActiveTab(groupKey, validTab);
    }
  }, [hasEntries, validTab, groupKey, activeTab, setActiveTab]);

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const copyToClipboard = (text: string): void => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
    });
  };

  if (!isMultiTab) {
    const langExt = languageExtensions[language] || "txt";
    const IconComponent = languageIcons[language] || PlainTextIcon;
    const codeContent = children as string;

    return (
      <Card className={cn("relative overflow-hidden not-prose", className || "")}>
        <div className="flex items-center justify-between gap-2 px-4 pr-2 py-1 bg-muted border-b">
          <div className="flex items-center gap-2">
            {filename && (
              <>
                <IconComponent className="w-4 h-4 rounded-sm" />
                <span className="text-sm font-medium">{filename}</span>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(codeContent)}
            className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted-foreground/10 transition-colors cursor-pointer"
            title="Copy code"
            aria-label="Copy code to clipboard"
          >
            {copied
              ? (
                  <CheckIcon className="w-4 h-4 text-green-500" />
                )
              : (
                  <CopyIcon className="w-4 h-4" />
                )}
          </button>
        </div>
        <div className="p-3 text-sm overflow-x-auto">
          {highlighter
            ? (
                <pre
                  // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
                  dangerouslySetInnerHTML={{
                    __html: highlighter.codeToHtml(codeContent, {
                      lang: langExt,
                      theme: "github-dark",
                    }),
                  }}
                />
              )
            : (
                <pre className="text-sm">{codeContent}</pre>
              )}
        </div>
      </Card>
    );
  }

  if (!hasEntries) {
    return <></>;
  }

  const currentCode = entries.find(([key]) => key === validTab)?.[1] || "";

  return (
    <Card className={cn("relative overflow-hidden not-prose", className || "")}>
      <Tabs
        value={validTab}
        onValueChange={value => setActiveTab(groupKey, value)}
        className="w-full"
      >
        <div className="flex items-center border-b bg-muted">
          <TabsList className="h-10 bg-transparent border-none">
            {entries.map(([key]) => {
              const IconComponent = languageIcons[key] || PlainTextIcon;

              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex items-center gap-1.5 data-[state=active]:bg-background"
                >
                  <IconComponent className="w-4 h-4 rounded-sm" />
                  <span>{key}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <div className="ml-auto flex items-center gap-2 pr-2">
            {filename && (
              <div className="text-sm text-muted-foreground">
                {filename}
              </div>
            )}
            <button
              type="button"
              onClick={() => copyToClipboard(currentCode)}
              className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted-foreground/10 transition-colors cursor-pointer"
              title="Copy code"
              aria-label="Copy code to clipboard"
            >
              {copied
                ? (
                    <CheckIcon className="w-4 h-4 text-green-500" />
                  )
                : (
                    <CopyIcon className="w-4 h-4" />
                  )}
            </button>
          </div>
        </div>

        {entries.map(([key, code]) => {
          const langExt = languageExtensions[key] || "text";

          return (
            <TabsContent key={key} value={key} className="p-0 m-0">
              <div className="p-4 text-sm overflow-x-auto">
                {highlighter
                  ? (
                      <pre
                        // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
                        dangerouslySetInnerHTML={{
                          __html: highlighter.codeToHtml(code, {
                            lang: langExt,
                            theme: "github-dark",
                          }),
                        }}
                      />
                    )
                  : (
                      <pre className="text-sm">{code}</pre>
                    )}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </Card>
  );
}
