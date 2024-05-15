"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { loginActions } from "@/store/loginSlice";
import Link from "next/link";
import z from "zod";
import axios from "axios";
import Loading from "@/app/loading";
import { toast } from "sonner";
import { signinFormSchema } from "@/lib/validations/form";
import { useAppDispatch } from "@/store/hooks";

export default function LogInForm({ setRequestSuccess }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  let validatedData: any;
  const validateForm = () => {
    try {
      const formData = {
        email,
        password,
      };
      validatedData = signinFormSchema.parse(formData);
      setEmailError("");
      setPasswordError("");
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          switch (path) {
            case "email":
              setEmailError(err.message);
              break;
            case "password":
              setPasswordError(err.message);
              break;
            default:
              break;
          }
        });
      } else {
        toast.error("An unexpected error occurred.");
      }
      return false;
    }
  };
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsLoading(true);
        const response = await axios.post(`/api/customer-login`, validatedData);
        if (response.data.status && response.data.data !== undefined) {
          setRequestSuccess(true);
          dispatch(loginActions.addToStore(response.data.data));
          toast.success("Login successful.");
        } else {
          toast.error("Invalid credentials");
        }
      } catch (error: any) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast(error.response.data.error);
        } else {
          toast("An error occurred. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <form onSubmit={handleSignIn} className="flex gap-5 flex-col ">
      <div>
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {emailError && (
          <span className="text-red-color/75 text-sm">{emailError}</span>
        )}
      </div>
      <div>
        <Input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {passwordError && (
          <span className="text-red-color/75 text-sm">{passwordError}</span>
        )}
      </div>
      <Button
        variant="default"
        onClick={handleSignIn}
        disabled={isLoading}
        className="px-10 mt-2 flex-1 bg-red-color/50 hover:bg-red-color/45 text-white"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <Loading /> <p>Logging in</p>
          </div>
        ) : (
          "Log in"
        )}
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
