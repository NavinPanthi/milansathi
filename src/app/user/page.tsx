"use client";
import { useState, useEffect } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { loginActions } from "@/store/loginSlice";
import { calculateAge } from "@/lib/calculateAge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
export default function MyDetails() {
  const [imgFile, setImgFile] = useState<any>();
  const [userDetails, setUserDetails] = useState<any>({});
  const router = useRouter();
  const idParams = useSearchParams();
  const userId = idParams.get("id");
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
  const userToken = useAppSelector(
    (state: any) => state.login.loginData?.token.access_token
  );
  const dispatch = useAppDispatch();
  const userT = useAppSelector((state: any) => state.login.loginData.token);
  const userRedux = useAppSelector((state: any) => state.login.loginData?.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (response.data.status) {
          setUserDetails(response.data.data.user);
        }
      } catch (error: any) {
        toast.error("Something wrong");
      }
    };
    getUser();
  }, []);

  return (
    <div className="overflow-y-hidden no-scrollbar pt-2 px-3 sm:pt-4 sm:px-6">
      <div className=" fixed h-16 sm:h-[72px]   flex w-full top-0 items-center px-12  bg-body-color left-0 z-10 ">
        <div
          onClick={() => router.back()}
          className="size-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 cursor-pointer"
        >
          <HiOutlineArrowLeft size="1em" />
        </div>
        <p className="font-semibold absolute left-1/2 transform -translate-x-1/2  text-sectext">
          <span>{userDetails?.firstName}</span>
        </p>
      </div>

      <div className="sm:px-3 flex-col mt-20 mb-24  w-full ">
        <div className="grid grid-cols-1 md:grid-cols-3  justify-center">
          <div className="my-2 flex flex-col justify-center items-center md:fixed   gap-3 md:min-w-40">
            <Avatar className="w-44 h-44 border">
              <AvatarImage
                src={
                  imgFile
                    ? imgFile
                    : `http://localhost:8000/images/${userDetails?.image}`
                }
              />
              <AvatarFallback className="gap-1">
                <span>{firstInitial}</span> <span>{lastInitial}</span>
              </AvatarFallback>
            </Avatar>
            <div className="flex items-start justify-center flex-col ">
              <div className="flex items-start justify-center flex-col gap-2">
                <div className=" flex gap-3 flex-col items-center">
                  <div className="flex items-center gap-4">
                    <p className="font-semibold ">
                      {userDetails?.firstName} {userDetails?.lastName}
                    </p>
                    <div className="flex items-center justify-center text-sky-800  px-4  bg-sky-100  h-[30px] rounded-xl">
                      <p className="font-extralight text-xs tracking-wide">
                        {userDetails?.maritalStatus?.title}
                      </p>
                    </div>
                  </div>

                  <div className="h-[1px] my-2 w-full bg-white/25"></div>

                  <p className="font-light text-xs tracking-wide max-w-48 gap-1 flex">
                    {userDetails?.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed bg-white/50 md:ml-60 md:h-[76vh] w-[1px]"></div>
          <div className="col-span-2  w-full md:ml-[280px] lg:ml-[300px] ml-0 top- no-scrollbar overflow-y-scroll ">
            <div className=" flex flex-col gap-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2 sm:gap-3 ">
                <div className="col-span-2 font-bold">Basic details</div>
                <div className="flex items-center text-sm sm:text-md">
                  Gender :
                </div>
                <div>{userDetails?.gender}</div>
                <div className="flex items-center text-sm ">Age :</div>
                {calculateAge(userDetails?.dateOfBirth)} yrs old
              </div>
              <div className=" bg-white/25 w-full h-[1px]"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2 sm:gap-3 ">
                <div className="col-span-2 font-bold">Diversity details</div>
                <div className="flex items-center text-sm sm:text-md">
                  Country :
                </div>
                <div>{userDetails?.diversity?.country?.title}</div>

                <div className="flex items-center text-sm ">Religion :</div>
                <div>{userDetails?.diversity?.religion?.title}</div>

                <div className="flex items-center text-sm ">Community :</div>
                <div>{userDetails?.diversity?.community?.title}</div>

                <div className="flex items-center text-sm ">
                  Mother Tongue :
                </div>
                <div>{userDetails?.diversity?.motherTongue?.title}</div>

                <div className="flex items-center text-sm ">City</div>
                <div>{userDetails?.diversity?.country?.title}</div>
              </div>
              <div className=" bg-white/25 w-full h-[1px]"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2 sm:gap-3 ">
                <div className="col-span-2">Additional details</div>
                <div className="flex items-center text-sm sm:text-md">
                  Astrology :
                </div>
                <div>{userDetails?.additionalDetail?.astrology?.title}</div>

                <div className="flex items-center text-sm sm:text-md">
                  Social media :
                </div>
                <div>{userDetails?.additionalDetail?.facebookProfileLink}</div>
                {/*                 
                <div className="w-full">
                  <img
                    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                    alt="Photo by Drew Beamer"
                    className="rounded-md  h-8 w-full"
                  />
                </div> */}
                <div className="flex items-center text-sm sm:text-md">
                  Contact number :
                </div>
                <div>{userDetails?.additionalDetail?.contactNumber}</div>
                {/* <div className="w-full">
                  <img
                    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                    alt="Photo by Drew Beamer"
                    className="rounded-md  w-full h-8"
                  />{" "}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed z-10 px-2 sm:px-6 h-[48px] bg-body-color/70 pb-0  flex items-center justify-center bottom-0 right-0 left-0 ">
        <Button
          variant="default"
          className="   h-[36px] w-full bg-red-color/75 hover:bg-red-color/50 text-white"
        >
          Connect
        </Button>
      </div>
    </div>
  );
}
