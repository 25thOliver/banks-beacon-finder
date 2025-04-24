
import { Bank } from "@/types/bank";
import sampleData from "@/data/sample-data.json";

// This is a template for connecting to a real API endpoint
const API_URL = "https://your-api-endpoint.com/banks";

export const fetchBanks = async (): Promise<Bank[]> => {
  // Uncomment this when you have a real API
  // try {
  //   const response = await fetch(API_URL);
  //   
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! Status: ${response.status}`);
  //   }
  //   
  //   const data = await response.json();
  //   return data as Bank[];
  // } catch (error) {
  //   console.error("Error fetching bank data:", error);
  //   throw error;
  // }

  // For now, return sample data
  return sampleData as Bank[];
};
