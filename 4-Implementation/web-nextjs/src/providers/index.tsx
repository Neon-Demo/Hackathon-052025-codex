"use client";

import { ReactNode } from "react";
import AuthProvider from "./auth-provider";
import { ThemeProvider } from "./theme-provider";
import { MockApiProvider } from "./mock-api-provider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="system">
        <MockApiProvider>
          {children}
        </MockApiProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}