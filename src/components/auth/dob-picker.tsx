import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export function DobPicker({ dob, setDob, placeholder }: any) {
  console.log(dob);
  return (
    <DatePicker
      selected={dob}
      placeholderText={placeholder || "Date of Birth"}
      onChange={(date: Date) => setDob(date)}
      popperPlacement="top-end"
      shouldCloseOnSelect={false}
    />
  );
}
