import React from "react";
import { isOpenNow, getNextOpenTime, isHoliday, isSunday, isSaturday } from "@/utils/dateUtils";

const WorkingHoursDemo = () => {
  const now = new Date();
  const testHours = "Mon-Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 1:00 PM";
  
  const isOpen = isOpenNow(testHours);
  const nextOpen = getNextOpenTime(testHours);
  const isHolidayToday = isHoliday();
  const isSundayToday = isSunday();
  const isSaturdayToday = isSaturday();

  return (
    <div className="p-4 bg-gray-50 rounded-lg border">
      <h3 className="font-semibold mb-3">Working Hours Demo</h3>
      <div className="space-y-2 text-sm">
        <div>Current Time: {now.toLocaleString()}</div>
        <div>Day of Week: {now.toLocaleDateString('en-US', { weekday: 'long' })}</div>
        <div>Is Sunday: {isSundayToday ? 'Yes' : 'No'}</div>
        <div>Is Saturday: {isSaturdayToday ? 'Yes' : 'No'}</div>
        <div>Is Holiday: {isHolidayToday ? 'Yes' : 'No'}</div>
        <div>Bank Open: {isOpen ? 'Yes' : 'No'}</div>
        <div>Next Open: {nextOpen}</div>
      </div>
    </div>
  );
};

export default WorkingHoursDemo; 