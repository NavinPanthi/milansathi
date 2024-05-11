"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
export default function LogInForm() {
  const handleLogIn = () => {};
  return (
    <form onSubmit={handleLogIn} className="flex gap-5 flex-col ">
      <Input type="email" className="" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Button
        variant="default"
        className="px-10 mt-2 flex-1 bg-red-color/50 hover:bg-red-color/45 text-white"
      >
        Login
      </Button>
      <div className="flex items-center space-x-2 ">
        <Checkbox id="remember" />
        <label
          htmlFor="remember"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember me
        </label>
      </div>
      <div className="bg-body-color h-[2px]"></div>
      <div className="flex flex-row justify-between text-sm">
        <div>Dont have an account ?</div>
        <Link href="/auth/sign-up">
          <u>Create one</u>
        </Link>
      </div>
    </form>
  );
}
