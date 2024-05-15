"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { loginActions } from "@/store/loginSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
const LogOut = ({ handleClose }: any) => {
  const user = useAppSelector((state: any) => state.login.loginData);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogOut = (e: any) => {
    e.preventDefault();
    if (user) {
      dispatch(loginActions.logOut());
      handleClose();
      toast.success("Logged Out successfully");
      router.push("/auth/sign-in");
    } else {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="w-[62%] md:w-[640px]  h-auto">
        <div className="bg-bg-header border border-white/25 size-full rounded-xl p-6 flex flex-col gap-5">
          <p className="text-lg">Are you sure want to Log out ?</p>
          <div className="ml-auto flex gap-2">
            <button
              className="flex items-center justify-center rounded-lg font-semibold w-28 text-sectext"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </button>
            {/* <button className="flex items-center justify-center rounded-[20px] font-semibold h-8 text-white w-[120px] bg-accent">
              LogOut
            </button> */}
            <Button
              variant="default"
              onClick={(e) => {
                handleLogOut(e);
              }}
              className="h-full w-36 bg-red-color/50 hover:bg-red-color/45 text-white"
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LogOut;
