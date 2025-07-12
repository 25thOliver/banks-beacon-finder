
import { Bank, BankWithMatchedBranch } from "@/types/bank";

export const searchBanks = (
  banks: Bank[],
  searchTerm: string,
  selectedBank: string | null
): BankWithMatchedBranch[] => {
  if (!searchTerm && !selectedBank) return [];
  
  const term = searchTerm.toLowerCase().trim();
  const filtered = selectedBank 
    ? banks.filter(bank => bank.bank_name === selectedBank)
    : banks;

  const results = filtered
    .map(bank => {
      // Check if bank name or bank code matches
      const bankNameMatch = bank.bank_name.toLowerCase().includes(term);
      const bankCodeMatch = bank.bank_code.toLowerCase().includes(term);
      const bankLocationMatch = bank.location?.toLowerCase().includes(term);
      
      // Find all matching branches for this bank
      const matchedBranches = bank.branches?.filter(branch => {
        const branchNameMatch = branch.branch_name.toLowerCase().includes(term);
        const branchCodeMatch = branch.branch_code.toLowerCase().includes(term);
        const branchLocationMatch = branch.location?.toLowerCase().includes(term);
        
        return branchNameMatch || branchCodeMatch || branchLocationMatch;
      }) || [];
      
      // Return the bank with matched branches if we have any matches
      if (bankNameMatch || bankCodeMatch || bankLocationMatch || matchedBranches.length > 0) {
        return {
          ...bank,
          matchedBranches: matchedBranches,
          // For backward compatibility, keep the first matched branch
          matchedBranch: matchedBranches[0]
        };
      }
      
      return null;
    })
    .filter(result => result !== null) as BankWithMatchedBranch[];
  
  // Sort results alphabetically by bank name
  return results.sort((a, b) => a.bank_name.localeCompare(b.bank_name));
};

// Enhanced search with fuzzy matching and better scoring
export const searchBanksAdvanced = (
  banks: Bank[],
  searchTerm: string,
  selectedBank: string | null
): BankWithMatchedBranch[] => {
  if (!searchTerm && !selectedBank) return [];
  
  const term = searchTerm.toLowerCase().trim();
  const searchWords = term.split(/\s+/).filter(word => word.length > 0);
  
  const filtered = selectedBank 
    ? banks.filter(bank => bank.bank_name === selectedBank)
    : banks;

  const results = filtered
    .map(bank => {
      let bankScore = 0;
      let matchedBranches: Array<{ branch: any; score: number }> = [];
      
      // Score bank-level matches (only name, code, location)
      const bankNameLower = bank.bank_name.toLowerCase();
      const bankCodeLower = bank.bank_code.toLowerCase();
      const bankLocationLower = bank.location?.toLowerCase() || '';
      
      searchWords.forEach(word => {
        // Exact matches get higher scores
        if (bankNameLower === word) bankScore += 100;
        else if (bankNameLower.includes(word)) bankScore += 50;
        
        if (bankCodeLower === word) bankScore += 80;
        else if (bankCodeLower.includes(word)) bankScore += 40;
        
        if (bankLocationLower.includes(word)) bankScore += 30;
      });
      
      // Score branch-level matches (only name, code, location)
      bank.branches?.forEach(branch => {
        let branchScore = 0;
        const branchNameLower = branch.branch_name.toLowerCase();
        const branchCodeLower = branch.branch_code.toLowerCase();
        const branchLocationLower = branch.location?.toLowerCase() || '';
        
        searchWords.forEach(word => {
          // Exact matches get higher scores
          if (branchNameLower === word) branchScore += 100;
          else if (branchNameLower.includes(word)) branchScore += 50;
          
          if (branchCodeLower === word) branchScore += 80;
          else if (branchCodeLower.includes(word)) branchScore += 40;
          
          if (branchLocationLower.includes(word)) branchScore += 30;
        });
        
        if (branchScore > 0) {
          matchedBranches.push({ branch, score: branchScore });
        }
      });
      
      // Sort branches by score
      matchedBranches.sort((a, b) => b.score - a.score);
      
      const totalScore = bankScore + matchedBranches.reduce((sum, item) => sum + item.score, 0);
      
      if (totalScore > 0) {
        return {
          ...bank,
          matchedBranches: matchedBranches.map(item => item.branch),
          matchedBranch: matchedBranches[0]?.branch,
          searchScore: totalScore
        };
      }
      
      return null;
    })
    .filter(result => result !== null) as BankWithMatchedBranch[];
  
  // Sort results by search score first, then alphabetically by bank name
  return results.sort((a, b) => {
    const scoreDiff = (b.searchScore || 0) - (a.searchScore || 0);
    if (scoreDiff !== 0) return scoreDiff;
    return a.bank_name.localeCompare(b.bank_name);
  });
};

// Get all banks sorted alphabetically (for display when no search is performed)
export const getAllBanksSorted = (banks: Bank[]): Bank[] => {
  return [...banks].sort((a, b) => a.bank_name.localeCompare(b.bank_name));
};
