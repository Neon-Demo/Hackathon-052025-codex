"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "@/providers/theme-provider";
import { Menu, X, Sun, Moon, LogOut, User, Settings, Home, Clipboard, BarChart, Box } from "lucide-react";
import Container from "../ui/container";
import Button from "../ui/button";

export default function Header() {
  const { data: session } = useSession();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: <Home size={18} /> },
    { href: "/projects", label: "Projects", icon: <Box size={18} /> },
    { href: "/inspections", label: "Inspections", icon: <Clipboard size={18} /> },
    { href: "/reports", label: "Reports", icon: <BarChart size={18} /> },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm dark:bg-gray-800 backdrop-blur supports-backdrop-blur:bg-white/80 dark:supports-backdrop-blur:bg-gray-800/80">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary dark:text-white">
                GMS
              </span>
            </Link>
            <nav className="hidden items-center space-x-1 md:flex">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(href)
                      ? "text-primary dark:text-primary-light"
                      : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {session ? (
              <div className="hidden md:flex items-center gap-3">
                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {session.user?.name}
                  </div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {session.user?.role || "User"}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => signOut()}
                  aria-label="Sign out"
                  rightIcon={<LogOut size={16} />}
                >
                  Sign out
                </Button>
              </div>
            ) : (
              <div className="hidden md:block">
                <Link href="/login">
                  <Button size="sm">
                    Sign in
                  </Button>
                </Link>
              </div>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-gray-900/50 dark:bg-black/50 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-800 shadow-lg p-6 transform transition duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-8">
              <Link 
                href="/" 
                className="flex items-center" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-xl font-bold text-primary dark:text-white">
                  GMS
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Close menu</span>
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-2">
              {navItems.map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium transition-colors ${
                    isActive(href)
                      ? "bg-gray-100 text-primary dark:bg-gray-700 dark:text-primary-light"
                      : "text-gray-700 hover:bg-gray-50 hover:text-primary dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {icon}
                  {label}
                </Link>
              ))}
            </nav>
            
            {session ? (
              <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Signed in as:
                  </div>
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    {session.user?.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {session.user?.email}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={18} />
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings size={18} />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut();
                    }}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-red-400"
                  >
                    <LogOut size={18} />
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                <Link 
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button fullWidth={true}>
                    Sign in
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}