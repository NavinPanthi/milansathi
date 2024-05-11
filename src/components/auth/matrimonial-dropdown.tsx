"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { HiChevronUpDown } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type matrimonialStatus = {
  id: number;
  title: string;
};

export function MatrimonialDropdown(id: any) {
  const [matrimonialStatus, setMatrimonialStatus] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [filteredMatrimonialStatus, setFilteredMatrimonialStatus] = useState(
    []
  );

  const triggerPopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const handleSearch = (e: any) => {
    let searchTerm = e.target.value.trim().toLowerCase();
    const wordsArray = searchTerm.split(/\s+/);
    if (matrimonialStatus) {
      const filteredMatrimonialStatus = matrimonialStatus.filter(
        (matrimonialStatusItem: matrimonialStatus) => {
          const lowerCasematrimonialStatus =
            matrimonialStatusItem.title.toLowerCase();
          return wordsArray.every((word: any) =>
            lowerCasematrimonialStatus.includes(word)
          );
        }
      );
      setFilteredMatrimonialStatus(filteredMatrimonialStatus);
    }
  };
  useEffect(() => {
    const getMatrimonialStaus = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/matrimonial-status`
        );
        if (!response.data.status) {
          return <>Internal server error</>;
        } else {
          // Set loading to false once data is fetched
          setMatrimonialStatus(response.data.data);
          setFilteredMatrimonialStatus(response.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getMatrimonialStaus();
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="bg-bg-body hover:bg-bg-body relative text-white/75 hover:text-white/50 flex justify-center items-center"
          onClick={triggerPopup}
        >
          <p>Select marital status</p>
          <HiChevronUpDown size="1.2em" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[352px] p-0 relative overflow-y-scroll no-scrollbar h-[300px] bg-bg-header border border-white/25">
        <div className=" flex fixed p-2 w-[99%] justify-center z-10 bg-bg-header items-center">
          <Input
            type="text"
            className="w-full text-white relative border-white/25"
            onChange={handleSearch}
            placeholder="Search"
          />
          <div className="p-2 text-secondary absolute  right-2">
            <IoIosSearch size="1.2em" />
          </div>
        </div>

        <div className={` text-white mt-12 p-2`}>
          {filteredMatrimonialStatus.length === 0 ? (
            <p>Loading....</p>
          ) : (
            <>
              {filteredMatrimonialStatus.map(
                (matrimonialStatus: matrimonialStatus) => (
                  <div
                    key={matrimonialStatus.id}
                    className={`text-sm py-2 px-2 hover:bg-white/20 cursor-pointer rounded-lg `}
                  >
                    {matrimonialStatus.title}
                  </div>
                )
              )}
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
