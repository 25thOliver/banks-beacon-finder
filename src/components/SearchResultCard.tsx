
import { BankWithMatchedBranch } from "@/types/bank";
import { Phone, Clock } from "lucide-react";
import { toast } from "sonner";
import { isOpenNow } from "@/utils/dateUtils";
import { formatContactInfo, highlightMatch } from "@/utils/formatUtils";
import BankLogo from "./bank/BankLogo";
import InfoRow from "./bank/InfoRow";
import WorkingHours from "./bank/WorkingHours";
import BranchInfo from "./bank/BranchInfo";
import { LocationIcon } from "./bank/icons/LocationIcon";

interface SearchResultCardProps {
  result: BankWithMatchedBranch;
  searchTerm: string;
  index: number;
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      toast.success("Bank code copied to clipboard");
    })
    .catch((err) => {
      console.error("Failed to copy to clipboard:", err);
      toast.error("Failed to copy to clipboard");
    });
};

const SearchResultCard = ({ result, searchTerm, index }: SearchResultCardProps) => {
  const infoData = result.matchedBranch || result;
  const contactDisplay = formatContactInfo(infoData.contactInfo);
  const openNow = isOpenNow();

  return (
    <div
      className="search-result bg-white rounded-lg border shadow-sm p-4 mb-3 hover:shadow-md transition-shadow cursor-pointer"
      style={{ "--index": index } as React.CSSProperties}
      onClick={() => copyToClipboard(result.bank_code)}
    >
      <div className="flex flex-wrap justify-between gap-4 items-start">
        <BankLogo icon={result.icon} bankName={result.bank_name} />

        <div className="flex-1 min-w-0 mb-2">
          <h3
            className="font-medium text-lg"
            dangerouslySetInnerHTML={{ __html: highlightMatch(result.bank_name, searchTerm) }}
          />
          <div className="inline-flex items-center px-2 py-1 bg-primary/10 rounded text-sm font-medium text-primary">
            Bank Code: {" "}
            <span dangerouslySetInnerHTML={{ __html: highlightMatch(result.bank_code, searchTerm) }} />
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

      <div className="mt-2 flex justify-between items-start max-w-3xl">
        <div className="space-y-2">
          <InfoRow icon={<Phone size={16} />} value={contactDisplay} label="Contact" />
          <InfoRow icon={<LocationIcon />} value={infoData.location} label="Location" />
        </div>
        <InfoRow 
          icon={<Clock size={16} />} 
          value={<WorkingHours hours={infoData.workingHours} />} 
          label="Working Hours" 
        />
      </div>

      {result.matchedBranch ? (
        <div className="mt-3 p-3 bg-secondary rounded-md">
          <div className="flex justify-between">
            <h4
              className="font-medium"
              dangerouslySetInnerHTML={{ __html: highlightMatch(result.matchedBranch.branch_name, searchTerm) }}
            />
            <div className="inline-flex items-center px-2 py-1 bg-accent/10 rounded text-xs font-medium text-accent">
              Branch Code: {" "}
              <span
                dangerouslySetInnerHTML={{ __html: highlightMatch(result.matchedBranch.branch_code, searchTerm) }}
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
            {result.branches.slice(0, 3).map((branch) => (
              <BranchInfo
                key={branch.branch_code}
                branch={branch}
                searchTerm={searchTerm}
                highlightMatch={(text) => highlightMatch(text, searchTerm)}
              />
            ))}
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
