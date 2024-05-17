"use client";
import Link from "next/link";
import Image from "next/image";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { useEffect, useState } from "react";
const Header = ({ setEffectMargin }: any) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isTop, setIsTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollPos > currentScrollPos) {
        setIsTop(false);
        //0
      } else {
        setIsTop(true);
        setEffectMargin(true);
        //-50px
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  return (
    <header
      className={`bg-bg-header  ${
        isTop ? "top-[-80px]" : "top-0"
      } top-navbar fixed  left-0  shadow-lg text-text-color  w-full z-10 `}
    >
      <div className="mx-auto flex  items-center  px-4 py-4 sm:px-6  justify-between">
        <Link href="/dashboard">
          <Image
            src="/logo1.png"
            className="logo1"
            alt=""
            height="150"
            width="150"
          />
        </Link>
        <Link href="/notifications" className="px-10 text-lg relative">
          <BsFillBookmarkHeartFill size="1.4em" />
          <div className="absolute text-white text-xs bg-red-color/80 top-[-7px] right-7 font-bold rounded-full z-10 size-5 flex items-center justify-center">
            2
          </div>
        </Link>
      </div>
    </header>
  );
};
export default Header;
