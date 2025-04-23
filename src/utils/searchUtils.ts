
import { Bank, BankWithMatchedBranch } from "@/types/bank";

export const searchBanks = (
  banks: Bank[],
  searchTerm: string,
  selectedBank: string | null
): BankWithMatchedBranch[] => {
  if (!searchTerm && !selectedBank) return [];
  
  const term = searchTerm.toLowerCase();
  const filtered = selectedBank 
    ? banks.filter(bank => bank.bank_name === selectedBank)
    : banks;

  return filtered
    .map(bank => {
      // Check if bank name or bank code matches
      const bankNameMatch = bank.bank_name.toLowerCase().includes(term);
      const bankCodeMatch = bank.bank_code.toLowerCase().includes(term);
      
      // Find matching branches
      const matchedBranch = bank.branches.find(branch => 
        branch.branch_name.toLowerCase().includes(term) || 
        branch.branch_code.toLowerCase().includes(term)
      );
      
      // Return the bank with matched branch if we have a match
      if (bankNameMatch || bankCodeMatch || matchedBranch) {
        return {
          ...bank,
          matchedBranch: matchedBranch
        };
      }
      
      return null;
    })
    .filter(result => result !== null) as BankWithMatchedBranch[];
};
