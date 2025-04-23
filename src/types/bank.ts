
export interface Branch {
  branch_code: string;
  branch_name: string;
}

export interface Bank {
  bank_name: string;
  bank_code: string;
  branches: Branch[];
}

export interface BankWithMatchedBranch extends Bank {
  matchedBranch?: Branch;
}
