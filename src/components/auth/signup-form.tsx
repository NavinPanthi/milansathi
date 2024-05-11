"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { MatrimonialDropdown } from "./matrimonial-dropdown";
type User = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  age: string;
};
export default function SignUpForm() {
  const [maritalStatusId, setMaritalStatusId] = useState(0);
  const handleSignUp = () => {};
  return (
    <div onSubmit={handleSignUp} className="flex gap-3 flex-col ">
      <Input type="text" className="" placeholder="First name" />
      <Input type="text" placeholder="Last name" />

      <MatrimonialDropdown id={maritalStatusId} />
      <div className="bg-body-color h-[2px]"></div>
      <Button
        variant="default"
        className="px-10 mt-2 flex-1 bg-red-color/50 hover:bg-red-color/45 text-white"
      >
        Next
      </Button>
    </div>
  );
}
