import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Codeblock } from "@/components/ui/codeblock";
import { Hazard } from "@/components/ui/hazard";
import { Mdx } from "@/components/ui/mdx";
import * as Table from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import { Link } from "react-router";

const components = {
  em(properties: React.HTMLAttributes<HTMLElement>) {
    return <i {...properties} />;
  },
  Hazard,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Button,
  Link,
  Alert,
  Codeblock,
  ...Table,
};

export function MdxPage({ page: {
  default: Comp,
  title,
  siteTitle = title,
} }: { page: any }): React.ReactElement {
  useEffect(() => {
    document.title = `${siteTitle} | Turtle Dev`;
  }, [siteTitle]);

  return (
    <div className="pt-8">
      <h1 className="text-3xl font-bold">{title}</h1>

      <Mdx>
        <Comp components={components} />
      </Mdx>
    </div>
  );
}
