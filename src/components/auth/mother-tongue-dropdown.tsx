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

type MotherTongue = {
  id: number;
  title: string;
};

export function MotherTongueDropdown({
  motherTongueId,
  setMotherTongueId,
}: any) {
  const [motherTongues, setMotherTongues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredMotherTongues, setFilteredMotherTongues] = useState([]);

  const handleMotherTongueSelect = (value: number) => {
    setMotherTongueId(value);
  };

  const handleSearch = (e: any) => {
    let searchTerm = e.target.value.trim().toLowerCase();
    const wordsArray = searchTerm.split(/\s+/);
    if (motherTongues) {
      const filteredMotherTongues = motherTongues.filter(
        (motherTongue: MotherTongue) => {
          const lowerCaseMotherTongue = motherTongue.title.toLowerCase();
          return wordsArray.every((word: any) =>
            lowerCaseMotherTongue.includes(word)
          );
        }
      );
      setFilteredMotherTongues(filteredMotherTongues);
    }
  };

  useEffect(() => {
    const getMotherTongues = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/mother-tongue`
        );
        if (!response.data.status) {
          return <>Internal server error</>;
        } else {
          setMotherTongues(response.data.data);
          setFilteredMotherTongues(response.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getMotherTongues();
  }, []);

  return (
    <Select
    value={motherTongueId ? motherTongueId.toString() : ""}

      onValueChange={(value) => handleMotherTongueSelect(parseInt(value))}
    >
      <SelectTrigger className="bg-bg-body hover:bg-bg-body relative text-white/75 hover:text-white/50 flex items-center">
        <SelectValue
          className="text-white flex justify-start"
          placeholder="Select mother tongue"
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
          {filteredMotherTongues.length === 0 || loading ? (
            <p>Loading....</p>
          ) : (
            <>
              {filteredMotherTongues.map((motherTongue: MotherTongue) => (
                <div key={motherTongue.id} className={`text-sm  rounded-lg `}>
                  <SelectItem
                    className="cursor-pointer"
                    value={motherTongue.id.toString()}
                  >
                    {motherTongue.title}
                  </SelectItem>
                </div>
              ))}
            </>
          )}
        </div>
      </SelectContent>
    </Select>
  );
}
