"use client";
import Image from "next/image";
import LogInForm from "@/components/auth/login-form";
import Footer from "@/components/home/footer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function SignIn() {
  const [requestSuccess, setRequestSuccess] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (requestSuccess) {
      router.push("/home");
    }
  }, [requestSuccess]);

  return (
    <>
      <div className="flex item-center  justify-center   min-h-[90vh] overflow-y-hidden ">
        <div className="  my-auto bg-transparent rounded-xl w-96 h-[450px] ">
          <Image
            src="/logo1.png"
            className="lottie rounded-t-xl"
            height="50"
            width="384"
            alt="dede"
          />
          <div className="p-4 py-6 bg-bg-header bg-opacity-50 rounded-b-xl">
            <LogInForm setRequestSuccess={setRequestSuccess} />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full ">
        <Footer />
      </div>
    </>
  );
}
