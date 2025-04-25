import { BankWithMatchedBranch } from "@/types/bank";
import { MapPin, Phone, Clock, Image as ImageIcon, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SearchResultCardProps {
  result: BankWithMatchedBranch;
  searchTerm: string;
  index: number;
}

const InfoRow = ({
  icon,
  value,
  label,
  className = "",
}: {
  icon: React.ReactNode;
  value?: React.ReactNode;
  label: string;
  className?: string;
}) =>
  value ? (
    <div className={`flex items-center gap-2 text-sm mb-1 ${className}`}>
      <span className="inline-flex items-center justify-center w-4 h-4 text-primary">{icon}</span>
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  ) : null;

const isOpenNow = (date = new Date()): boolean => {
  const day = date.getDay();
  const hour = date.getHours();
  if (day === 0) return false; // Sunday
  if (day >= 1 && day <= 5) return hour >= 8 && hour < 16; // Weekdays
  if (day === 6) return hour >= 8 && hour < 12; // Saturday
  return false;
};

const formatContactInfo = (contactInfo?: any): string => {
  if (!contactInfo || typeof contactInfo !== "object") return "No contact info available";

  const contactParts = [contactInfo.phone1, contactInfo.phone2, contactInfo.email]
    .filter((val) => val && val.trim() !== "");

  return contactParts.length ? contactParts.join(" / ") : "No contact info available";
};

const formatWorkingHours = (hours?: string): JSX.Element => {
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

const SearchResultCard = ({
  result,
  searchTerm,
  index,
}: SearchResultCardProps) => {
  const highlightMatch = (text: string) => {
    if (!searchTerm || searchTerm.length < 2) return text;
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    return text.replace(regex, '<span class="highlight">$1</span>');
  };

  const infoData = result.matchedBranch || result;
  const contactDisplay = formatContactInfo(infoData.contactInfo);
  const openNow = isOpenNow();

  return (
    <div
      className="search-result bg-white rounded-lg border shadow-sm p-4 mb-3 hover:shadow-md transition-shadow"
      style={{ "--index": index } as React.CSSProperties}
    >
      <div className="flex flex-wrap justify-between gap-4 items-start">
        <div className="flex-shrink-0 mr-4">
          {result.icon ? (
            <img
              src={result.icon}
              alt={`${result.bank_name} logo`}
              className="w-12 h-12 object-contain rounded bg-gray-50 border"
              loading="lazy"
            />
          ) : (
            <span className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded border text-gray-400">
              <ImageIcon size={32} />
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0 mb-2">
          <h3
            className="font-medium text-lg"
            dangerouslySetInnerHTML={{ __html: highlightMatch(result.bank_name) }}
          />
          <div className="inline-flex items-center px-2 py-1 bg-primary/10 rounded text-sm font-medium text-primary">
            Bank Code:{" "}
            <span dangerouslySetInnerHTML={{ __html: highlightMatch(result.bank_code) }} />
          </div>
          <div className="mt-1">
            <span
              className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${
                openNow ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {openNow ? "Open Now" : "Closed"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-1 sm:grid-cols-[1fr_1fr_2fr] gap-4 max-w-3xl">
        <InfoRow icon={<Phone size={16} />} value={contactDisplay} label="Contact" />
        <InfoRow icon={<MapPin size={16} />} value={infoData.location} label="Location" />
        <InfoRow 
          icon={<Clock size={16} />} 
          value={formatWorkingHours(infoData.workingHours)} 
          label="Hours" 
          className="justify-self-end"
        />
      </div>

      {result.matchedBranch ? (
        <div className="mt-3 p-3 bg-secondary rounded-md">
          <div className="flex justify-between">
            <h4
              className="font-medium"
              dangerouslySetInnerHTML={{ __html: highlightMatch(result.matchedBranch.branch_name) }}
            />
            <div className="inline-flex items-center px-2 py-1 bg-accent/10 rounded text-xs font-medium text-accent">
              Branch Code:{" "}
              <span
                dangerouslySetInnerHTML={{ __html: highlightMatch(result.matchedBranch.branch_code) }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-3">
          <h4 className="text-sm font-medium text-muted-foreground">
            {result.branches.length} {result.branches.length === 1 ? "branch" : "branches"} available
          </h4>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {result.branches.slice(0, 3).map((branch) => {
              const isBranchOpen = isOpenNow();
              return (
                <div
                  key={branch.branch_code}
                  className="text-sm p-2 bg-secondary rounded flex flex-col gap-1"
                >
                  <div className="flex justify-between items-center">
                    <span
                      dangerouslySetInnerHTML={{ __html: highlightMatch(branch.branch_name) }}
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{branch.branch_code}</span>
                      <span
                        className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-full ${
                          isBranchOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {isBranchOpen ? "Open" : "Closed"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <InfoRow icon={<Phone size={14} />} value={formatContactInfo(branch.contactInfo)} label="Contact" />
                    <InfoRow icon={<Clock size={14} />} value={formatWorkingHours(branch.workingHours)} label="Hours" />
                    <InfoRow icon={<MapPin size={14} />} value={branch.location} label="Location" />
                  </div>
                </div>
              );
            })}
            {result.branches.length > 3 && (
              <div className="text-sm p-2 text-center text-muted-foreground">
                +{result.branches.length - 3} more
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultCard;
