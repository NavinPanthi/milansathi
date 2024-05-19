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

type AstrologySign = {
  id: number;
  title: string;
};

export function AstrologyDropdown({ astrologicalId, setAstrologicalId }: any) {
  const [astrologySigns, setAstrologySigns] = useState<AstrologySign[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredSigns, setFilteredSigns] = useState<AstrologySign[]>([]);

  const handleAstrologySelect = (value: number) => {
    setAstrologicalId(value);
  };

  const handleSearch = (e: any) => {
    let searchTerm = e.target.value.trim().toLowerCase();
    const wordsArray = searchTerm.split(/\s+/);
    if (astrologySigns) {
      const filteredSigns = astrologySigns.filter((sign: AstrologySign) => {
        const lowerCaseSign = sign.title.toLowerCase();
        return wordsArray.every((word: any) => lowerCaseSign.includes(word));
      });
      setFilteredSigns(filteredSigns);
    }
  };

  useEffect(() => {
    const getAstrologySigns = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/astrology`
        );
        if (!response.data.status) {
          return <>Internal server error</>;
        } else {
          setAstrologySigns(response.data.data);
          setFilteredSigns(response.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getAstrologySigns();
  }, []);

  return (
    <Select
      value={astrologicalId ? astrologicalId.toString() : ""}
      onValueChange={(value) => handleAstrologySelect(parseInt(value))}
    >
      <SelectTrigger className="bg-bg-body hover:bg-bg-body relative text-white/75 hover:text-white/50 flex items-center">
        <SelectValue
          className="text-white flex justify-start"
          placeholder="Select astrology sign"
        />
      </SelectTrigger>

      <SelectContent className="w-[352px] p-0 relative overflow-y-scroll no-scrollbar h-[300px] bg-bg-header border border-white/25">
        <div className="flex top-0 fixed p-2 w-[99%] justify-center z-10 bg-bg-header items-center">
          <Input
            type="text"
            className="w-full text-white relative border-white/25"
            onChange={handleSearch}
            placeholder="Search"
          />
          <div className="p-2 text-secondary absolute right-2">
            <IoIosSearch size="1.2em" />
          </div>
        </div>

        <div className={`text-white mt-12 p-2`}>
          {filteredSigns.length === 0 || loading ? (
            <p>Loading....</p>
          ) : (
            <>
              {filteredSigns.map((sign: AstrologySign) => (
                <div key={sign.id} className={`text-sm rounded-lg`}>
                  <SelectItem
                    className="cursor-pointer"
                    value={sign.id.toString()}
                  >
                    {sign.title}
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
