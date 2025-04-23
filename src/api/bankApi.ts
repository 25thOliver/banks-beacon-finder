
import { Bank } from "@/types/bank";

// This is a template for connecting to a real API endpoint
// Replace the URL with your actual API endpoint
const API_URL = "https://your-api-endpoint.com/banks";

export const fetchBanks = async (): Promise<Bank[]> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data as Bank[];
  } catch (error) {
    console.error("Error fetching bank data:", error);
    throw error;
  }
};

/**
 * To use this with the actual API instead of the sample data:
 * 
 * 1. In src/pages/Index.tsx, replace:
 *    
 *    useEffect(() => {
 *      setBanks(sampleData as Bank[]);
 *    }, []);
 * 
 * 2. With:
 * 
 *    useEffect(() => {
 *      const loadBanks = async () => {
 *        try {
 *          const data = await fetchBanks();
 *          setBanks(data);
 *        } catch (error) {
 *          console.error("Failed to load banks:", error);
 *          // Handle error state
 *        }
 *      };
 *      
 *      loadBanks();
 *    }, []);
 */
