
export interface Branch {
  branch_code: string;
  branch_name: string;
  contactInfo?: string;
  workingHours?: string;
  location?: string;
}

export interface Bank {
  bank_name: string;
  bank_code: string;
  icon?: string; // <-- Add this
  contactInfo?: string;
  workingHours?: string;
  location?: string;
  branches: Branch[];
}

export interface BankWithMatchedBranch extends Bank {
  matchedBranch?: Branch;
}

