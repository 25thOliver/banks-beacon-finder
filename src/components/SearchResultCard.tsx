
import React, { useState } from "react";
import { BankWithMatchedBranch } from "@/types/bank";
import { Phone, Clock, MapPin, Hash, Building2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { isOpenNow, getNextOpenTime } from "@/utils/dateUtils";
import { formatContactInfo, highlightMatch } from "@/utils/formatUtils";
import BankLogo from "./bank/BankLogo";
import InfoRow from "./bank/InfoRow";
import WorkingHours from "./bank/WorkingHours";
import BranchInfo from "./bank/BranchInfo";
import { LocationIcon } from "./bank/icons/LocationIcon";
import BankDetailModal from "./BankDetailModal";

interface SearchResultCardProps {
  result: BankWithMatchedBranch;
  searchTerm: string;
  index: number;
}

const SearchResultCard = ({ result, searchTerm, index }: SearchResultCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const infoData = result.matchedBranch || result;
  const contactDisplay = formatContactInfo(infoData.contactInfo);
  const openNow = isOpenNow(infoData.workingHours);
  const nextOpenTime = getNextOpenTime(infoData.workingHours);
  const hasMultipleMatches = result.matchedBranches && result.matchedBranches.length > 1;

  // Determine which location to show
  const displayLocation = result.matchedBranches && result.matchedBranches.length > 0 
    ? result.matchedBranches[0].location 
    : result.location;

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCopyBankCode = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    navigator.clipboard.writeText(result.bank_code)
      .then(() => {
        toast.success("Bank code copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy to clipboard:", err);
        toast.error("Failed to copy to clipboard");
      });
  };

  return (
    <>
      <div
        className="bank-card p-6 mb-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
        style={{ "--index": index } as React.CSSProperties}
        onClick={handleCardClick}
      >
        <div className="flex flex-wrap justify-between gap-4 items-start mb-4">
          <BankLogo icon={result.icon} bankName={result.bank_name} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <h3
                className="bank-title text-xl"
                dangerouslySetInnerHTML={{ __html: highlightMatch(result.bank_name, searchTerm) }}
              />
              <ExternalLink size={16} className="text-bank-secondary" />
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <div 
                className="bank-badge bank-badge-primary cursor-pointer hover:bg-bank-primary/80 transition-colors"
                onClick={handleCopyBankCode}
              >
                <Hash size={14} className="mr-1" />
                Bank Code: {" "}
                <span dangerouslySetInnerHTML={{ __html: highlightMatch(result.bank_code, searchTerm) }} />
              </div>
              
              {displayLocation && (
                <div className="bank-badge bank-badge-info">
                  <MapPin size={14} className="mr-1" />
                  <span dangerouslySetInnerHTML={{ __html: highlightMatch(displayLocation, searchTerm) }} />
                </div>
              )}
              
              <div className={`bank-badge ${openNow ? 'bank-badge-success' : 'bank-badge-warning'}`}>
                <Clock size={14} className="mr-1" />
                {openNow ? "Open Now" : `Closed - Opens ${nextOpenTime}`}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-3">
            <InfoRow icon={<Phone size={16} className="text-bank-primary" />} value={contactDisplay} label="Contact" />
            <InfoRow icon={<LocationIcon />} value={displayLocation} label="Location" />
          </div>
          <InfoRow 
            icon={<Clock size={16} className="text-bank-primary" />} 
            value={<WorkingHours hours={infoData.workingHours} />} 
            label="Working Hours" 
          />
        </div>

        {/* Show matched branches */}
        {result.matchedBranches && result.matchedBranches.length > 0 ? (
          <div className="mt-4">
            <h4 className="bank-subtitle text-base mb-3 flex items-center">
              <Building2 size={16} className="mr-2 text-bank-secondary" />
              {hasMultipleMatches 
                ? `${result.matchedBranches.length} matching branches found`
                : "Matching branch"
              }
            </h4>
            <div className="space-y-3">
              {result.matchedBranches.slice(0, hasMultipleMatches ? 3 : 1).map((branch, branchIndex) => (
                <div key={branch.branch_code} className="bg-bank-primary/5 border border-bank-primary/20 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h5
                        className="font-semibold text-bank-primary mb-1"
                        dangerouslySetInnerHTML={{ __html: highlightMatch(branch.branch_name, searchTerm) }}
                      />
                      {branch.location && (
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin size={12} className="mr-1" />
                          <span dangerouslySetInnerHTML={{ __html: highlightMatch(branch.location, searchTerm) }} />
                        </p>
                      )}
                    </div>
                    <div className="bank-badge bank-badge-secondary ml-3">
                      <Hash size={12} className="mr-1" />
                      Branch Code: {" "}
                      <span
                        dangerouslySetInnerHTML={{ __html: highlightMatch(branch.branch_code, searchTerm) }}
                      />
                    </div>
                  </div>
                  {branch.contactInfo && (
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Phone size={12} className="mr-1" />
                      {formatContactInfo(branch.contactInfo)}
                    </div>
                  )}
                </div>
              ))}
              {hasMultipleMatches && result.matchedBranches.length > 3 && (
                <div className="text-center py-3 text-sm text-muted-foreground bg-gray-50 rounded-lg">
                  +{result.matchedBranches.length - 3} more matching branches
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <h4 className="bank-subtitle text-base mb-3">
              {result.branches?.length || 0} {result.branches?.length === 1 ? "branch" : "branches"} available
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.branches?.slice(0, 3).map((branch) => (
                <BranchInfo
                  key={branch.branch_code}
                  branch={branch}
                  searchTerm={searchTerm}
                  highlightMatch={(text) => highlightMatch(text, searchTerm)}
                />
              ))}
              {result.branches && result.branches.length > 3 && (
                <div className="text-sm p-3 text-center text-muted-foreground bg-gray-50 rounded-lg">
                  +{result.branches.length - 3} more
                </div>
              )}
            </div>
          </div>
        )}

        {/* Click hint */}
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Click to view detailed information
          </p>
        </div>
      </div>

      {/* Bank Detail Modal */}
      <BankDetailModal
        bank={result}
        searchTerm={searchTerm}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default SearchResultCard;
