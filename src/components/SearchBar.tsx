
import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Building2, Hash } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface SearchBarProps {
  onSearch: (term: string) => void;
  loading: boolean;
  banks?: any[];
}

const SearchBar = ({ onSearch, loading, banks = [] }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Generate search suggestions based on available data
  useEffect(() => {
    if (searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const newSuggestions: string[] = [];

    // Add bank name suggestions
    banks.forEach(bank => {
      if (bank.bank_name.toLowerCase().includes(term)) {
        newSuggestions.push(bank.bank_name);
      }
      if (bank.bank_code.toLowerCase().includes(term)) {
        newSuggestions.push(`Bank Code: ${bank.bank_code}`);
      }
      if (bank.location?.toLowerCase().includes(term)) {
        newSuggestions.push(`Location: ${bank.location}`);
      }
      
      // Add branch suggestions
      bank.branches?.forEach((branch: any) => {
        if (branch.branch_name.toLowerCase().includes(term)) {
          newSuggestions.push(`${branch.branch_name} (${bank.bank_name})`);
        }
        if (branch.branch_code.toLowerCase().includes(term)) {
          newSuggestions.push(`Branch Code: ${branch.branch_code} (${bank.bank_name})`);
        }
        if (branch.location?.toLowerCase().includes(term)) {
          newSuggestions.push(`Branch Location: ${branch.location} (${bank.bank_name})`);
        }
      });
    });

    // Remove duplicates, sort alphabetically, and limit suggestions
    const uniqueSuggestions = [...new Set(newSuggestions)]
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
      .slice(0, 10);
    setSuggestions(uniqueSuggestions);
  }, [searchTerm, banks]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Extract the actual search term from the suggestion
    let searchValue = suggestion;
    if (suggestion.startsWith('Bank Code: ')) {
      searchValue = suggestion.replace('Bank Code: ', '');
    } else if (suggestion.startsWith('Branch Code: ')) {
      searchValue = suggestion.replace('Branch Code: ', '').split(' (')[0];
    } else if (suggestion.startsWith('Location: ')) {
      searchValue = suggestion.replace('Location: ', '');
    } else if (suggestion.startsWith('Branch Location: ')) {
      searchValue = suggestion.replace('Branch Location: ', '').split(' (')[0];
    } else if (suggestion.includes(' (')) {
      searchValue = suggestion.split(' (')[0];
    }
    
    setSearchTerm(searchValue);
    onSearch(searchValue);
    setShowSuggestions(false);
  };

  const getSuggestionIcon = (suggestion: string) => {
    if (suggestion.startsWith('Bank Code:') || suggestion.startsWith('Branch Code:')) {
      return <Hash size={16} className="text-bank-primary" />;
    } else if (suggestion.startsWith('Location:') || suggestion.startsWith('Branch Location:')) {
      return <MapPin size={16} className="text-bank-info" />;
    } else {
      return <Building2 size={16} className="text-bank-secondary" />;
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-3xl">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search for bank name, code, branch name, code, or location..."
            className="bank-input text-lg py-4 pl-14 pr-32 shadow-lg"
            disabled={loading}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search size={24} className="text-bank-primary" />
          </div>
          {loading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <LoadingSpinner size="sm" color="primary" />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bank-button py-3 px-6 text-base"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
          <div className="p-2 border-b border-gray-100">
            <p className="text-sm text-muted-foreground px-3 py-2">
              Suggestions ({suggestions.length})
            </p>
          </div>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-bank-primary/5 flex items-center gap-3 border-b border-gray-50 last:border-b-0 transition-colors"
            >
              {getSuggestionIcon(suggestion)}
              <span className="text-sm font-medium">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
