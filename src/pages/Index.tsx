
import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import SearchHeader from "@/components/SearchHeader";
import WelcomeSection from "@/components/WelcomeSection";
import SearchResultsSection from "@/components/SearchResultsSection";
import Footer from "@/components/Footer";
import { Bank, BankWithMatchedBranch } from "@/types/bank";
import { searchBanks } from "@/utils/searchUtils";
import { fetchBanks } from "@/api/bankApi";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [results, setResults] = useState<BankWithMatchedBranch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadBanks = async () => {
      setIsLoading(true);
      try {
        const data = await fetchBanks();
        setBanks(data);
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
    setCurrentPage(1); // Reset to first page
    setTimeout(() => {
      const searchResults = searchBanks(banks, term, selectedBank);
      setResults(searchResults);
      setIsLoading(false);
    }, 500);
  };

  const handleBankFilter = (bankName: string | null) => {
    setSelectedBank(bankName);
    setCurrentPage(1); // Reset to first page when filter changes
    if (searchTerm || bankName) {
      setIsLoading(true);
      setTimeout(() => {
        const searchResults = searchBanks(banks, searchTerm, bankName);
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
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <SearchHeader />

        <div className="flex flex-col items-center mb-8">
          <SearchBar onSearch={handleSearch} loading={isLoading} />
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
