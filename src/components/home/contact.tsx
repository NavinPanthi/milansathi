import React from "react";
import { AiFillPhone } from "react-icons/ai";
import { IoLocation } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

export default function Contact() {
  return (
    <div className="w-full max-w-3xl mx-auto text-center min-h-80 ">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.7118970343577!2d84.01423218086045!3d28.216064513741063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39959686edbeb9bd%3A0x62fddd4b5201edfd!2sMahendra%20Pul%20Rd%2C%20Pokhara%2033700!5e0!3m2!1sen!2snp!4v1716136327534!5m2!1sen!2snp"
        className="w-full max-w-3xl mx-auto text-center min-h-80 border-2 border-indigo-100 rounded-xl mb-4"
      ></iframe>

      <div className="flex flex-wrap justify-between -m-1.5 mb-4">
        <div className="inline-flex flex-col justify-center whitespace-nowrap rounded-xl px-3 py-1.5 m-1.5 text-xs shadow-sm focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 bg-white hover:bg-indigo-100 text-slate-900 items-center cursor-pointer">
          <AiFillPhone className="font-bold h-4 w-4" />
          <p className="font-bold">Contact No</p>
          <p>9812345678</p>
        </div>
        <div className="inline-flex flex-col   justify-center whitespace-nowrap rounded-xl px-3 py-1.5 m-1.5 text-xs shadow-sm focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 bg-white hover:bg-indigo-100 text-slate-900 items-center cursor-pointer">
          <MdEmail className="font-bold h-4 w-4" />

          <p className="font-bold">Email</p>
          <p>hello@gmail.com</p>
        </div>
        <div className="inline-flex flex-col justify-center whitespace-nowrap rounded-xl px-3 py-1.5 m-1.5 text-xs shadow-sm focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 bg-white hover:bg-indigo-100 text-slate-900 items-center cursor-pointer">
          <IoLocation className="font-bold h-4 w-4" />
          <p className="font-bold">Location</p>
          <p>MahendraPul</p>
        </div>
      </div>
    </div>
  );
}
