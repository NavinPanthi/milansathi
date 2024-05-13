"use client";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Gender = {
  id: number;
  title: string;
};

export function GenderDropdown({ selectedGender, setSelectedGender }: any) {
  const gender: Gender[] = [
    { id: 1, title: "Male" },
    { id: 2, title: "Female" },
    { id: 3, title: "Others" },
  ];

  return (
    <Select value={selectedGender} onValueChange={setSelectedGender}>
      <SelectTrigger className="bg-bg-body hover:bg-bg-body relative text-white/75 hover:text-white/50 flex items-center">
        <SelectValue
          className="text-white flex justify-start"
          placeholder="Select gender"
        />
      </SelectTrigger>

      <SelectContent className="w-[352px] p-0 relative overflow-y-scroll no-scrollbar  bg-bg-header border border-white/25">
        <div className={` text-white  p-2`}>
          <>
            {gender.map((g: Gender) => (
              <div key={g.id} className={`text-sm  rounded-lg `}>
                <SelectItem className="cursor-pointer" value={g.title}>
                  {g.title}
                </SelectItem>
              </div>
            ))}
          </>
        </div>
      </SelectContent>
    </Select>
  );
}
