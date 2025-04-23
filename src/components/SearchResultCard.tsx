
import { BankWithMatchedBranch } from "@/types/bank";

interface SearchResultCardProps {
  result: BankWithMatchedBranch;
  searchTerm: string;
  index: number;
}

const SearchResultCard = ({ result, searchTerm, index }: SearchResultCardProps) => {
  // Function to highlight matching terms
  const highlightMatch = (text: string) => {
    if (!searchTerm || searchTerm.length < 2) return text;

    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  };

  return (
    <div 
      className="search-result bg-white rounded-lg border shadow-sm p-4 mb-3 hover:shadow-md transition-shadow"
      style={{ '--index': index } as React.CSSProperties}
    >
      <div className="flex flex-wrap justify-between">
        <div className="mb-2">
          <h3 
            className="font-medium text-lg" 
            dangerouslySetInnerHTML={{ 
              __html: highlightMatch(result.bank_name) 
            }} 
          />
          <div className="inline-flex items-center px-2 py-1 bg-primary/10 rounded text-sm font-medium text-primary">
            Bank Code: <span dangerouslySetInnerHTML={{ __html: highlightMatch(result.bank_code) }} />
          </div>
        </div>
      </div>
      
      {result.matchedBranch ? (
        <div className="mt-3 p-3 bg-secondary rounded-md">
          <div className="flex justify-between">
            <h4 
              className="font-medium" 
              dangerouslySetInnerHTML={{ 
                __html: highlightMatch(result.matchedBranch.branch_name) 
              }} 
            />
            <div className="inline-flex items-center px-2 py-1 bg-accent/10 rounded text-xs font-medium text-accent">
              Branch Code: <span dangerouslySetInnerHTML={{ __html: highlightMatch(result.matchedBranch.branch_code) }} />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-3">
          <h4 className="text-sm font-medium text-muted-foreground">
            {result.branches.length} {result.branches.length === 1 ? 'branch' : 'branches'} available
          </h4>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {result.branches.slice(0, 3).map((branch) => (
              <div key={branch.branch_code} className="text-sm p-2 bg-secondary rounded flex justify-between">
                <span dangerouslySetInnerHTML={{ __html: highlightMatch(branch.branch_name) }} />
                <span className="text-xs text-muted-foreground">{branch.branch_code}</span>
              </div>
            ))}
            {result.branches.length > 3 && (
              <div className="text-sm p-2 text-center text-muted-foreground">
                +{result.branches.length - 3} more
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultCard;
