
import React from "react";
import SearchResultCard from "@/components/SearchResultCard";
import NoResultCard from "@/components/NoResultCard";
import BankFilter from "@/components/BankFilter";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import SearchResultSkeleton from "@/components/ui/SearchResultSkeleton";
import { Bank, BankWithMatchedBranch } from "@/types/bank";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";

interface SearchResultsSectionProps {
  searchTerm: string;
  selectedBank: string | null;
  results: BankWithMatchedBranch[];
  banks: Bank[];
  isLoading: boolean;
  currentPage: number;
  onSelectBank: (bankName: string | null) => void;
  onPageChange: (page: number) => void;
}

const RESULTS_PER_PAGE = 3;

const SearchResultsSection: React.FC<SearchResultsSectionProps> = ({
  searchTerm,
  selectedBank,
  results,
  banks,
  isLoading,
  currentPage,
  onSelectBank,
  onPageChange,
}) => {
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

  return (
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
          onSelectBank={onSelectBank}
          selectedBank={selectedBank}
        />
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {/* Show skeleton loaders for better UX */}
          {[1, 2, 3].map((i) => (
            <SearchResultSkeleton key={i} />
          ))}
          <div className="flex justify-center py-4">
            <LoadingSpinner text="Searching banks..." size="lg" />
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
                      if (currentPage > 1) onPageChange(currentPage - 1);
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
                        onPageChange(idx + 1);
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
                      if (currentPage < totalPages) onPageChange(currentPage + 1);
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
  );
};

export default SearchResultsSection;
