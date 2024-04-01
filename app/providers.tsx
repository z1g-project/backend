"use client";
import { SessionProvider } from "next-auth/react";
import { Session as AuthSession } from "next-auth";

export function Session({
  children,
  session,
}: {
  children: React.ReactNode;
  session: AuthSession | null;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
