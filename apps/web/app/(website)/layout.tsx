import type { Metadata } from "next";
import "../globals.css";
import { Header } from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";

export const metadata: Metadata = {
  title: "Active Club | Play with Technology",
  description:
    "アクティ部はテクノロジーを使ってさまざまなものを形作る技術者の集まりです。",
  metadataBase: new URL("https://activeclub.jp"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">
            {children}
            {(await draftMode()).isEnabled && <VisualEditing />}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
