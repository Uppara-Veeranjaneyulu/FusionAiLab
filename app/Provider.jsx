// app/Provider.jsx
"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppSidebar } from "./_components/AppSidebar";
import AppHeader from "./_components/AppHeader";

export default function Provider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <SidebarProvider>
        <AppSidebar />


        <div className="w-full">
          <AppHeader />{children}</div>
      </SidebarProvider>

    </NextThemesProvider>
  );
}
