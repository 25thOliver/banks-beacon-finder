
import React from "react";
import { Building2, MapPin, Shield } from "lucide-react";

const SearchHeader = () => {
  return (
    <div className="text-center mb-12">
      {/* Disclaimer Bar */}
      <div className="bg-yellow-100 text-yellow-900 border border-yellow-300 rounded-md px-4 py-2 mb-6 font-medium shadow-sm">
        Disclaimer: The contact information displayed may be incorrect. We are still working to ensure we have the right information for all contacts.
      </div>
      <div className="flex justify-center items-center mb-4">
        <div className="bg-bank-primary/10 p-3 rounded-full mr-4">
          <Building2 size={32} className="text-bank-primary" />
        </div>
        <div className="bg-bank-secondary/10 p-3 rounded-full mr-4">
          <MapPin size={32} className="text-bank-secondary" />
        </div>
        <div className="bg-bank-success/10 p-3 rounded-full">
          <Shield size={32} className="text-bank-success" />
        </div>
      </div>
      
      <h1 className="bank-title text-4xl md:text-5xl lg:text-6xl mb-4">
        Kenyan Banks Beacon Finder
      </h1>
      
      <p className="bank-subtitle text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-6">
        Quickly find and access bank information without having to search through pages of documentation from Kenya Bankers Association
      </p>
      
      <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-bank-success rounded-full"></div>
          <span>Trusted & Secure</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-bank-secondary rounded-full"></div>
          <span>Real-time Data</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-bank-info rounded-full"></div>
          <span>Nationwide Coverage</span>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
