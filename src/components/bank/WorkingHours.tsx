
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface WorkingHoursProps {
  hours?: string;
}

const WorkingHours = ({ hours }: WorkingHoursProps) => {
  const defaultHours = {
    weekdays: "Mon–Fri: 8:00 AM – 4:00 PM",
    saturday: "Sat: 8:00 AM – 12:00 PM",
    holidays: "Sun & Public Holidays: Closed"
  };
  const isDefault = !hours || hours.trim() === "";

  return (
    <div className="flex flex-col gap-1">
      {isDefault ? (
        <>
          <div className="text-red-600">
            <div>{defaultHours.weekdays}</div>
            <div>{defaultHours.saturday}</div>
            <div>{defaultHours.holidays}</div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info size={16} className="text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="text-xs max-w-xs">
                This is a default schedule and may not reflect the bank's actual working hours.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      ) : (
        <div>{hours}</div>
      )}
    </div>
  );
};

export default WorkingHours;
