import Image from "next/image";
import Footer from "@/components/home/footer";
import SignUpForm from "@/components/auth/signup-form";

export default function SignUp() {
  return (
    <>
      <div className="flex item-center  justify-center min-h-[88vh]   overflow-y-hidden ">
        <div className="  my-auto bg-transparent rounded-xl   w-[90%]">
          <div className="w-full bg-bg-header flex items-center justify-center">
            <Image
              src="/logo1.png"
              className="lottie  rounded-t-xl "
              height="50"
              width="300"
              alt="dede"
            />
          </div>
          <div className="p-4 py-4  bg-bg-header bg-opacity-50 rounded-b-xl">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full ">
        <Footer />
      </div>
    </>
  );
}
