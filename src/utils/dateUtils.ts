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

export const isOpenNow = (date: Date = new Date()): boolean => {
  const hour = date.getHours();
  return hour >= 8 && hour < 16;
};
