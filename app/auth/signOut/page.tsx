"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { plantCookies } from "@/utils/auth";
import { Loader } from "lucide-react";
import { NextResponse } from "next/server";

export default function SignOutPage() {
  const { status } = useSession();
  const router = useRouter();

  // 允许接入方服务端访问
  const res = NextResponse.next();
  res.headers.set(
    "Access-Control-Allow-Origin",
    `https://${
      process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "" : "pre-"
    }blog.alpha-rank.com`
  );
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  useEffect(() => {
    if (status === "authenticated") {
      // 登出并清除登录态
      plantCookies("").then(() => {
        signOut();
      });
    } else if (status === "unauthenticated") {
      // 登录
      router.replace(`/${location.search}`);
    }
  }, [router, status]);

  return (
    <main className="h-full flex justify-center items-center w-full">
      <Loader size={60} className="text-primary animate-spin" />
    </main>
  );
}
