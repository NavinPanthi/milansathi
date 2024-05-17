"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
export default function Home() {
  const router = useRouter();
  const access_token = useAppSelector(
    (state: any) => state.login.loginData.token.access_token
  );
  useEffect(() => {
    if (access_token !== undefined) {
      router.push("/dashboard");
    } else {
      router.push("/home");
    }
  }, [access_token]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
