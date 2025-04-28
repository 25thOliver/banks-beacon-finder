
import { Image as ImageIcon } from "lucide-react";

interface BankLogoProps {
  icon?: string;
  bankName: string;
}

const BankLogo = ({ icon, bankName }: BankLogoProps) => (
  <div className="flex-shrink-0 mr-4">
    {icon ? (
      <img
        src={icon}
        alt={`${bankName} logo`}
        className="w-12 h-12 object-contain rounded bg-gray-50 border"
        loading="lazy"
      />
    ) : (
      <span className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded border text-gray-400">
        <ImageIcon size={32} />
      </span>
    )}
  </div>
);

export default BankLogo;
