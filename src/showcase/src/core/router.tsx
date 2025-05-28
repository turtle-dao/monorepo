import { BrowserRouter, Route, Routes } from "react-router";
import { EarnPageDev } from "@/pages/EarnPageDev";
import { EarnPageTac } from "@/pages/EarnPageTac";
import { EarnPageWizardPage } from "@/pages/EarnPageWizardPage";

export function Router(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/showcase" element={<EarnPageDev />} />
        <Route path="/tac" element={<EarnPageTac />} />
        <Route path="/wizard" element={<EarnPageWizardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
