// app/providers.js
"use client";

import type { Session } from "next-auth";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export default function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session;
}) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}
