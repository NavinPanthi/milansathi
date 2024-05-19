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

type Religion = {
  id: number;
  title: string;
};

export function ReligionDropdown({ religionId, setReligionId }: any) {
  const [religions, setReligions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredReligions, setFilteredReligions] = useState([]);

  const handleReligionSelect = (value: number) => {
    setReligionId(value);
  };

  const handleSearch = (e: any) => {
    
    let searchTerm = e.target.value.trim().toLowerCase();
    const wordsArray = searchTerm.split(/\s+/);
    if (religions) {
      const filteredReligions = religions.filter((religion: Religion) => {
        const lowerCaseReligion = religion.title.toLowerCase();
        return wordsArray.every((word: any) =>
          lowerCaseReligion.includes(word)
        );
      });
      setFilteredReligions(filteredReligions);
    }
  };

  useEffect(() => {
    const getReligions = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/religion`
        );
        if (!response.data.status) {
          return <>Internal server error</>;
        } else {
          setReligions(response.data.data);
          setFilteredReligions(response.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getReligions();
  }, []);

  return (
    <Select     value={religionId ? religionId.toString() : ""}
    onValueChange={(value) => handleReligionSelect(parseInt(value))}>
      <SelectTrigger className="bg-bg-body hover:bg-bg-body relative text-white/75 hover:text-white/50 flex items-center">
        <SelectValue
          className="text-white flex justify-start"
          placeholder="Select religion"
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
          {filteredReligions.length === 0 || loading ? (
            <p>Loading....</p>
          ) : (
            <>
              {filteredReligions.map((religion: Religion) => (
                <div key={religion.id} className={`text-sm  rounded-lg `}>
                  <SelectItem
                    className="cursor-pointer"
                    value={religion.id.toString()}
                  >
                    {religion.title}
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
