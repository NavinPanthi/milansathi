"use client";
import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { MatrimonialDropdown } from "@/components/auth/matrimonial-dropdown";
import { GenderDropdown } from "@/components/auth/gender-dropdown";
import { CountryDropdown } from "@/components/auth/country-dropdown";
import { ReligionDropdown } from "@/components/auth/religion-dropdown";
import { CommunityDropdown } from "@/components/auth/community-dropdown";
import { MotherTongueDropdown } from "@/components/auth/mother-tongue-dropdown";
import { CityDropdown } from "@/components/auth/city-dropdown";
import { DobPicker } from "@/components/auth/dob-picker";

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
  const [maritalStatusId, setMaritalStatusId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [countryId, setCountryId] = useState(0);
  const [communityId, setCommunityId] = useState(0);
  const [motherTongueId, setMotherTongueId] = useState(0);
  const [religionId, setReligionId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState<Date>();
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [astrologicalId, setAstrologicalId] = useState(0);
  const [dobError, setDobError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");

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
  function objectToFormData(obj: any) {
    const formData = new FormData();
    for (const key in obj) {
      if (obj[key] !== undefined && obj[key] !== null) {
        formData.append(key, obj[key]);
      }
    }
    return formData;
  }
  // const handleSubmit = async (e: any) => {};
  const handleSubmit = async (e: any) => {
    const data = {
      userId: user?.id || 0,
      image: file,
    };
    const formData = objectToFormData(data);
    e.preventDefault();
    console.log(formData);
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
          <div className="grid grid-cols-1 md:grid-cols-3  justify-center">
            <div className="my-2 flex flex-col justify-center items-center md:fixed   gap-3 md:min-w-40">
              <Avatar className="w-44 h-44 border">
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
              <div className="flex items-start justify-center flex-col ">
                <div className="flex items-start justify-center flex-col gap-2">
                  <div className=" flex gap-3 flex-col items-center">
                    <div className="flex items-center gap-4">
                      <p className="font-semibold ">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <div className="flex items-center justify-center text-sky-800  px-4  bg-sky-100  h-[30px] rounded-xl">
                        <p className="font-extralight text-xs tracking-wide">
                          {user?.maritalStatus?.title}
                        </p>
                      </div>
                    </div>
                    <p className="font-light text-xs tracking-wide  gap-1 flex">
                      {user?.diversity?.country?.title},
                      <span>{user?.diversity?.city?.title}</span>
                    </p>
                  </div>
                  <div className="h-[1px] my-2 w-full bg-white/25"></div>

                  <label
                    htmlFor="upload"
                    className="mt-2 px-4 py-2 w-52 flex items-center justify-center  text-xs h-8 border border-body-color rounded-lg  font-light  cursor-pointer"
                  >
                    Change Photo
                  </label>
                  <Button onClick={handleSubmit} className="text-sm w-52">
                    Save photo
                  </Button>
                </div>
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
            <div className="fixed bg-white/50 md:ml-60 md:h-[76vh] w-[1px]"></div>
            <div className="col-span-2 min-h-[100vh] md:ml-80 ml-0 top- no-scrollbar overflow-y-scroll ">
              <div className=" flex flex-col gap-5"></div>
              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="col-span-2">Basic details</div>
                <div>
                  <Input
                    type="text"
                    placeholder="First name"
                    onChange={(e: any) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  {firstnameError && (
                    <span className="text-red-color/75 text-sm">
                      {firstnameError}
                    </span>
                  )}
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Last name"
                    onChange={(e: any) => {
                      setLastName(e.target.value);
                    }}
                  />
                  {lastnameError && (
                    <span className="text-red-color/75 text-sm">
                      {lastnameError}
                    </span>
                  )}
                </div>
                <MatrimonialDropdown
                  maritalStatusId={maritalStatusId}
                  setMaritalStatusId={setMaritalStatusId}
                />
                <GenderDropdown
                  selectedGender={gender}
                  setSelectedGender={setGender}
                />
                <div className="flex flex-col">
                  <DobPicker dob={dob} setDob={setDob} />
                  {dobError && (
                    <span className="text-red-color/75 text-sm">
                      {dobError}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed sm:px-6 bottom-4 right-0 left-0 ">
          <Button
            variant="default"
            className="   h-full w-full bg-red-color/50 hover:bg-red-color/45 text-white"
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
