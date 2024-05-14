import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export function DobPicker({ dob, setDob }: any) {
  console.log(dob);
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
