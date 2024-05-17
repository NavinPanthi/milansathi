"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserFriends } from "react-icons/fa";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { PiListHeartFill } from "react-icons/pi";
import Image from "next/image";
import { useState } from "react";
import { getUserName } from "@/lib/getUserName";
import { useAppSelector } from "@/store/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
let userI: any;
const NavItem = ({ userI, href, endpoint, icon, text }: any) => {
  const [hasError, setHasError] = useState(false);
  const user = getUserName();
  const handleImageError = () => {
    setHasError(true);
  };

  const classNameForAnchor = `flex flex-col items-center text-[13px] gap-1 ${
    endpoint === href.substring(1) ? "text-red-color/75" : "text-lightgray"
  }`;

  return (
    <li>
      <Link href={href} className={classNameForAnchor}>
        {href === "/profile" ? (
          // hasError ? (
          //   <div
          //     className={`h-[2.5em] w-[2.5em] rounded-full bg-bg-header/75    flex items-center justify-center ${
          //       endpoint === href.substring(1)
          //         ? "border border-red-color/75"
          //         : "border border-white"
          //     }`}
          //   >
          //     {user?.firstInitial} {user?.lastInitial}
          //   </div>
          // ) : (
          //   <Image
          //     src={icon}
          //     height="24"
          //     width="24"
          //     alt=""
          //     className={`h-[2.5em] w-[2.5em] object-fit rounded-full  ${
          //       endpoint === href.substring(1)
          //         ? "border border-red-color/75"
          //         : "border border-white"
          //     }`}
          //     onError={handleImageError}
          //   />
          // )
          <Avatar
            className={`h-[2.5em] w-[2.5em] object-fit rounded-full  ${
              endpoint === href.substring(1)
                ? "border border-red-color/75"
                : "border border-white"
            }`}
          >
            <AvatarImage src={icon} />
            <AvatarFallback className="gap-1">
              <span>{userI?.firstInitial}</span>{" "}
              <span>{userI?.lastInitial}</span>
            </AvatarFallback>
          </Avatar>
        ) : (
          <span className="size-[2.5em]">{icon}</span>
        )}

        <p className="">{text}</p>
      </Link>
    </li>
  );
};

const Navbar = () => {
  const pathName = usePathname();
  const endpoint = pathName.substring(1); // Remove the leading slash
  userI = useAppSelector((state: any) => state.login.loginData.user);
  const navbar = [
    {
      id: 1,
      href: "/dashboard",
      icon: <FaUserFriends size="2.5em" />,
      text: "Discover",
    },
    {
      id: 2,
      href: "/search",
      icon: <BsFillSearchHeartFill size="2.5em" />,
      text: "Search",
    },
    {
      id: 3,
      href: "/preferences",
      icon: <PiListHeartFill size="2.5em" />,
      text: "Preferences",
    },
    {
      id: 4,
      href: "/profile",
      icon: `http://localhost:8000/images/${userI?.image}`,
      text: "Profile",
    },
  ];

  return (
    <nav>
      <ul className="flex z-1 bg-black flex-row justify-around items-center bottom-0 border-t-2 border-t-red-color/10 h-20 fixed w-full bg-navbarbg ">
        {navbar.map((item: any) => (
          <NavItem
            userI={userI}
            key={item.id}
            href={item.href}
            endpoint={endpoint}
            icon={item.icon}
            text={item.text}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
