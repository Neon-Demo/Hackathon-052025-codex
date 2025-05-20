"use client";

import { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface MainLayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export default function MainLayout({
  children,
  requireAuth = false,
}: MainLayoutProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // If the page requires authentication and the user is not authenticated
    if (requireAuth && status === "unauthenticated") {
      router.push(`/login?callbackUrl=${pathname}`);
    }
  }, [requireAuth, status, router, pathname]);

  // Show loading state while checking authentication
  if (requireAuth && status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && status === "unauthenticated") {
    return null; // We're redirecting, don't render anything
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}