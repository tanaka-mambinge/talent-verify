import React, { useState } from "react";

const DateInput = () => {
  // Initialize state with a default date value
  const [date, setDate] = useState("2024-06-30");

  // Handle change event
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <label htmlFor="date-input">Select a date:</label>
      <input
        type="date"
        id="date-input"
        value={date}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DateInput;
