
export interface ContactInfo {
  phone1?: string;
  phone2?: string;
  email?: string;
}

export interface Branch {
  branch_code: string;
  branch_name: string;
  contactInfo?: ContactInfo;
  workingHours?: string;
  location?: string;
}

export interface Bank {
  bank_name: string;
  bank_code: string;
  icon?: string;
  contactInfo?: ContactInfo;
  workingHours?: string;
  location?: string;
  branches: Branch[];
  aliases?: string[]; // Added for the aliases field in your data
}

export interface BankWithMatchedBranch extends Bank {
  matchedBranch?: Branch;
}
