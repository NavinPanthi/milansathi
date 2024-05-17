import React from "react";
import { calculateAge } from "@/lib/calculateAge";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";

const User = ({ user, bio }: any): any => {
  const age = calculateAge(user?.dateOfBirth);
  return (
    <div className="flex flex-col border border-white/10 text-white shadow-box rounded-lg gap-3 p-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex row justify-center items-center gap-4">
          <Avatar className="border h-32 w-32 flex items-center justify-center rounded-full">
            <AvatarImage
              className="h-32 w-32 rounded-full"
              src={`http://localhost:8000/images/${user?.image}`}
            />
            <AvatarFallback className="gap-1">
              <span>{user?.firstName.charAt(0).toUpperCase()}</span>
              <span>{user?.lastName.charAt(0).toUpperCase()}</span>
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center gap-2">
            <p className="font-semibold text-xl">{user?.firstName}</p>
            <div className="flex items-center justify-center px-4 bg-body-color h-[30px] rounded-xl">
              <p className="font-light text-sm tracking-wide">
                {user?.maritalStatus?.title}
              </p>
            </div>
            <div>{age} yrs old</div>
          </div>
        </div>
        <span className="flex shadow-box rounded-full size-16 flex-col items-center justify-center">
          <p className="text-lg leading-4 text-red-color/75">10</p>
          <p className="text-xs">matches</p>
        </span>
      </div>
      {bio && (
        <div className="border-t flex flex-col gap-3 border-t-bg-header pt-2">
          <p className="font-light">{user?.bio}</p>
          <div className="flex justify-end self-end">
            <Button
              className="w-36 bg-white/75 text-bg-header"
              variant="outline"
            >
              Connect
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
