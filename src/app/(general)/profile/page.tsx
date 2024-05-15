"use client";
import { useAppSelector } from "@/store/hooks";
import { HiOutlineUser } from "react-icons/hi";
import { IoLockClosedOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { IoHelpCircleOutline } from "react-icons/io5";
import { PiInfo } from "react-icons/pi";
import { HiOutlineUserRemove } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import LogOut from "@/components/modals/LogOut";
import { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
  let firstInitial = "";
  let lastInitial = "";
  let user: any;
  const userName = useAppSelector((state: any) => {
    user = state.login.loginData?.user;
    const firstName = user.firstName || "";
    const lastName = user.lastName || ""; // Assuming lastname is the property name for the last name
    firstInitial = firstName.charAt(0).toUpperCase();
    lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstName} ${lastName}`;
  });

  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
  const userImg = useAppSelector(
    (state: any) => state.login.loginData.user.image
  );
  const handleOpen = () => {
    setIsDeleteAccountModalOpen(true);
  };
  const handleClose = () => {
    setIsDeleteAccountModalOpen(false);
  };
  const handleLogOutModalOpen = () => {
    setIsLogOutModalOpen(true);
  };
  const handleLogOutModalClose = () => {
    setIsLogOutModalOpen(false);
  };

  return (
    <>
      <div
        className={`${
          isDeleteAccountModalOpen || isLogOutModalOpen
            ? " pointer-events-none overflow-hidden h-screen"
            : "pointer-events-auto"
        }  pb-8`}
      >
        <div className="my-2 flex flex-col items-center justify-center gap-3 ">
          <Avatar className="w-28 h-28 border">
            <AvatarImage src={userImg} />
            <AvatarFallback className="gap-1">
              <span>{firstInitial}</span> <span>{lastInitial}</span>
            </AvatarFallback>
          </Avatar>

          <div className=" flex gap-3 flex-col items-center">
            <div className="flex items-center gap-4">
              <p className="font-semibold ">{userName}</p>
              <div className="flex items-center justify-center text-sky-800  px-4  bg-sky-100  h-[30px] rounded-xl">
                <p className="font-extralight text-xs tracking-wide">
                  {user.maritalStatus.title}
                </p>
              </div>
            </div>
            <p className="font-light text-xs tracking-wide  gap-1 flex">
              {user.diversity.country.title},
              <span>{user.diversity.city.title}</span>
            </p>
          </div>
        </div>
        <div className="mt-10 mb-8 border-t border-t-white/25">
          <ul className="flex flex-col cursor-pointer">
            <Link
              href="/profile/my-details"
              className="py-6 px-2 flex items-center text-sm font-semibold hover:bg-gray-500/10"
            >
              <HiOutlineUser size="1.5em" />
              <p className="ml-6">My Details</p>
              <MdOutlineKeyboardArrowRight size="1.5em" className="ml-auto" />
            </Link>
            <Link
              href="/profile/change-password"
              className="py-6  px-2   flex items-center text-sm font-semibold hover:bg-gray-500/10"
            >
              <IoLockClosedOutline size="1.5em" />
              <p className="ml-6">Change Password</p>
              <MdOutlineKeyboardArrowRight size="1.5em" className="ml-auto" />
            </Link>

            <Link
              href="/get-help"
              className="py-6 px-2  flex items-center text-sm font-semibold hover:bg-gray-500/10"
            >
              <IoHelpCircleOutline size="1.5em" />
              <p className="ml-6">Get Help</p>
              <MdOutlineKeyboardArrowRight size="1.5em" className="ml-auto" />
            </Link>
            <Link
              href="/about-us"
              className="py-6 px-2  flex items-center text-sm font-semibold hover:bg-gray-500/10"
            >
              <PiInfo size="1.5em" />
              <p className="ml-6">About us</p>
              <MdOutlineKeyboardArrowRight size="1.5em" className="ml-auto" />
            </Link>

            <li
              onClick={handleLogOutModalOpen}
              className="py-6 px-2 text-red-color/75  flex items-center text-sm font-semibold hover:bg-gray-500/10 "
            >
              <IoLogOutOutline size="1.5em" />
              <p className="ml-6 ">Log Out</p>
            </li>
          </ul>
        </div>
      </div>
      {isLogOutModalOpen && <LogOut handleClose={handleLogOutModalClose} />}
    </>
  );
}
