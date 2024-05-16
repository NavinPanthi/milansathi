"use client";
import { useState, useReducer } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
const initialState = {
  oldPassword: "",
  showOldPassword: false,
  validationMessageOldPassword: null,
  newPassword: "",
  showNewPassword: false,
  validationMessageNewPassword: null,
  confirmPassword: "",
  showConfirmPassword: false,
  validationMessageConfirmPassword: null,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_VALIDATION_MESSAGE":
      return { ...state, [action.field]: action.message };
    case "TOGGLE_PASSWORD_VISIBILITY":
      return { ...state, [action.field]: !state[action.field] };
    default:
      return state;
  }
};

export default function ChangePassword() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    oldPassword,
    showOldPassword,
    validationMessageOldPassword,
    newPassword,
    showNewPassword,
    validationMessageNewPassword,
    confirmPassword,
    showConfirmPassword,
    validationMessageConfirmPassword,
  } = state;

  const message =
    "Your current password does not match with the password you provided. Please try again.";
  const userToken = useAppSelector(
    (state: any) => state.login.loginData.token.access_token
  );

  const userId = useAppSelector((state: any) => state.login.loginData.user.id);
  const validationForOldPassword = (oldPassword: string) => {
    if (!oldPassword || oldPassword.length < 8) {
      dispatch({
        type: "SET_VALIDATION_MESSAGE",
        field: "validationMessageOldPassword",
        message: "Please enter a valid password.",
      });
      return false;
    } else {
      dispatch({
        type: "SET_VALIDATION_MESSAGE",
        field: "validationMessageOldPassword",
        message: null,
      });
      return true;
    }
  };
  const validationForNewPassword = (newPassword: string) => {
    if (!newPassword || newPassword.length < 8) {
      dispatch({
        type: "SET_VALIDATION_MESSAGE",
        field: "validationMessageNewPassword",
        message: "Please enter a valid password.",
      });
      return false;
    } else if (newPassword === oldPassword) {
      dispatch({
        type: "SET_VALIDATION_MESSAGE",
        field: "validationMessageNewPassword",
        message: "The new password must be different from the current one.",
      });

      return false;
    } else {
      dispatch({
        type: "SET_VALIDATION_MESSAGE",
        field: "validationMessageNewPassword",
        message: null,
      });
      return true;
    }
  };
  const validationForConfirmPassword = (confirmPassword: string) => {
    if (newPassword !== confirmPassword) {
      dispatch({
        type: "SET_VALIDATION_MESSAGE",
        field: "validationMessageConfirmPassword",
        message: "Passwords do not match. Please try again.",
      });
      return false;
    } else {
      dispatch({
        type: "SET_VALIDATION_MESSAGE",
        field: "validationMessageConfirmPassword",
        message: null,
      });
      return true;
    }
  };
  // Checking validation for form.
  const isFormValid = () => {
    const isOldPasswordValid = validationForOldPassword(oldPassword);
    const isNewPasswordValid = validationForNewPassword(newPassword);
    const isConfirmPasswordValid =
      validationForConfirmPassword(confirmPassword);

    return isOldPasswordValid && isNewPasswordValid && isConfirmPasswordValid;
  };
  // Checking validation for form.

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isFormValid()) return;
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/users/change-password`;
    const requestData = {
      userId,
      oldPassword,
      newPassword,
    };

    try {
      const response = await axios.patch(apiUrl, requestData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.data.status) {
        toast.success("Password updated Successfully");
        router.push("/profile");
      } else {
        toast.error("Something went wrong");
        dispatch({
          type: "SET_VALIDATION_MESSAGE",
          field: "validationMessageOldPassword",
          message: null,
        });
        return;
      }
    } catch (error: any) {
      if (error.response.data.error) {
        toast(error.response.data.error);
      } else {
        toast("An error occurred. Please try again later.");
      }
    }
  };
  return (
    <div className="overflow-y-hidden no-scrollbar pt-2 px-3 sm:pt-4 sm:px-6">
      <div className=" fixed h-14 flex w-full top-0 items-center my-2 px-3 sm:my-4 ">
        <div
          onClick={() => router.back()}
          className="size-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 cursor-pointer"
        >
          <HiOutlineArrowLeft size="1em" />
        </div>
        <p className="font-semibold absolute left-1/2 transform -translate-x-1/2  text-sectext">
          <span>Change Password</span>
        </p>
      </div>

      <form
        className="px-3 flex-col mt-20 mb-24 w-full "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col mt-9 relative">
          <input
            required
            type={showOldPassword ? "text" : "password"}
            id="name"
            className=" h-12 w-full bg-body-color border border-white text-[15px]  leading-6 tracking-wide placeholder:font-light  placeholder:text-text text-text/85 block   rounded-lg py-3 px-4 shadow-sm focus:outline-none "
            placeholder="Old password"
            onChange={(e) => {
              dispatch({
                type: "SET_FIELD",
                field: "oldPassword",
                value: e.target.value,
              });
              validationForOldPassword(e.target.value);
            }}
          ></input>
          {showOldPassword ? (
            <BiSolidShow
              size="1.8em"
              className="absolute top-3 right-5"
              onClick={() => {
                dispatch({
                  type: "TOGGLE_PASSWORD_VISIBILITY",
                  field: "showOldPassword",
                });
              }}
            />
          ) : (
            <BiSolidHide
              size="1.8em"
              className="absolute top-3 right-5"
              onClick={() => {
                dispatch({
                  type: "TOGGLE_PASSWORD_VISIBILITY",
                  field: "showOldPassword",
                });
              }}
            />
          )}
        </div>
        {validationMessageOldPassword && (
          <div className="my-1 text-sm text-red-color/75">
            {validationMessageOldPassword}
          </div>
        )}
        <div className="flex flex-col mt-5 mb-5 relative">
          <input
            required
            type={showNewPassword ? "text" : "password"}
            id="name"
            className=" h-12 w-full  bg-body-color border border-white text-[15px] leading-6 tracking-wide placeholder:text-text placeholder:font-light text-text/85 block rounded-lg py-3 px-4 shadow-sm focus:outline-none  "
            placeholder="New Password"
            onChange={(e) => {
              dispatch({
                type: "SET_FIELD",
                field: "newPassword",
                value: e.target.value,
              });
              validationForNewPassword(e.target.value);
            }}
          ></input>
          {showNewPassword ? (
            <BiSolidShow
              size="1.8em"
              className="absolute top-3 right-5"
              onClick={() => {
                dispatch({
                  type: "TOGGLE_PASSWORD_VISIBILITY",
                  field: "showNewPassword",
                });
              }}
            />
          ) : (
            <BiSolidHide
              size="1.8em"
              className="absolute top-3 right-5"
              onClick={() => {
                dispatch({
                  type: "TOGGLE_PASSWORD_VISIBILITY",
                  field: "showNewPassword",
                });
              }}
            />
          )}
        </div>
        {validationMessageNewPassword && (
          <div className="my-1 text-sm text-red-color/75">
            {validationMessageNewPassword}
          </div>
        )}
        <div className="flex flex-col mt-5 mb-5 relative">
          <input
            required
            type={showConfirmPassword ? "text" : "password"}
            id="name"
            className=" h-12 w-full  bg-body-color border border-white text-[15px] leading-6 tracking-wide placeholder:text-text placeholder:font-light text-text/85 block rounded-lg py-3 px-4 shadow-sm focus:outline-none  "
            placeholder="Confirm Password"
            onChange={(e) => {
              dispatch({
                type: "SET_FIELD",
                field: "confirmPassword",
                value: e.target.value,
              });
              validationForConfirmPassword(e.target.value);
            }}
          ></input>
          {showConfirmPassword ? (
            <BiSolidShow
              size="1.8em"
              className="absolute top-3 right-5"
              onClick={() => {
                dispatch({
                  type: "TOGGLE_PASSWORD_VISIBILITY",
                  field: "showConfirmPassword",
                });
              }}
            />
          ) : (
            <BiSolidHide
              size="1.8em"
              className="absolute top-3 right-5"
              onClick={() => {
                dispatch({
                  type: "TOGGLE_PASSWORD_VISIBILITY",
                  field: "showConfirmPassword",
                });
              }}
            />
          )}
        </div>
        {validationMessageConfirmPassword && (
          <div className="my-1 text-sm text-red-color/75">
            {validationMessageConfirmPassword}
          </div>
        )}
        <div className="fixed px-3 bottom-4 right-0 left-0 ">
          <Button
            variant="default"
            onClick={handleSubmit}
            className="  h-full w-full bg-red-color/50 hover:bg-red-color/45 text-white"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
