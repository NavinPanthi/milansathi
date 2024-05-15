"use client";

import { HiOutlineArrowLeft } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function Notifications() {
  const router = useRouter();

  return (
    <div className="flex items-center h-screen justify-center">
      <div className="bg-white fixed h-14 p-1 flex w-full top-0 items-center px-3">
        <div
          onClick={() => router.back()}
          className="size-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 cursor-pointer"
        >
          <HiOutlineArrowLeft size="1em" />
        </div>
        <p className="font-semibold absolute left-1/2 transform -translate-x-1/2  text-sectext">
          <span>Saved Address</span>
        </p>
      </div>
      <div>You have no saved address.</div>
    </div>
  );
}
