
import { Phone, Clock } from "lucide-react";
import InfoRow from "./InfoRow";
import { Branch } from "@/types/bank";
import { formatContactInfo, highlightMatch } from "@/utils/formatUtils";
import WorkingHours from "./WorkingHours";
import { isOpenNow } from "@/utils/dateUtils";
import { LocationIcon } from "./icons/LocationIcon";

interface BranchInfoProps {
  branch: Branch;
  searchTerm: string;
  highlightMatch: (text: string) => string;
}

const BranchInfo = ({ branch, searchTerm, highlightMatch }: BranchInfoProps) => {
  const isBranchOpen = isOpenNow(branch.workingHours);

  return (
    <div className="text-sm p-2 bg-secondary rounded flex flex-col gap-1">
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
        <InfoRow icon={<Clock size={14} />} value={<WorkingHours hours={branch.workingHours} />} label="Hours" />
        <InfoRow icon={<LocationIcon />} value={branch.location} label="Location" />
      </div>
    </div>
  );
};

export default BranchInfo;
