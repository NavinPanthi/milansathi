"use client";
import { useAppSelector } from "@/store/hooks";

export function getUserName(): {
  firstInitial: string;
  lastInitial: string;
  firstName: string;
  lastName: string;
} {
  let user: any;
  let firstInitial = "";
  let lastInitial = "";

  const userName = useAppSelector((state: any) => {
    user = state.login.loginData?.user;
    const firstName = user.firstName || "";
    const lastName = user.lastName || ""; // Assuming lastname is the property name for the last name
    firstInitial = firstName.charAt(0).toUpperCase();
    lastInitial = lastName.charAt(0).toUpperCase();
    const userName = { firstInitial, lastInitial, firstName, lastName };
    return userName;
  });
  return userName;
}
