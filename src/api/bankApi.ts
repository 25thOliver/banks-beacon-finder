import banksData from '../data/banks_and_branches_structured.json';
import { Bank } from '@/types/bank';

export const fetchBanks = async (): Promise<Bank[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return banksData as Bank[];
};
