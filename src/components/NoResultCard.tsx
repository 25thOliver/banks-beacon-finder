
import { Search } from "lucide-react";

interface NoResultCardProps {
  searchTerm: string;
}

const NoResultCard = ({ searchTerm }: NoResultCardProps) => {
  return (
    <div className="bg-white rounded-lg border shadow p-6 text-center animate-fade-in">
      <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-secondary mb-4">
        <Search size={28} className="text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">No results found</h3>
      <p className="text-muted-foreground mb-4">
        We couldn't find any matches for <strong>"{searchTerm}"</strong>
      </p>
      <div className="text-sm bg-secondary p-3 rounded-md">
        <p className="font-medium mb-2">Try adjusting your search:</p>
        <ul className="list-disc text-left text-muted-foreground pl-5">
          <li>Check for spelling errors</li>
          <li>Use a different bank name or code</li>
          <li>Try searching for a specific branch</li>
          <li>Use shorter or more general terms</li>
        </ul>
      </div>
    </div>
  );
};

export default NoResultCard;
