"use client";

import { useState } from "react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export function DobPicker({ dob, setDob }: any) {

  return (
    <DatePicker
      selected={dob}
      placeholderText="Date of birth"
      onChange={(date: Date) => setDob(date)}
      popperPlacement="top-end"
      shouldCloseOnSelect={false}
    />
  );
}
