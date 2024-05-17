"use client";
import { useState, useReducer, useEffect } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch } from "@/store/hooks";
import { loginActions } from "@/store/loginSlice";
export default function MyDetails() {
  const [file, setFile] = useState();
  const [imgFile, setImgFile] = useState<any>();
  const [userDetails, setUserDetails] = useState<any>([]);
  const router = useRouter();
  let firstInitial = "";
  let lastInitial = "";
  let user: any;
  const dispatch = useAppDispatch();
  const userT = useAppSelector((state: any) => state.login.loginData.token);
  const userRedux = useAppSelector((state: any) => state.login.loginData?.user);
  const userToken = userT?.access_token;
  const userName = useAppSelector((state: any) => {
    user = state.login.loginData?.user;
    const firstName = user.firstName || "";
    const lastName = user.lastName || ""; // Assuming lastname is the property name for the last name
    firstInitial = firstName.charAt(0).toUpperCase();
    lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstName} ${lastName}`;
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (response.data.status) {
          setUserDetails(response.data.data.users);
        }
      } catch (error: any) {
        toast.error("Error fetching matches.");
      }
    };
    getUser();
  }, [userToken]);
  return (
    <div className="overflow-y-hidden no-scrollbar pt-2 px-3 sm:pt-4 sm:px-6">
      <div className=" fixed h-16 sm:h-[72px]   flex w-full top-0 items-center px-3  ">
        <div
          onClick={() => router.back()}
          className="size-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 cursor-pointer"
        >
          <HiOutlineArrowLeft size="1em" />
        </div>
        <p className="font-semibold absolute left-1/2 transform -translate-x-1/2  text-sectext">
          <span>Notifications</span>
        </p>
      </div>

      <div className="px-3 flex-col mt-20 mb-24  w-full ">
        <div className="my-2 flex flex-col    gap-3 ">
          {userDetails && userDetails.length > 0 ? (
            userDetails.map((user: any) =>
              user.id === 7 ? <User key={user.id} user={user} /> : null
            )
          ) : (
            <div>No user details available</div>
          )}
          {userDetails && userDetails.length > 0 ? (
            userDetails.map((user: any) =>
              user.id === 2 ? <User key={user.id} user={user} /> : null
            )
          ) : (
            <div>No user details available</div>
          )}
        </div>
      </div>
    </div>
  );
}

const User = ({ user }: any) => {
  return (
    <>
      <div
        key={user.id}
        className="flex flex-col lg:flex-row justify-between border-b w-full items-center border-b-white/10 text-white    gap-3 p-2 "
      >
        <div className="flex row  justify-center items-center gap-4">
          <Avatar className="border h-20 w-20  flex items-center justify-center  rounded-full ">
            <AvatarImage
              className="h-20 w-20 rounded-full"
              src={`http://localhost:8000/images/${user?.image}`}
            />
            <AvatarFallback className="gap-1 ">
              <span>{user?.firstName.charAt(0).toUpperCase()}</span>
              <span>{user?.lastName.charAt(0).toUpperCase()}</span>
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-row items-end gap-1 justify-between">
            <p className="font-semibold text-xl">
              {user?.firstName} {user?.lastName}
            </p>
            {user.id === 7 ? (
              <>has sent you a connection request.</>
            ) : (
              <>has accepted you a connection request.</>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-4 ">
          {user.id === 7 ? (
            <>
              {" "}
              <Button className="w-40  text-white" variant="default">
                Decline
              </Button>
              <Button
                variant="default"
                className=" !cursor-pointer h-full w-40 bg-red-color/50 hover:bg-red-color/45 text-white"
              >
                Accept
              </Button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
