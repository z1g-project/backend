import type { ReactNode } from "react";
import Navigation from "@/components/navbar";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main>
      <Navigation />
      <div className="mt-16 min-h-full">{children}</div>
    </main>
  );
}
export const runtime = "edge";
