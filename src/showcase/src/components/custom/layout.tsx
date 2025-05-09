import { AppSidebar } from "@/components/custom/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { Header } from "./header";

export default function Layout(): React.ReactElement {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative w-full">
        <SidebarTrigger className="absolute top-2 left-2" />
        <Header />
        <div className="flex justify-center w-full h-full p-6 pl-12">
          <div className="w-full max-w-[700px] h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
