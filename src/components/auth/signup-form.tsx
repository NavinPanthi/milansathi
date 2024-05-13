"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MatrimonialDropdown } from "./matrimonial-dropdown";
import { GenderDropdown } from "./gender-dropdown";
import { CountryDropdown } from "./country-dropdown";
import { ReligionDropdown } from "./religion-dropdown";
import { CommunityDropdown } from "./community-dropdown";
import { MotherTongueDropdown } from "./mother-tongue-dropdown";
import { CityDropdown } from "./city-dropdown";
import { useRouter } from "next/router";
import { DobPicker } from "./dob-picker";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { signupActions } from "@/store/signupSlice";
import Link from "next/link";
import { signupFormSchema } from "@/lib/validations/form";
import z from "zod";
type User = {
  firstname: string;
  lastname: string;
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
export default function SignUpForm() {
  const [maritalStatusId, setMaritalStatusId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [countryId, setCountryId] = useState(0);
  const [communityId, setCommunityId] = useState(0);
  const [motherTongueId, setMotherTongueId] = useState(0);
  const [religionId, setReligionId] = useState(0);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
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
  let validatedData;
  const validateForm = () => {
    try {
      // Validate the form data against the schema
      const formData = {
        firstname,
        lastname,
        maritalStatusId,
        gender,
        dob,
        religionId,
        cityId,
        countryId,
        motherTongueId,
        communityId,
        email,
        password,
      };
      validatedData = signupFormSchema.parse(formData);
      console.log(validatedData);
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
            case "firstname":
              setFirstnameError(err.message);
              break;
            case "lastname":
              setLastnameError(err.message);
              break;
            case "email":
              setEmailError(err.message);
              break;
            case "password":
              setPasswordError(err.message);
              break;
            case "dob":
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

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted partially!");
    if (validateForm() && comparePassword()) {
      console.log("Form submitted successfully!");
    }
  };

  useEffect(() => {
    console.log(
      "gender and dob, maritalstatusid",
      gender,
      dob,
      maritalStatusId,
      countryId,
      cityId,
      communityId,
      motherTongueId,
      religionId
    );
  }, [
    gender,
    dob,
    maritalStatusId,
    countryId,
    cityId,
    communityId,
    religionId,
    motherTongueId,
  ]);

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
                  setFirstname(e.target.value);
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
                  setLastname(e.target.value);
                  setLastnameError(""); // Clear the error when the user types
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
                className=""
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
          className=" !cursor-pointer h-full w-full bg-red-color/50 hover:bg-red-color/45 text-white"
        >
          {/* <Link
            className="w-full"
            href={signupDatas ? "/auth/sign-in-" : "/auth/sign-up-"}
          > */}
          Submit
          {/* </Link> */}
        </Button>
      </div>
    </form>
  );
}
