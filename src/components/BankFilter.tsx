
import { Bank } from "@/types/bank";
import { ChevronDown, Search, Building2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface BankFilterProps {
  banks: Bank[];
  onSelectBank: (bankName: string | null) => void;
  selectedBank: string | null;
}

const BankFilter = ({ banks, onSelectBank, selectedBank }: BankFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const filterRef = useRef<HTMLDivElement>(null);
  
  // Get unique bank names and sort them alphabetically
  const uniqueBankNames = Array.from(new Set(banks.map((bank) => bank.bank_name)))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  
  // Filter banks based on search term
  const filteredBanks = uniqueBankNames.filter(bankName =>
    bankName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown when pressing Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleBankSelect = (bankName: string | null) => {
    onSelectBank(bankName);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div ref={filterRef} className="relative w-full max-w-xs">
      <button
        className="bank-input flex items-center justify-between w-full px-4 py-3 shadow-sm hover:shadow-md transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Filter by bank"
      >
        <span className="text-sm font-medium truncate">
          {selectedBank || "Filter by Bank"}
        </span>
        <ChevronDown 
          size={16} 
          className={`text-bank-primary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-80 overflow-hidden">
          {/* Search input within filter */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bank-primary" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search banks..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bank-primary/50 focus:border-bank-primary transition-colors"
                autoFocus
              />
            </div>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {/* All Banks option */}
            <button
              className={`flex w-full px-4 py-3 text-sm hover:bg-bank-primary/5 transition-colors ${
                selectedBank === null ? "bg-bank-primary/10 text-bank-primary font-semibold" : ""
              }`}
              onClick={() => handleBankSelect(null)}
            >
              <Building2 size={16} className="mr-3 text-bank-secondary" />
              All Banks ({uniqueBankNames.length})
            </button>
            
            {/* Bank options */}
            {filteredBanks.length > 0 ? (
              filteredBanks.map((bankName) => (
                <button
                  key={bankName}
                  className={`flex w-full px-4 py-3 text-sm hover:bg-bank-primary/5 transition-colors ${
                    selectedBank === bankName ? "bg-bank-primary/10 text-bank-primary font-semibold" : ""
                  }`}
                  onClick={() => handleBankSelect(bankName)}
                >
                  <Building2 size={16} className="mr-3 text-bank-primary" />
                  <span className="truncate">{bankName}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-6 text-sm text-muted-foreground text-center">
                <Building2 size={24} className="mx-auto mb-2 text-gray-300" />
                No banks found matching "{searchTerm}"
              </div>
            )}
          </div>
          
          {/* Footer with count */}
          {searchTerm && (
            <div className="px-4 py-3 text-xs text-muted-foreground border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center">
                <span>{filteredBanks.length} of {uniqueBankNames.length} banks</span>
                <span className="text-bank-primary font-medium">Filtered</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BankFilter;
