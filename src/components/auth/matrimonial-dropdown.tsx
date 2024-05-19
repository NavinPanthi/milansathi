"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type matrimonialStatus = {
  id: number;
  title: string;
};

export function MatrimonialDropdown({
  maritalStatusId,
  setMaritalStatusId,
}: any) {
  const [matrimonialStatus, setMatrimonialStatus] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [filteredMatrimonialStatus, setFilteredMatrimonialStatus] = useState(
    []
  );
  const handleMatrimonialStatusSelect = (value: number) => {
    setMaritalStatusId(value);
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
    <Select
      value={maritalStatusId ? maritalStatusId.toString() : ""}
      onValueChange={(value) => handleMatrimonialStatusSelect(parseInt(value))}
    >
      <SelectTrigger className="bg-bg-body hover:bg-bg-body relative text-white/75 hover:text-white/50 flex items-center">
        <SelectValue
          className="text-white flex justify-start"
          placeholder="Select marital status"
        />
      </SelectTrigger>

      <SelectContent className="w-[352px] p-0 relative overflow-y-scroll no-scrollbar h-[300px] bg-bg-header border border-white/25">
        <div className=" flex top-0 fixed p-2 w-[99%] justify-center z-10 bg-bg-header items-center">
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
          {filteredMatrimonialStatus.length === 0 || loading ? (
            <p>Loading....</p>
          ) : (
            <>
              {filteredMatrimonialStatus.map(
                (matrimonialStatus: matrimonialStatus) => (
                  <div
                    key={matrimonialStatus.id}
                    className={`text-sm  rounded-lg `}
                  >
                    {/* {matrimonialStatus.title} */}
                    <SelectItem
                      className="cursor-pointer"
                      value={matrimonialStatus.id.toString()}
                    >
                      {matrimonialStatus.title}
                    </SelectItem>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </SelectContent>
    </Select>
  );
}
