
import { Bank } from "@/types/bank";
import sampleData from "@/data/sample-data.json";

export const fetchBanks = async (): Promise<Bank[]> => {
  // Using local JSON data instead of API call
  return sampleData as Bank[];
};
