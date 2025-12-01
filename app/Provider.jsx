// app/Provider.jsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Provider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
