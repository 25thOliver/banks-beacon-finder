
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface WorkingHoursProps {
  hours?: string;
}

const WorkingHours = ({ hours }: WorkingHoursProps) => {
  const defaultHours = {
    weekdays: "Mon–Fri: 8:00 AM – 5:00 PM",
    saturday: "Sat: 8:00 AM – 1:00 PM",
    holidays: "Sun & Public Holidays: Closed"
  };
  const isDefault = !hours || hours.trim() === "";

  return (
    <div className="flex flex-col gap-1">
      {isDefault ? (
        <>
          <div className="text-sm">
            <div className="text-green-600 font-medium">{defaultHours.weekdays}</div>
            <div className="text-orange-600 font-medium">{defaultHours.saturday}</div>
            <div className="text-red-600 font-medium">{defaultHours.holidays}</div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info size={16} className="text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="text-xs max-w-xs">
                <div className="space-y-1">
                  <p>This is a default schedule and may not reflect the bank's actual working hours.</p>
                  <p className="font-medium">Public holidays include:</p>
                  <ul className="text-xs space-y-1">
                    <li>• New Year's Day, Labour Day</li>
                    <li>• Madaraka Day, Mashujaa Day</li>
                    <li>• Jamhuri Day, Christmas Day</li>
                    <li>• Easter Monday, Eid al-Adha</li>
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      ) : (
        <div className="text-sm">{hours}</div>
      )}
    </div>
  );
};

export default WorkingHours;
