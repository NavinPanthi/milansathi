import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaUserLock } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { BsChatHeartFill } from "react-icons/bs";
import FancyTestimonialsSliderPage from "@/components/home/testimonial";
import Contact from "@/components/home/contact";
import Link from "next/link";
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

  return (
    <div className="flex flex-col ">
      <Header />
      <div className="mt-[84px] flex flex-col gap-10">
        <div className="px-4 py-6 sm:px-12 mx-2 my-2 sm:my-10 lg:px-8 flex justify-between items-center gap-5 md:gap-0 flex-col-reverse md:flex-row">
          <div className="flex flex-col gap-3 ">
            <div className="font-bold text-3xl">
              Find Your Perfect Match with Milan Sathi
            </div>
            <div className="md:mr-32">
              Milan Sathi is the premier destination for finding your ideal life
              partner. With our comprehensive matchmaking services , your search
              for love ends here.
            </div>
            <Button variant="outline" className="px-10 w-36 text-black">
              <Link href="/auth/sign-up">Get Started</Link>
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

        <div className="px-4  py-6 sm:px-6 lg:px-8   flex justify-between items-center  sm:gap-0  flex-col ">
          <p className="font-bold text-3xl mt-5 mb-2 border-b border-red-color/50">
            Building Meaningful Connections
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex flex-col min-h-64 gap-3 justify-center items-center shadow-3xl border-0 border-white rounded-3xl p-5"
              >
                <div className="text-red-color/75">{service.image}</div>
                <div className="font-bold text-3xl">{service.title}</div>
                <div className="text-center">{service.description}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-4 py-6 sm:px-12 mx-2 my-2 sm:my-10 lg:px-8 flex justify-between items-center gap-5 sm:gap-0 flex-col ">
          <p className="font-bold text-3xl mb-10 border-b border-red-color/50">
            About Us
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            {" "}
            <Image
              src="/about-us.jpeg"
              className="lottie person-1 rounded-3xl size-80 lg:size-[450px]"
              height="450"
              width="450"
              alt="dede"
            />
            <div className="flex flex-col gap-3 ">
              <p>
                Welcome to Milan Sathi, where we believe that everyone deserves
                a chance at finding lifelong happiness and companionship.
              </p>
              <div className="flex flex-col">
                <p className="mb-4 text-xl font-semibold">Why choose us?</p>
                <p className="mb-4">
                  <span className="font-semibold">Safety First:</span> We
                  prioritize the safety and security of our members above all
                  else. Our robust verification processes and stringent privacy
                  measures ensure that your personal information remains
                  confidential.
                </p>

                <p className="mb-4">
                  <span className="font-semibold">Diverse Community:</span> We
                  celebrate diversity in all its forms. Our platform welcomes
                  individuals from all walks of life, regardless of background,
                  ethnicity, or orientation.
                </p>
                <p className="mb-4">
                  <span className="font-semibold">
                    Personalized Experience:
                  </span>{" "}
                  We understand that each person's journey is unique. That's why
                  we offer personalized matchmaking services and tailored
                  recommendations to help you find your ideal partner.
                </p>
              </div>

              <p>
                Join us at{" "}
                <Link
                  className="font-bold text-red-color/75"
                  href="/auth/sign-up"
                >
                  Milan Sathi
                </Link>{" "}
                and embark on the journey to finding your happily ever after.
                Your perfect match may be just a click away.
              </p>
            </div>
          </div>
        </div>
        <div className="px-4 pt-8 sm:px-6 lg:px-8  flex justify-between items-center gap-5 sm:gap-0 flex-col ">
          <p className="font-bold text-3xl mb-10 border-b border-red-color/50">
            Our Testimonials
          </p>
          <FancyTestimonialsSliderPage />
        </div>
        <div className="px-4 pt-8 sm:px-6 lg:px-8  flex justify-between items-center gap-5 sm:gap-0 flex-col ">
          <p className="font-bold text-3xl mb-10 border-b border-red-color/50">
            Contact Us
          </p>
          <Contact />
        </div>
      </div>

      <Footer />
    </div>
  );
}
