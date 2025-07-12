import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import SearchHeader from "@/components/SearchHeader";
import WelcomeSection from "@/components/WelcomeSection";
import SearchResultsSection from "@/components/SearchResultsSection";
import HomeCarousel from "@/components/HomeCarousel";
import Footer from "@/components/Footer";
import { Bank, BankWithMatchedBranch } from "@/types/bank";
import { searchBanks, searchBanksAdvanced, getAllBanksSorted } from "@/utils/searchUtils";
// Import the enhanced data instead of the original
import banksData from "@/data/enhanced_banks_data.json";

const fetchBanks = async (): Promise<Bank[]> => {
  return banksData;
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [results, setResults] = useState<BankWithMatchedBranch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadBanks = async () => {
      setIsLoading(true);
      try {
        const data = await fetchBanks();
        // Sort banks alphabetically for better UX
        const sortedBanks = getAllBanksSorted(data);
        setBanks(sortedBanks);
      } catch (error) {
        console.error("Failed to load banks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadBanks();
  }, []);

  const handleSearch = (term: string) => {
    setIsLoading(true);
    setSearchTerm(term);
    setHasSearched(true);
    setCurrentPage(1);
    setTimeout(() => {
      // Use the advanced search for better results
      const searchResults = searchBanksAdvanced(banks, term, selectedBank);
      setResults(searchResults);
      setIsLoading(false);
    }, 500);
  };

  const handleBankFilter = (bankName: string | null) => {
    setSelectedBank(bankName);
    setCurrentPage(1);
    if (searchTerm || bankName) {
      setIsLoading(true);
      setTimeout(() => {
        const searchResults = searchBanksAdvanced(banks, searchTerm, bankName);
        setResults(searchResults);
        setIsLoading(false);
      }, 300);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bank-light via-white to-bank-light/50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <SearchHeader />
        
        {/* Carousel Section - Only show when no search has been performed */}
        {!hasSearched && !isLoading && <HomeCarousel />}
        
        <div className="flex flex-col items-center mb-12">
          <SearchBar 
            onSearch={handleSearch} 
            loading={isLoading} 
            banks={banks}
          />
        </div>
        
        {hasSearched && (
          <SearchResultsSection
            searchTerm={searchTerm}
            selectedBank={selectedBank}
            results={results}
            banks={banks}
            isLoading={isLoading}
            currentPage={currentPage}
            onSelectBank={handleBankFilter}
            onPageChange={handlePageChange}
          />
        )}
        
        {!hasSearched && !isLoading && <WelcomeSection />}
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
