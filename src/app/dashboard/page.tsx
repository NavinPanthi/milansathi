"use client";
import { useState, useEffect } from "react";
import Header from "@/components/dashboard/header";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import axios from "axios";
// import User from "@components/dashboard/User";
import { toast } from "sonner";
import User from "@/components/dashboard/User";

export default function Dashboard() {
  const [effectMargin, setEffectMargin] = useState(false);
  const { loggedInUsers, token } = useAppSelector(
    (state: any) => state.login.loginData
  );
  const loggedInUser = useAppSelector(
    (state: any) => state.login.loginData.user
  );

  const [userDetails, setUserDetails] = useState<any>([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users`,
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
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
  }, [token]);

  return (
    <div>
      <Header setEffectMargin={setEffectMargin} />
      <div
        className={`pt-1 mt-20 px-3 sm:pt-2 sm:px-6 pb-28 ${
          effectMargin ? "mt-[-50px]" : ""
        }`}
      >
        <div
          className={`flex flex-col justify-start gap-4 ${
            effectMargin ? "mt-[136px]" : ""
          }`}
        >
          {userDetails && userDetails.length > 0 ? (
            userDetails.map((user: any) =>
              user.gender !== loggedInUser?.gender ? (
                <User key={user.id} user={user} bio={true} />
              ) : null
            )
          ) : (
            <div>No user details available</div>
          )}
        </div>
      </div>
    </div>
  );
}
