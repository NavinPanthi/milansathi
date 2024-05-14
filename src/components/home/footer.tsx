"use client";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import Link from "next/link";
import { toast } from "sonner";
const socialMediaIcons = [
  { name: "Facebook", icon: <FaFacebook size="1em" /> },
  { name: "Twitter", icon: <FaTwitter size="1em" /> },
  { name: "Instagram", icon: <FaInstagram size="1em" /> },
  { name: "Google", icon: <AiFillGoogleCircle size="1em" /> },
];

export default function Footer() {
  return (
    <footer className="shadow-lg bg-bg-header text-text-color flex flex-col items-center justify-center">
      <div className="text-black w-full flex mt-5 items-center justify-center flex-row">
        {socialMediaIcons.map((socialMedia, index) => (
          <Link
            href="#"
            key={index}
            className="size-6 rounded-full bg-white flex items-center justify-center mx-[6px]"
          >
            {socialMedia.icon}
          </Link>
        ))}
      </div>
      <div
        className="flex justify-center px-2 sm:px-6 py-4 items-center"
        onClick={() => {
          toast.success("Event has been created.");
        }}
      >
        Copyright &#169; 2022 | Designed By MilanSathi
      </div>
    </footer>
  );
}
