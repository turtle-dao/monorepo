import Layout from "@/components/custom/layout";
import { EarnPageDev } from "@/pages/EarnPageDev";
import { EarnPageExample } from "@/pages/EarnPageExample";
import { EarnPageWizardPage } from "@/pages/EarnPageWizardPage";
import { MdxPage } from "@/pages/MdxPage";
import { NotFound } from "@/pages/NotFound";
import { BrowserRouter, Route, Routes } from "react-router";

const mdxPages = import.meta.glob("../mdx/**/*.mdx", { eager: true });

export function Router(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {Object.entries(mdxPages).map(([key, p]) => {
            const page = p as any;
            const elems = key.replace("../mdx/", "").replace(".mdx", "").replaceAll("index", "").split("/");
            const path = `/${elems.join("/")}`;

            return <Route key={page.title} path={path} element={<MdxPage page={page} />} />;
          })}

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/earn-dev" element={<EarnPageDev />} />
        <Route path="/earn" element={<EarnPageExample />} />
        <Route path="/earn-wizard" element={<EarnPageWizardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
