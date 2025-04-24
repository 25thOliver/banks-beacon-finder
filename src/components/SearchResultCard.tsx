
import { BankWithMatchedBranch } from "@/types/bank";
import { MapPin, Phone, Clock, Image as ImageIcon } from "lucide-react";

interface SearchResultCardProps {
  result: BankWithMatchedBranch;
  searchTerm: string;
  index: number;
}

const InfoRow = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value?: string;
  label: string;
}) =>
  value ? (
    <div className="flex items-center gap-2 text-sm mb-1">
      <span className="inline-flex items-center justify-center w-4 h-4 text-primary">{icon}</span>
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  ) : null;

const SearchResultCard = ({
  result,
  searchTerm,
  index,
}: SearchResultCardProps) => {
  // Function to highlight matching terms
  const highlightMatch = (text: string) => {
    if (!searchTerm || searchTerm.length < 2) return text;
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    return text.replace(regex, '<span class="highlight">$1</span>');
  };

  // Use info from matched branch or fall back to bank-level info
  const infoData = result.matchedBranch || result;
  
  // Format contact info
  const formatContactInfo = (contactInfo?: any): string | undefined => {
    if (!contactInfo) return undefined;
    
    // Handle if contactInfo is an object with phone1, phone2, email
    if (typeof contactInfo === 'object') {
      return [contactInfo.phone1, contactInfo.phone2, contactInfo.email]
        .filter(Boolean)
        .join(" / ");
    }
    
    // Handle if contactInfo is a string (legacy data)
    return contactInfo.toString();
  };
  
  const contactDisplay = formatContactInfo(infoData.contactInfo);

  return (
    <div
      className="search-result bg-white rounded-lg border shadow-sm p-4 mb-3 hover:shadow-md transition-shadow"
      style={{ "--index": index } as React.CSSProperties}
    >
      <div className="flex flex-wrap justify-between gap-4 items-start">
        {/* ICON SECTION */}
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
            dangerouslySetInnerHTML={{
              __html: highlightMatch(result.bank_name),
            }}
          />
          <div className="inline-flex items-center px-2 py-1 bg-primary/10 rounded text-sm font-medium text-primary">
            Bank Code: <span dangerouslySetInnerHTML={{ __html: highlightMatch(result.bank_code) }} />
          </div>
        </div>
      </div>

      {/* Display Info Section */}
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-3xl">
        <InfoRow
          icon={<Phone size={16} />}
          value={contactDisplay}
          label="Contact"
        />
        <InfoRow
          icon={<Clock size={16} />}
          value={infoData.workingHours}
          label="Hours"
        />
        <InfoRow
          icon={<MapPin size={16} />}
          value={infoData.location}
          label="Location"
        />
      </div>

      {result.matchedBranch ? (
        <div className="mt-3 p-3 bg-secondary rounded-md">
          <div className="flex justify-between">
            <h4
              className="font-medium"
              dangerouslySetInnerHTML={{
                __html: highlightMatch(result.matchedBranch.branch_name),
              }}
            />
            <div className="inline-flex items-center px-2 py-1 bg-accent/10 rounded text-xs font-medium text-accent">
              Branch Code:{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: highlightMatch(result.matchedBranch.branch_code),
                }}
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
              <div
                key={branch.branch_code}
                className="text-sm p-2 bg-secondary rounded flex flex-col gap-1"
              >
                <div className="flex justify-between">
                  <span
                    dangerouslySetInnerHTML={{ __html: highlightMatch(branch.branch_name) }}
                  />
                  <span className="text-xs text-muted-foreground">{branch.branch_code}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  <InfoRow 
                    icon={<Phone size={14} />} 
                    value={formatContactInfo(branch.contactInfo)} 
                    label="Contact" 
                  />
                  <InfoRow icon={<Clock size={14} />} value={branch.workingHours} label="Hours" />
                  <InfoRow icon={<MapPin size={14} />} value={branch.location} label="Location" />
                </div>
              </div>
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
