"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlignLeft, Moon, Sun, X } from "lucide-react";
import { Bot, FileText, MessageCircleQuestion } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import React, { useState } from "react";

const NAV_LIST = [
  { label: "Blog", path: "/blog", icon: FileText },
  { label: "About", path: "/about", icon: Bot },
  { label: "Contact", path: "/contact", icon: MessageCircleQuestion },
];

export function Header() {
  const segment = useSelectedLayoutSegment();
  const { setTheme, resolvedTheme } = useTheme();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="flex z-50 justify-center sticky top-0 border-b px-2 lg:px-8 bg-background">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-3 text-primary">
            <img src="/images/logo.png" className="h-6 lg:h-10" alt="Logo" />
          </Link>
        </div>
        <div className="flex items-center space-x-4 md:space-x-6">
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LIST.map((item) => (
              <Link
                key={item.label + item.path}
                href={item.path}
                className={cn(
                  " font-normal hover:text-primary transition-colors flex items-center",
                  `/${segment}` === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="mr-2 size-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              resolvedTheme === "light" ? setTheme("dark") : setTheme("light");
            }}
          >
            <Sun
              className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
              onClick={() => setTheme("dark")}
            />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            variant="outline"
            className="md:hidden"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <>
              {isMobileOpen ? (
                <X className="size-6" />
              ) : (
                <AlignLeft className="size-6" />
              )}
              <span className="sr-only">Menu</span>
            </>
          </Button>
        </div>
      </div>
      {isMobileOpen && (
        <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto py-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
          <div className="relative z-20 grid gap-6 rounded-md border border-secondary/80 bg-background p-4 text-popover-foreground shadow-md">
            {NAV_LIST.map((item) => (
              <Link
                key={item.label + item.path}
                href={item.path}
                className={cn(
                  "flex items-center transition-colors hover:text-primary",
                  `/${segment}` === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMobileOpen(false)}
              >
                <item.icon className="mr-2 size-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
