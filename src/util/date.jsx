import React from "react";
import { format } from "date-fns";

const DateTimeDisplay = () => {
  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, "do MMMM yyyy | h:mmaaa");
    return formattedDate;
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const currentDateTime = getCurrentDateTime();
  const greeting = getGreeting();

  return (
    <div className="small text-muted">
      <p>
        {greeting} | {currentDateTime}
      </p>
    </div>
  );
};

export default DateTimeDisplay;
