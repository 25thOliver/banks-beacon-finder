export const parseTimeStringToDate = (timeString: string): Date => {
  const now = new Date();
  const [time, meridian] = timeString.toLowerCase().match(/(\d+:\d+)(am|pm)/)?.slice(1) || [];
  const [hours, minutes] = time.split(':').map(Number);
  
  const adjustedHours = meridian === 'pm' && hours !== 12 
    ? hours + 12 
    : meridian === 'am' && hours === 12 
    ? 0 
    : hours;

  now.setHours(adjustedHours, minutes, 0, 0);
  return now;
};

export const isWeekend = (date: Date = new Date()): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

export const formattedCurrentDateTime = new Date();

// Kenyan Public Holidays 2024-2025
const KENYAN_HOLIDAYS = [
  // 2024
  '2024-01-01', // New Year's Day
  '2024-04-01', // Easter Monday
  '2024-05-01', // Labour Day
  '2024-06-01', // Madaraka Day
  '2024-06-16', // Eid al-Adha
  '2024-10-10', // Moi Day
  '2024-10-20', // Mashujaa Day
  '2024-12-12', // Jamhuri Day
  '2024-12-25', // Christmas Day
  '2024-12-26', // Boxing Day
  
  // 2025
  '2025-01-01', // New Year's Day
  '2025-04-21', // Easter Monday
  '2025-05-01', // Labour Day
  '2025-06-01', // Madaraka Day
  '2025-10-10', // Moi Day
  '2025-10-20', // Mashujaa Day
  '2025-12-12', // Jamhuri Day
  '2025-12-25', // Christmas Day
  '2025-12-26', // Boxing Day
];

export const isHoliday = (date: Date = new Date()): boolean => {
  const dateString = date.toISOString().split('T')[0];
  return KENYAN_HOLIDAYS.includes(dateString);
};

export const isSunday = (date: Date = new Date()): boolean => {
  return date.getDay() === 0;
};

export const isSaturday = (date: Date = new Date()): boolean => {
  return date.getDay() === 6;
};

export const parseWorkingHours = (workingHours: string): {
  weekdays: { start: string; end: string };
  saturday: { start: string; end: string };
} | null => {
  try {
    if (!workingHours || typeof workingHours !== 'string') {
      return {
        weekdays: { start: '8:00 AM', end: '5:00 PM' },
        saturday: { start: '8:00 AM', end: '1:00 PM' }
      };
    }
    
    // Parse formats like "Mon-Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 1:00 PM"
    const weekdaysMatch = workingHours.match(/Mon-Fri:\s*(\d+:\d+\s*[AP]M)\s*-\s*(\d+:\d+\s*[AP]M)/i);
    const saturdayMatch = workingHours.match(/Sat:\s*(\d+:\d+\s*[AP]M)\s*-\s*(\d+:\d+\s*[AP]M)/i);
    
    if (!weekdaysMatch) {
      // Fallback to default hours if parsing fails
      return {
        weekdays: { start: '8:00 AM', end: '5:00 PM' },
        saturday: { start: '8:00 AM', end: '1:00 PM' }
      };
    }
    
    return {
      weekdays: {
        start: weekdaysMatch[1].trim(),
        end: weekdaysMatch[2].trim()
      },
      saturday: saturdayMatch ? {
        start: saturdayMatch[1].trim(),
        end: saturdayMatch[2].trim()
      } : {
        start: '8:00 AM',
        end: '1:00 PM'
      }
    };
  } catch (error) {
    console.error('Error parsing working hours:', error);
    // Return default hours on error
    return {
      weekdays: { start: '8:00 AM', end: '5:00 PM' },
      saturday: { start: '8:00 AM', end: '1:00 PM' }
    };
  }
};

export const isTimeInRange = (time: string, startTime: string, endTime: string): boolean => {
  const parseTime = (timeStr: string): number => {
    if (!timeStr) return 0;
    
    const match = timeStr.toLowerCase().match(/(\d+):(\d+)\s*(am|pm)/);
    if (!match) return 0;
    
    const [, hoursStr, minutesStr, meridian] = match;
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    
    let adjustedHours = hours;
    if (meridian === 'pm' && hours !== 12) {
      adjustedHours = hours + 12;
    } else if (meridian === 'am' && hours === 12) {
      adjustedHours = 0;
    }
    
    return adjustedHours * 60 + minutes; // Convert to minutes for easier comparison
  };
  
  const currentMinutes = parseTime(time);
  const startMinutes = parseTime(startTime);
  const endMinutes = parseTime(endTime);
  
  return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
};

export const getCurrentTimeString = (date: Date = new Date()): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

export const isOpenNow = (workingHours?: string, date: Date = new Date()): boolean => {
  try {
    // If no working hours provided, use default bank hours
    if (!workingHours) {
      workingHours = "Mon-Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 1:00 PM";
    }
    
    // Check if it's Sunday or a holiday
    if (isSunday(date) || isHoliday(date)) {
      return false;
    }
    
    // Parse working hours
    const parsedHours = parseWorkingHours(workingHours);
    if (!parsedHours) {
      return false;
    }
    
    const currentTime = getCurrentTimeString(date);
    
    // Check if it's Saturday
    if (isSaturday(date)) {
      return isTimeInRange(currentTime, parsedHours.saturday.start, parsedHours.saturday.end);
    }
    
    // Check weekdays (Monday to Friday)
    return isTimeInRange(currentTime, parsedHours.weekdays.start, parsedHours.weekdays.end);
  } catch (error) {
    console.error('Error checking if bank is open:', error);
    return false;
  }
};

export const getNextOpenTime = (workingHours?: string, date: Date = new Date()): string => {
  try {
    if (!workingHours) {
      workingHours = "Mon-Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 1:00 PM";
    }
    
    const parsedHours = parseWorkingHours(workingHours);
    if (!parsedHours) {
      return "Contact bank for hours";
    }
    
    const currentDay = date.getDay();
    const currentTime = getCurrentTimeString(date);
    
    // If it's Sunday or holiday, next open is Monday
    if (isSunday(date) || isHoliday(date)) {
      return `Monday ${parsedHours.weekdays.start}`;
    }
    
    // If it's Saturday and past closing time, next open is Monday
    if (isSaturday(date) && !isTimeInRange(currentTime, parsedHours.saturday.start, parsedHours.saturday.end)) {
      return `Monday ${parsedHours.weekdays.start}`;
    }
    
    // If it's a weekday and past closing time, next open is tomorrow
    if (!isSaturday(date) && !isTimeInRange(currentTime, parsedHours.weekdays.start, parsedHours.weekdays.end)) {
      const tomorrow = new Date(date);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      if (isSunday(tomorrow) || isHoliday(tomorrow)) {
        return `Monday ${parsedHours.weekdays.start}`;
      } else if (isSaturday(tomorrow)) {
        return `Saturday ${parsedHours.saturday.start}`;
      } else {
        return `Tomorrow ${parsedHours.weekdays.start}`;
      }
    }
    
    return "Open now";
  } catch (error) {
    console.error('Error getting next open time:', error);
    return "Contact bank for hours";
  }
};
