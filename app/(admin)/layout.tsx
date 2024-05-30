import { auth } from "@/auth";
import Navigation from "@/components/navbar";
import type { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth()
  return (
    <main>
      <Navigation session={session} />
      <div className="mt-16 min-h-full">{children}</div>
    </main>
  );
}
export const runtime = "edge";
