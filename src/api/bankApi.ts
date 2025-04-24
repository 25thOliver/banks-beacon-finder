
import banksData from '../data/banks.json';
import { Bank } from '@/types/bank';

export const fetchBanks = async (): Promise<Bank[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return banksData.banks;
};
