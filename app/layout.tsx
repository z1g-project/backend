import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import { Session } from "./providers";
import { ThemeProvider } from "next-themes";
import { auth } from "@/auth";
import { GeistSans } from "geist/font/sans";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | z1g Project",
    default: "z1g Project",
  },
  metadataBase:
    process.env.NODE_ENV === "development"
      ? new URL(process.env.LOCAL_URL ?? "http://localhost:3000")
      : new URL(`https://z1g-project.vercel.app`),
};

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body>
        <Session {...{ session }}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            themes={["light", "dark"]}
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </Session>
      </body>
    </html>
  );
}
