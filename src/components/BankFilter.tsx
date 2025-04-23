
import { Bank } from "@/types/bank";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface BankFilterProps {
  banks: Bank[];
  onSelectBank: (bankName: string | null) => void;
  selectedBank: string | null;
}

const BankFilter = ({ banks, onSelectBank, selectedBank }: BankFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueBankNames = Array.from(new Set(banks.map((bank) => bank.bank_name)));
  
  return (
    <div className="relative w-full max-w-xs">
      <button
        className="flex items-center justify-between w-full px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm">{selectedBank || "Filter by Bank"}</span>
        <ChevronDown size={16} className="text-muted-foreground" />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
          <div className="py-1">
            <button
              className="flex w-full px-4 py-2 text-sm hover:bg-secondary"
              onClick={() => {
                onSelectBank(null);
                setIsOpen(false);
              }}
            >
              All Banks
            </button>
            {uniqueBankNames.map((bankName) => (
              <button
                key={bankName}
                className={`flex w-full px-4 py-2 text-sm hover:bg-secondary ${
                  selectedBank === bankName ? "bg-secondary font-medium" : ""
                }`}
                onClick={() => {
                  onSelectBank(bankName);
                  setIsOpen(false);
                }}
              >
                {bankName}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BankFilter;
