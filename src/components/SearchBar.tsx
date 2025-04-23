
import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (term: string) => void;
  loading: boolean;
}

const SearchBar = ({ onSearch, loading }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for bank name, code, branch name or code..."
          className="w-full px-4 py-3 pl-12 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          disabled={loading}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={20} className="text-muted-foreground" />
        </div>
        {loading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="w-5 h-5 border-2 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;
