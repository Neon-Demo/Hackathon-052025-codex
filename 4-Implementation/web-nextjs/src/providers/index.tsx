"use client";

import { ReactNode } from "react";
import AuthProvider from "./auth-provider";
import { ThemeProvider } from "./theme-provider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="system">
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}