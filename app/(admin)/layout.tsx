import type { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Navigation from "@/components/navbar";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!session) {
    return redirect("/auth/login");
  }
  return (
    <main>
      <Navigation />
      <div className="mt-16 min-h-full">{children}</div>
    </main>
  );
}
export const runtime = "edge";
