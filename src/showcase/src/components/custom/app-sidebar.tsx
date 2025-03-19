import Icon from "@/assets/Icon.svg";
import { cn } from "@/components/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { Link, NavLink } from "react-router";
import Book from "~icons/heroicons/book-open-20-solid";
import Library from "~icons/heroicons/building-library-20-solid";
import ChevronDown from "~icons/heroicons/chevron-down-16-solid";
import Terminal from "~icons/heroicons/command-line-20-solid";
import Cube from "~icons/heroicons/cube-20-solid";
import Tool from "~icons/heroicons/wrench-screwdriver-20-solid";
import Hook from "~icons/mdi/hook";
import Github from "~icons/simple-icons/github";

type SidebarT = Record<string, SidebarItemT>;

interface SidebarItemT {
  title: string;
  defaultOpen?: boolean;
  url?: string;
  icon?: typeof Book;
  items?: SidebarItemT[];
  target?: "_blank";
}

// Menu items.
const sidebar: SidebarT = {
  welcome: {
    title: "Home",
    url: "",
    icon: Tool,
    defaultOpen: true,
    items: [
      {
        title: "Welcome",
        url: "",
        icon: Library,
      },
      {
        title: "Introduction",
        url: "/introduction",
        icon: Book,
      },
      {
        title: "Get Started",
        url: "/get-started",
        icon: Terminal,
      },
    ],
  },
  components: {
    title: "Components",
    url: "/components",
    icon: Cube,
    defaultOpen: true,
    items: [
      {
        title: "Introduction",
        url: "/introduction",
      },
      {
        title: "Join Button",
        url: "/join-button",
      },
      {
        title: "Earn Page",
        url: "/earn-page",
      },
    ],
  },
  external: {
    title: "External",
    url: "/external",
    icon: Hook,
    defaultOpen: true,
    items: [
      {
        title: "Github",
        url: "https://github.com/turtle-dao/monorepo",
        target: "_blank",
        icon: Github,
      },
    ],
  },
};

export function AppSidebar(): React.ReactElement {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/" className="text-lg font-semibold flex items-center gap-1">
              <img src={Icon} className="w-8 h-8" />
              Turtle Dev
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {Object.keys(sidebar).map((key) => {
          const parentItem = sidebar[key];
          const Icon = parentItem.icon;

          return (
            <Collapsible key={key} defaultOpen={parentItem.defaultOpen} className="group/collapsible">
              <SidebarGroup>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {Icon && <Icon />}
                      <span>{parentItem.title}</span>
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    {parentItem.items?.map(item => (
                      <InnerItem key={item.title} item={item} parentUrl={parentItem.url ?? ""}></InnerItem>
                    ))}
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}

function InnerItem({
  item,
  parentUrl,
}: {
  item: SidebarItemT;
  parentUrl: string;
}): React.ReactElement {
  const isCollapsible = item.items !== undefined && item.items.length > 0;
  const Icon = item.icon;
  const url = `${parentUrl}${item.url}`;

  if (isCollapsible) {
    return (
      <Collapsible defaultOpen={item.defaultOpen} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              {Icon && <Icon />}
              <span>{item.title}</span>
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
        </SidebarMenuItem>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map(item => (
              <InnerItem key={item.title} item={item} parentUrl={url}></InnerItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    );
  }
  else {
    if (item.target) {
      return (
        <a href={item.url} target={item.target}>
          <SidebarMenuItem>
            <SidebarMenuButton>
              {Icon && <Icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </a>
      );
    }

    return (
      <NavLink to={url} className={({ isActive }) => cn(isActive && "text-green-500")}>
        <SidebarMenuItem>
          <SidebarMenuButton>
            {Icon && <Icon />}
            <span>{item.title}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </NavLink>
    );
  }
}
