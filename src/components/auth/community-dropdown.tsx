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

type Community = {
  id: number;
  title: string;
};

export function CommunityDropdown({ communityId, setCommunityId }: any) {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredCommunities, setFilteredCommunities] = useState([]);

  const handleCommunitySelect = (value: number) => {
    setCommunityId(value);
  };

  const handleSearch = (e: any) => {
    let searchTerm = e.target.value.trim().toLowerCase();
    const wordsArray = searchTerm.split(/\s+/);
    if (communities) {
      const filteredCommunities = communities.filter((community: Community) => {
        const lowerCaseCommunity = community.title.toLowerCase();
        return wordsArray.every((word: any) =>
          lowerCaseCommunity.includes(word)
        );
      });
      setFilteredCommunities(filteredCommunities);
    }
  };

  useEffect(() => {
    const getCommunities = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/community`
        );
        if (!response.data.status) {
          return <>Internal server error</>;
        } else {
          setCommunities(response.data.data);
          setFilteredCommunities(response.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getCommunities();
  }, []);

  return (
    <Select
      value={communityId ? communityId.toString() : ""}
      onValueChange={(value) => handleCommunitySelect(parseInt(value))}
    >
      <SelectTrigger className="bg-bg-body hover:bg-bg-body relative text-white/75 hover:text-white/50 flex items-center">
        <SelectValue
          className="text-white flex justify-start"
          placeholder="Select community"
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
          {filteredCommunities.length === 0 || loading ? (
            <p>Loading....</p>
          ) : (
            <>
              {filteredCommunities.map((community: Community) => (
                <div key={community.id} className={`text-sm  rounded-lg `}>
                  <SelectItem
                    className="cursor-pointer"
                    value={community.id.toString()}
                  >
                    {community.title}
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
