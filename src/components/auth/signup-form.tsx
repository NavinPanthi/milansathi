"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MatrimonialDropdown } from "./matrimonial-dropdown";
import { GenderDropdown } from "./gender-dropdown";
import { CountryDropdown } from "./country-dropdown";
import { ReligionDropdown } from "./religion-dropdown";
import { CommunityDropdown } from "./community-dropdown";
import { MotherTongueDropdown } from "./mother-tongue-dropdown";
import { CityDropdown } from "./city-dropdown";
import { DobPicker } from "./dob-picker";
import { signupFormSchema } from "@/lib/validations/form";
import z from "zod";
import axios from "axios";
import Loading from "@/app/loading";
import { toast } from "sonner";

type User = {
  firstName: string;
  lastName: string;
  maritalStatusId: number;
  gender: string;
  dob: Date;
  religionId: number;
  cityId: number;
  countryId: number;
  motherTongueId: number;
  communityId: number;
  email: string;
  password: string;
};
export default function SignUpForm({ setRequestSuccess }: any) {
  const [maritalStatusId, setMaritalStatusId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [countryId, setCountryId] = useState(0);
  const [communityId, setCommunityId] = useState(0);
  const [motherTongueId, setMotherTongueId] = useState(0);
  const [religionId, setReligionId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState<Date>();
  const [gender, setGender] = useState("");

  // Error states
  const [maritalStatusIdError, setMaritalStatusIdError] = useState("");
  const [cityIdError, setCityIdError] = useState("");
  const [countryIdError, setCountryIdError] = useState("");
  const [communityIdError, setCommunityIdError] = useState("");
  const [motherTongueIdError, setMotherTongueIdError] = useState("");
  const [religionIdError, setReligionIdError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [dobError, setDobError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let validatedData: any;
  let updatedValidatedData: any;
  const validateForm = () => {
    let simpleDateOfBirth: any;

    try {
      // Validate the form data against the schema

      const formData = {
        email,
        password,
        firstName,
        lastName,
        dateOfBirth: dob,
        gender,
        religionId,
        cityId,
        countryId,
        motherTongueId,
        communityId,
        maritalStatusId,
      };
      validatedData = signupFormSchema.parse(formData);
      if (dob !== undefined) {
        simpleDateOfBirth = new Date(dob).toISOString().split("T")[0];
      }
      validatedData.dateOfBirth = simpleDateOfBirth;
      updatedValidatedData = {
        ...validatedData,
        bio: "User bio goes here",
        image: "image url goes here",
        astrologicalId: 0,
        facebookProfileLink: "",
        contactNumber: "",
      };
      setMaritalStatusIdError("");
      setCityIdError("");
      setCountryIdError("");
      setCommunityIdError("");
      setMotherTongueIdError("");
      setReligionIdError("");
      setFirstnameError("");
      setLastnameError("");
      setEmailError("");
      setPasswordError("");
      setDobError("");
      setGenderError("");

      return true; // Validation succeeded
    } catch (error: any) {
      // If validation fails, update the corresponding error state variables
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          switch (path) {
            case "maritalStatusId":
              setMaritalStatusIdError(err.message);
              break;
            case "cityId":
              setCityIdError(err.message);
              break;
            case "countryId":
              setCountryIdError(err.message);
              break;
            case "communityId":
              setCommunityIdError(err.message);
              break;
            case "motherTongueId":
              setMotherTongueIdError(err.message);
              break;
            case "religionId":
              setReligionIdError(err.message);
              break;
            case "firstName":
              setFirstnameError(err.message);
              break;
            case "lastName":
              setLastnameError(err.message);
              break;
            case "email":
              setEmailError(err.message);
              break;
            case "password":
              setPasswordError(err.message);
              break;
            case "dateOfBirth":
              setDobError(err.message);
              break;
            case "gender":
              setGenderError(err.message);
              break;
            default:
              break;
          }
        });
      } else {
        console.error("An unexpected error occurred:", error);
      }
      return false; // Validation failed
    }
  };
  const comparePassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && comparePassword()) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/users`,
          updatedValidatedData
        );
        setIsLoading(false);
        if (response.data.status) {
          setRequestSuccess(true);
          toast.success("Account created successfully");
        } else {
          toast.error("Unable to create account");
        }
      } catch (error: any) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSignUp} className="flex gap-4 flex-col ">
      <div className="overflow-y-scroll flex gap-4 flex-col max-h-[380px] no-scrollbar">
        <div className="flex justify-start w-full  flex-col gap-3 px-6">
          <div className="self-start">Basic details </div>
          <div className="grid  gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-between">
            <div>
              <Input
                type="text"
                placeholder="First name"
                onChange={(e) => {
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
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              {lastnameError && (
                <span className="text-red-color/75 text-sm">
                  {lastnameError}
                </span>
              )}
            </div>

            <div>
              <MatrimonialDropdown
                maritalStatusId={maritalStatusId}
                setMaritalStatusId={setMaritalStatusId}
              />
              {maritalStatusIdError && (
                <span className="text-red-color/75 text-sm">
                  {maritalStatusIdError}
                </span>
              )}
            </div>

            <div>
              <GenderDropdown
                selectedGender={gender}
                setSelectedGender={setGender}
              />
              {genderError && (
                <span className="text-red-color/75 text-sm">{genderError}</span>
              )}
            </div>

            <div className="flex flex-col">
              <DobPicker dob={dob} setDob={setDob} />
              {dobError && (
                <span className="text-red-color/75 text-sm">{dobError}</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-start w-full  flex-col gap-3 px-6">
          <div className="self-start">Diversity details </div>
          <div className="grid  gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-between">
            <div>
              <CountryDropdown
                countryId={countryId}
                setCountryId={setCountryId}
              />
              {countryIdError && (
                <span className="text-red-color/75 text-sm">
                  {countryIdError}
                </span>
              )}
            </div>

            <div>
              <ReligionDropdown
                religionId={religionId}
                setReligionId={setReligionId}
              />
              {religionIdError && (
                <span className="text-red-color/75 text-sm">
                  {religionIdError}
                </span>
              )}
            </div>

            <div>
              <CommunityDropdown
                communityId={communityId}
                setCommunityId={setCommunityId}
              />
              {communityIdError && (
                <span className="text-red-color/75 text-sm">
                  {communityIdError}
                </span>
              )}
            </div>

            <div>
              <MotherTongueDropdown
                motherTongueId={motherTongueId}
                setMotherTongueId={setMotherTongueId}
              />
              {motherTongueIdError && (
                <span className="text-red-color/75 text-sm">
                  {motherTongueIdError}
                </span>
              )}
            </div>

            <div>
              <CityDropdown cityId={cityId} setCityId={setCityId} />
              {cityIdError && (
                <span className="text-red-color/75 text-sm">{cityIdError}</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-start w-full  flex-col gap-3 px-6">
          <div className="self-start">Login details </div>
          <div className="grid  gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-between">
            <div>
              <Input
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {emailError && (
                <span className="text-red-color/75 text-sm">{emailError}</span>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {passwordError && (
                <span className="text-red-color/75 text-sm">
                  {passwordError}
                </span>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Re-enter Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              {confirmPasswordError && (
                <span className="text-red-color/75 text-sm">
                  {confirmPasswordError}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-body-color   -mb-3 h-[2px]"></div>
      <div className="flex items-center   justify-between gap-2 mt-2 ">
        <Button
          variant="default"
          onClick={handleSignUp}
          disabled={isLoading}
          className=" !cursor-pointer h-full w-full bg-red-color/50 hover:bg-red-color/45 text-white"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loading /> <p>Submitting</p>
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </form>
  );
}
