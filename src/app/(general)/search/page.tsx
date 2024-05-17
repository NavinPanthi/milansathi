"use client";
import { useState, useReducer, useEffect } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { loginActions } from "@/store/loginSlice";
import User from "@/components/dashboard/User";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MatrimonialDropdown } from "@/components/auth/matrimonial-dropdown";
import { CountryDropdown } from "@/components/auth/country-dropdown";
import { ReligionDropdown } from "@/components/auth/religion-dropdown";
import { CommunityDropdown } from "@/components/auth/community-dropdown";
import { MotherTongueDropdown } from "@/components/auth/mother-tongue-dropdown";
import { CityDropdown } from "@/components/auth/city-dropdown";
import { DobPicker } from "@/components/auth//dob-picker";

export default function MyDetails() {
  const [userDetails, setUserDetails] = useState<any>([]);
  const [filteredUsers, setFilteredUsers] = useState<any>([]);
  const [fromDob, setFromDob] = useState<Date>();
  const [toDob, setToDob] = useState<Date>();
  const [maritalStatusId, setMaritalStatusId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [countryId, setCountryId] = useState(0);
  const [communityId, setCommunityId] = useState(0);
  const [motherTongueId, setMotherTongueId] = useState(0);
  const [religionId, setReligionId] = useState(0);
  const [fromDobError, setFromDobError] = useState("");
  const [toDobError, setToDobError] = useState("");
  const [
    isHandleSearchByParametersClicked,
    setIsHandleSearchByParametersClicked,
  ] = useState(false);
  let searchTerm = "";
  const router = useRouter();
  let user: any;
  const userT = useAppSelector((state: any) => state.login.loginData.token);
  const userRedux = useAppSelector((state: any) => state.login.loginData?.user);
  const userToken = userT?.access_token;

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

  const handleSearchByName = (e: any) => {
    searchTerm = e.target.value.trim().toLowerCase();
    if (searchTerm === "") {
      setFilteredUsers([]);
      return;
    }
    const wordsArray = searchTerm.split(/\s+/);

    let filtered: any;
    if (userDetails) {
      filtered = userDetails.filter((user: any) => {
        const lowerCaseUser = user.firstName.toLowerCase();
        return wordsArray.every((word: any) => lowerCaseUser.includes(word));
      });
    }
    setFilteredUsers(filtered);
  };
  const handleSearchByParameters = (e: any) => {
    console.log("first line-----", fromDob, toDob);
    if (toDob !== (undefined || null) && fromDob === (undefined || null)) {
      setFromDobError("This field is required.");

      return;
    } else {
      setFromDobError("");
    }
    if (toDob === (undefined || null) && fromDob !== (undefined || null)) {
      setToDobError("This field is required.");

      return;
    } else {
      setToDobError("");
    }
    setIsHandleSearchByParametersClicked(true);
  };
  useEffect(() => {
    console.log(fromDob);
  }, [fromDob]);
  return (
    <div className="overflow-y-hidden no-scrollbar pt-2 px-3 sm:pt-4 sm:px-6">
      <div className=" fixed h-16 sm:h-[72px] z-10 bg-body-color left-0  flex w-full top-0 items-center px-12  ">
        <div
          onClick={() => router.back()}
          className="size-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 cursor-pointer"
        >
          <HiOutlineArrowLeft size="1em" />
        </div>
        <p className="font-semibold absolute left-1/2 transform -translate-x-1/2  text-sectext">
          <span>Search</span>
        </p>
      </div>

      <div className="px-1 flex-col mt-14 mb-24  w-full ">
        <Tabs defaultValue="firstname" className=" ">
          <TabsList className="w-full bg-body-color h-12">
            <TabsTrigger value="firstname" className="w-full h-10 text-white">
              Search by firstname
            </TabsTrigger>
            <TabsTrigger value="parameters" className="w-full h-10 text-white">
              Search by parameters.
            </TabsTrigger>
          </TabsList>
          <TabsContent value="firstname">
            <div className="relative flex items-center flex-row">
              <Input
                type="text"
                onChange={handleSearchByName}
                placeholder="Search by firstname"
              />
              <span className="absolute right-4 text-white ">
                <IoIosSearch size="1.2em" />
              </span>
            </div>
            <div className="my-2 flex flex-col    gap-3 ">
              {filteredUsers && filteredUsers.length > 0 ? (
                filteredUsers.map((user: any) =>
                  user.gender !== userRedux?.gender ? (
                    <User key={user.id} user={user} />
                  ) : null
                )
              ) : (
                <div></div>
              )}
            </div>
          </TabsContent>
          <TabsContent
            value="parameters"
            className="grid grid-cols-1 md:grid-cols-2  justify-between gap-3"
          >
            <div className="col-span-2">Age range</div>

            <span className="w-full  flex flex-col ">
              <DobPicker
                className="w-full "
                dob={fromDob}
                setDob={setFromDob}
                placeholder={`From date of Birth`}
              />
              {fromDobError && (
                <span className="text-red-color/75 text-sm">
                  {fromDobError}
                </span>
              )}
            </span>
            <span className="w-full  flex flex-col ">
              <DobPicker
                className="w-full"
                dob={toDob}
                setDob={setToDob}
                placeholder={`To date of Birth`}
              />
              {toDobError && (
                <span className="text-red-color/75 text-sm">{toDobError}</span>
              )}
            </span>
            <MatrimonialDropdown
              maritalStatusId={maritalStatusId}
              setMaritalStatusId={setMaritalStatusId}
            />
            <CountryDropdown
              countryId={countryId}
              setCountryId={setCountryId}
            />
            <CityDropdown cityId={cityId} setCityId={setCityId} />
            <ReligionDropdown
              religionId={religionId}
              setReligionId={setReligionId}
            />
            <CommunityDropdown
              communityId={communityId}
              setCommunityId={setCommunityId}
            />
            <MotherTongueDropdown
              motherTongueId={motherTongueId}
              setMotherTongueId={setMotherTongueId}
            />
            <Button
              variant="default"
              onClick={handleSearchByParameters}
              className="col-span-2 !cursor-pointer h-full w-full bg-red-color/50 hover:bg-red-color/45 text-white"
            >
              Search
            </Button>
            {isHandleSearchByParametersClicked && (
              <div className="my-2 flex flex-col col-span-2 gap-3">
                {userDetails && userDetails.length > 0 ? (
                  userDetails.map((user: any) =>
                    user?.gender !== userRedux?.gender &&
                    (countryId === 0 ||
                      user?.divesity?.country?.id === countryId) &&
                    (cityId === 0 || user?.divesity?.city?.id === cityId) &&
                    (maritalStatusId === 0 ||
                      user?.maritalStatus?.id === maritalStatusId) &&
                    (motherTongueId === 0 ||
                      user?.divesity?.motherTongue?.id === motherTongueId) &&
                    (communityId === 0 ||
                      user?.divesity?.community?.id === communityId) &&
                    (religionId === 0 ||
                      user?.diversity?.religion?.id === religionId) ? (
                      <User key={user.id} user={user} />
                    ) : null
                  )
                ) : (
                  <div>No users found</div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
