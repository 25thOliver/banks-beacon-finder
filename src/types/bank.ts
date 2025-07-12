
export interface ContactInfo {
  phone1?: string;
  phone2?: string;
  email?: string;
  website?: string;
}

export interface Branch {
  branch_code: string;
  branch_name: string;
  contactInfo?: ContactInfo;
  workingHours?: string;
  location?: string;
}

export interface Bank {
  id?: number;
  bank_name: string;
  bank_code: string;
  icon?: string;
  contactInfo?: ContactInfo;
  workingHours?: string;
  location?: string;
  branches?: Branch[];
  aliases?: string[];
}

export interface BankWithMatchedBranch extends Bank {
  matchedBranch?: Branch;
  matchedBranches?: Branch[];
  searchScore?: number;
}
