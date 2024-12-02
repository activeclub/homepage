"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AlignLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Bot, FileText, MessageCircleQuestion } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSelectedLayoutSegment } from "next/navigation";

const NAV_LIST = [
  { label: "Blog", path: "/blog", icon: FileText },
  { label: "About", path: "/about", icon: Bot },
  { label: "Contact", path: "/contact", icon: MessageCircleQuestion },
];

export function Header() {
  const segment = useSelectedLayoutSegment();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="flex z-50 justify-center sticky top-0 border-b px-2 lg:px-8 bg-background">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-3 text-primary">
            <img src="/images/logo.png" className="h-6 lg:h-10" />
          </Link>
        </div>
        <div className="flex items-center space-x-5 md:space-x-6">
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
            variant="ghost"
            className="p-0 text-primary hover:bg-transparent hover:text-primary md:hidden"
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
