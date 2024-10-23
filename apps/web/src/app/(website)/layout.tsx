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
  const { isEnabled } = await draftMode();

  return (
    <html lang="en">
      <body className="min-h-dvh flex flex-col">
        {isEnabled && (
          <a
            className="fixed right-0 bottom-0 bg-blue-500 text-white p-4 m-4"
            href="/api/draft-mode/disable"
          >
            Disable preview mode
          </a>
        )}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">
            {children}
            {isEnabled && <VisualEditing />}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
