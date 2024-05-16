import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { auth } from "@/auth";
import { GeistSans } from "geist/font/sans";
import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: {
    template: "%s | z1g Project",
    default: "z1g Project",
  },
};

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            themes={["light", "dark"]}
            enableSystem
            disableTransitionOnChange
          >
            <Toaster richColors />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
