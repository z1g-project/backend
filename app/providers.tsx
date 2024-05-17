"use client";
import type { Session as AuthSession } from "next-auth";
import { SessionProvider } from "next-auth/react";

export function Session({
  children,
  session,
}: {
  children: React.ReactNode;
  session: AuthSession | null;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
