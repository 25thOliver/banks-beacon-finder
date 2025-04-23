
import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import NoResultCard from "@/components/NoResultCard";
import BankFilter from "@/components/BankFilter";
import { Bank, BankWithMatchedBranch } from "@/types/bank";
import { searchBanks } from "@/utils/searchUtils";
import { fetchBanks } from "@/api/bankApi";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";

const RESULTS_PER_PAGE = 3;

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

  const totalPages = Math.ceil(results.length / RESULTS_PER_PAGE);

  // Slice results for current page
  const paginatedResults = results.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );
  const moreCount =
    results.length > currentPage * RESULTS_PER_PAGE
      ? results.length - currentPage * RESULTS_PER_PAGE
      : 0;

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
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-3">
            Bank Beacon Finder
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quickly find and access bank information without having to search through pages of documentation
          </p>
        </div>

        <div className="flex flex-col items-center mb-8">
          <SearchBar onSearch={handleSearch} loading={isLoading} />
        </div>

        {hasSearched && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                {!isLoading && (
                  <h2 className="text-xl font-medium">
                    {results.length > 0 ? (
                      <>
                        Found {results.length}{" "}
                        {results.length === 1 ? "result" : "results"}
                        {selectedBank ? ` in ${selectedBank}` : ""}
                      </>
                    ) : (
                      <>No results found</>
                    )}
                  </h2>
                )}
              </div>
              <BankFilter
                banks={banks}
                onSelectBank={handleBankFilter}
                selectedBank={selectedBank}
              />
            </div>

            {isLoading ? (
              <div className="p-12 flex justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-t-primary rounded-full animate-spin mb-4"></div>
                  <p className="text-muted-foreground">Searching banks...</p>
                </div>
              </div>
            ) : results.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 gap-4">
                  {paginatedResults.map((result, index) => (
                    <SearchResultCard
                      key={`${result.bank_code}-${result.matchedBranch?.branch_code || index + (currentPage - 1) * RESULTS_PER_PAGE
                        }`}
                      result={result}
                      searchTerm={searchTerm}
                      index={index + (currentPage - 1) * RESULTS_PER_PAGE}
                    />
                  ))}
                </div>
                {moreCount > 0 && (
                  <div className="flex justify-center my-4 text-muted-foreground">
                    +{moreCount} more
                  </div>
                )}
                {totalPages > 1 && (
                  <Pagination className="mt-6">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={e => {
                            e.preventDefault();
                            if (currentPage > 1) handlePageChange(currentPage - 1);
                          }}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }).map((_, idx) => (
                        <PaginationItem key={idx}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === idx + 1}
                            onClick={e => {
                              e.preventDefault();
                              handlePageChange(idx + 1);
                            }}
                          >
                            {idx + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={e => {
                            e.preventDefault();
                            if (currentPage < totalPages) handlePageChange(currentPage + 1);
                          }}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </div>
            ) : (
              <NoResultCard searchTerm={searchTerm} />
            )}
          </div>
        )}

        {!hasSearched && !isLoading && (
          <div className="text-center mt-16 py-6 px-4 bg-white rounded-lg shadow-sm border">
            <h2 className="text-xl font-medium mb-3">Start your search</h2>
            <p className="text-muted-foreground mb-6">
              Enter a bank name, bank code, branch name or branch code to find what you're looking for
            </p>
            <div className="flex justify-center space-x-2 text-sm text-muted-foreground">
              <span className="px-2 py-1 bg-secondary rounded">ABC Bank</span>
              <span className="px-2 py-1 bg-secondary rounded">001</span>
              <span className="px-2 py-1 bg-secondary rounded">Downtown</span>
              <span className="px-2 py-1 bg-secondary rounded">0002</span>
            </div>
          </div>
        )}

        <footer className="mt-20 text-center text-sm text-muted-foreground">
          <p>Bank information search tool - Get instant access to bank and branch details</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

