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
  const [userDetails, setUserDetails] = useState<any>({});
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
  const handleImageChange = (e: any) => {
    const files = e.target.files[0];
    setFile(files);
    if (!files) return;
    const reader = new FileReader();
    // Define a callback function to execute once the file has been read
    reader.onload = () => {
      setImgFile(reader.result);
    };

    // Read the contents of the file as a data URL
    reader.readAsDataURL(files);
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${user?.id}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (response.data.status) {
          setUserDetails(response.data.data);
          const store = {
            user: response.data.data.user || userRedux,
            token: userT,
          };
          dispatch(loginActions.addToStore(store));
        }
      } catch (error: any) {
        toast.error("Something wrong");
      }
    };
    getUser();
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    const userId = user?.id || 0;

    formData.append("userId", userId);
    if (file !== undefined) {
      formData.append("image", file);
    }
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/users/update-profile`;

      const response = await axios.patch(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.data.status) {
        // setUserDetails(response.data.data);

        toast.success(response.data.message);
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessage = error.response.data.errors[0].msg;
        toast.error(errorMessage);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };
  return (
    <form method="post" encType="multipart/form-data">
      <div className="overflow-y-hidden no-scrollbar pt-2 px-3 sm:pt-4 sm:px-6">
        <div className=" fixed h-16 sm:h-[72px]   flex w-full top-0 items-center px-12  bg-body-color left-0 z-10 ">
          <div
            onClick={() => router.back()}
            className="size-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 cursor-pointer"
          >
            <HiOutlineArrowLeft size="1em" />
          </div>
          <p className="font-semibold absolute left-1/2 transform -translate-x-1/2  text-sectext">
            <span>My details</span>
          </p>
        </div>

        <div className="px-3 flex-col mt-20 mb-24  w-full ">
          <div className="my-2 flex flex-col  justify-center gap-3 ">
            <Avatar className="w-32 h-32 border">
              <AvatarImage
                src={
                  imgFile
                    ? imgFile
                    : `http://localhost:8000/images/${userDetails?.user?.image}`
                }
              />
              <AvatarFallback className="gap-1">
                <span>{firstInitial}</span> <span>{lastInitial}</span>
              </AvatarFallback>
            </Avatar>
            <div>
              <label
                htmlFor="upload"
                className="mt-4 text-sm font-light  cursor-pointer"
              >
                Change Photo
              </label>
              <input
                type="file"
                id="upload"
                accept="/image/*"
                name="image"
                hidden
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        <div className="fixed sm:px-6 bottom-4 right-0 left-0 ">
          <Button
            variant="default"
            onClick={handleSubmit}
            className="  h-full w-full bg-red-color/50 hover:bg-red-color/45 text-white"
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
