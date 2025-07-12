import React from "react";
import { X, Phone, Clock, MapPin, Hash, Building2, Globe, Mail } from "lucide-react";
import { BankWithMatchedBranch } from "@/types/bank";
import { formatContactInfo, highlightMatch } from "@/utils/formatUtils";
import { isOpenNow, getNextOpenTime } from "@/utils/dateUtils";
import BankLogo from "./bank/BankLogo";
import WorkingHours from "./bank/WorkingHours";
import BranchInfo from "./bank/BranchInfo";

interface BankDetailModalProps {
  bank: BankWithMatchedBranch | null;
  searchTerm: string;
  isOpen: boolean;
  onClose: () => void;
}

const BankDetailModal = ({ bank, searchTerm, isOpen, onClose }: BankDetailModalProps) => {
  if (!bank || !isOpen) return null;

  const infoData = bank.matchedBranch || bank;
  const contactDisplay = formatContactInfo(infoData.contactInfo);
  const openNow = isOpenNow(bank.workingHours);
  const nextOpenTime = getNextOpenTime(bank.workingHours);
  const hasMultipleMatches = bank.matchedBranches && bank.matchedBranches.length > 1;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BankLogo icon={bank.icon} bankName={bank.bank_name} />
              <div>
                <h2
                  className="bank-title text-2xl"
                  dangerouslySetInnerHTML={{ __html: highlightMatch(bank.bank_name, searchTerm) }}
                />
                <p className="text-muted-foreground">
                  Bank Code: <span className="font-mono">{bank.bank_code}</span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Bank Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="bank-subtitle text-lg flex items-center">
                <Phone size={20} className="mr-2 text-bank-primary" />
                Contact Information
              </h3>
              <div className="space-y-3">
                {infoData.contactInfo?.phone1 && (
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-bank-secondary" />
                    <div>
                      <p className="font-medium">{infoData.contactInfo.phone1}</p>
                      <p className="text-sm text-muted-foreground">Primary Phone</p>
                    </div>
                  </div>
                )}
                {infoData.contactInfo?.phone2 && (
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-bank-secondary" />
                    <div>
                      <p className="font-medium">{infoData.contactInfo.phone2}</p>
                      <p className="text-sm text-muted-foreground">Secondary Phone</p>
                    </div>
                  </div>
                )}
                {infoData.contactInfo?.email && (
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-bank-secondary" />
                    <div>
                      <p className="font-medium">{infoData.contactInfo.email}</p>
                      <p className="text-sm text-muted-foreground">Email</p>
                    </div>
                  </div>
                )}
                {infoData.contactInfo?.website && (
                  <div className="flex items-center gap-3">
                    <Globe size={16} className="text-bank-secondary" />
                    <div>
                      <a
                        href={infoData.contactInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-bank-primary hover:underline"
                      >
                        {infoData.contactInfo.website}
                      </a>
                      <p className="text-sm text-muted-foreground">Website</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Location & Hours */}
            <div className="space-y-4">
              <h3 className="bank-subtitle text-lg flex items-center">
                <MapPin size={20} className="mr-2 text-bank-primary" />
                Location & Hours
              </h3>
              <div className="space-y-3">
                {infoData.location && (
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-bank-secondary mt-1" />
                    <div>
                      <p className="font-medium">{infoData.location}</p>
                      <p className="text-sm text-muted-foreground">Address</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-bank-secondary mt-1" />
                  <div>
                    <WorkingHours hours={infoData.workingHours} />
                    <p className="text-sm text-muted-foreground">Working Hours</p>
                  </div>
                </div>
                <div className={`bank-badge ${openNow ? 'bank-badge-success' : 'bank-badge-warning'}`}>
                  <Clock size={14} className="mr-1" />
                  {openNow ? "Open Now" : `Closed - Opens ${nextOpenTime}`}
                </div>
              </div>
            </div>
          </div>

          {/* Branches Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="bank-subtitle text-lg mb-4 flex items-center">
              <Building2 size={20} className="mr-2 text-bank-primary" />
              {hasMultipleMatches 
                ? `${bank.matchedBranches?.length || 0} Matching Branches`
                : "All Branches"
              }
            </h3>

            {bank.matchedBranches && bank.matchedBranches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bank.matchedBranches.map((branch) => (
                  <div key={branch.branch_code} className="bank-card p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4
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
                        {branch.branch_code}
                      </div>
                    </div>
                    {branch.contactInfo && (
                      <div className="space-y-2 text-sm">
                        {branch.contactInfo.phone1 && (
                          <div className="flex items-center gap-2">
                            <Phone size={12} className="text-bank-secondary" />
                            <span>{branch.contactInfo.phone1}</span>
                          </div>
                        )}
                        {branch.contactInfo.email && (
                          <div className="flex items-center gap-2">
                            <Mail size={12} className="text-bank-secondary" />
                            <span>{branch.contactInfo.email}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bank.branches?.slice(0, 6).map((branch) => (
                  <BranchInfo
                    key={branch.branch_code}
                    branch={branch}
                    searchTerm={searchTerm}
                    highlightMatch={(text) => highlightMatch(text, searchTerm)}
                  />
                ))}
                {bank.branches && bank.branches.length > 6 && (
                  <div className="text-sm p-4 text-center text-muted-foreground bg-gray-50 rounded-lg">
                    +{bank.branches.length - 6} more branches
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-2xl">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Click outside or press ESC to close
            </div>
            <button
              onClick={onClose}
              className="bank-button bg-bank-primary text-white hover:bg-bank-primary/90"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetailModal; 