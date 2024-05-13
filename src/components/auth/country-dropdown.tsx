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

type Country = {
  id: number;
  title: string;
};

export function CountryDropdown({ countryId, setCountryId }: any) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleCountrySelect = (value: number) => {
    setCountryId(value);
  };

  const handleSearch = (e: any) => {
    let searchTerm = e.target.value.trim().toLowerCase();
    const wordsArray = searchTerm.split(/\s+/);
    if (countries) {
      const filteredCountries = countries.filter((country: Country) => {
        const lowerCaseCountry = country.title.toLowerCase();
        return wordsArray.every((word: any) => lowerCaseCountry.includes(word));
      });
      setFilteredCountries(filteredCountries);
    }
  };

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/country`
        );
        if (!response.data.status) {
          return <>Internal server error</>;
        } else {
          setCountries(response.data.data);
          setFilteredCountries(response.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getCountries();
  }, []);

  return (
    <Select onValueChange={(value) => handleCountrySelect(parseInt(value))}>
      <SelectTrigger className="bg-bg-body hover:bg-bg-body relative text-white/75 hover:text-white/50 flex items-center">
        <SelectValue
          className="text-white flex justify-start"
          placeholder="Select country"
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
          {filteredCountries.length === 0 || loading ? (
            <p>Loading....</p>
          ) : (
            <>
              {filteredCountries.map((country: Country) => (
                <div key={country.id} className={`text-sm  rounded-lg `}>
                  <SelectItem
                    className="cursor-pointer"
                    value={country.id.toString()}
                  >
                    {country.title}
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
