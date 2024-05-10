import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { FaUserLock } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { BsChatHeartFill } from "react-icons/bs";
import logo1 from "@/public/logo1.jpg";


export default function Home() {
  const services = [
    {
      id: 1,
      image: <FaUserLock size="3em" />,
      title: "Sign up",
      description: "Create an account and manage your profiles",
      alt: "signup",
    },
    {
      id: 2,
      image: <FaUserFriends size="3em" />,
      title: "Connect",
      description: "Connect with your favorite people and get to know them",
      alt: "connect",
    },
    {
      id: 3,
      image: <BsChatHeartFill size="3em" />,
      title: "Interact",
      description: "Interact with your matches and get to know them",
      alt: "interact",
    },
  ];

  interface Testimonial {
    img: StaticImageData;
    quote: string;
    name: string;
    role: string;
  }

  return (
    <div className="flex flex-col ">
      <Header />
      <div className="mt-[84px] flex flex-col gap-10">
        <div className="px-4  py-6 sm:px-6 lg:px-8 flex justify-between items-center gap-5 sm:gap-0 flex-col-reverse sm:flex-row">
          <div className="flex flex-col gap-3">
            <div className="font-bold text-3xl">
              Find Your Perfect Match with Milan Sathi
            </div>
            <Button variant="outline" className="px-10 w-36 text-black">
              Sign up
            </Button>
          </div>

          <Image
            src="/couple.svg"
            className="lottie"
            height="500"
            width="500"
            alt="dede"
          />
        </div>

        <div className="px-4  py-6 sm:px-6 lg:px-8 flex justify-between items-center gap-5 sm:gap-0  flex-col border-t">
          <p className="font-bold text-3xl">Building Meaningful Connections</p>
          <div className="flex flex-col sm:flex-row gap-5">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex flex-col min-h-60 gap-3 justify-center items-center shadow-3xl border-0 border-white rounded-3xl p-5"
              >
                <div className="text-[#FF0000]">{service.image}</div>
                <div className="font-bold text-3xl">{service.title}</div>
                <div className="text-center">{service.description}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-4  py-6 sm:px-6 lg:px-8 flex justify-between items-center gap-5 sm:gap-0  flex-col border-t">
          <p className="font-bold text-3xl">Building Meaningful Connections</p>
          <div className="flex flex-col sm:flex-row gap-5">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex flex-col min-h-60 gap-3 justify-center items-center shadow-3xl border-0 border-white rounded-3xl p-5"
              >
                <div className="text-[#FF0000]">{service.image}</div>
                <div className="font-bold text-3xl">{service.title}</div>
                <div className="text-center">{service.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
