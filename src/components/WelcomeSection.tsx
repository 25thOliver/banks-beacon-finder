
import React from "react";
import { Search, Building2, MapPin, Hash, Clock } from "lucide-react";

const WelcomeSection = () => {
  const searchExamples = [
    { text: "KCB", type: "bank", icon: <Building2 size={16} /> },
    { text: "001", type: "code", icon: <Hash size={16} /> },
    { text: "Kikuyu", type: "branch", icon: <MapPin size={16} /> },
    { text: "129", type: "code", icon: <Hash size={16} /> },
    { text: "Nairobi", type: "location", icon: <MapPin size={16} /> }
  ];

  return (
    <div className="bank-card p-8 mt-12">
      <div className="text-center">
        <div className="bg-bank-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
          <Search size={32} className="text-bank-primary" />
        </div>
        
        <h2 className="bank-title text-2xl mb-4">Start Your Search</h2>
        
        <p className="bank-subtitle text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Enter a bank name, bank code, branch name, branch code, or location to find what you're looking for. 
          Our comprehensive database covers all major banks across Kenya.
        </p>
        
        <div className="mb-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
            Search Examples
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {searchExamples.map((example, index) => (
              <div
                key={index}
                className={`bank-badge flex items-center gap-2 px-4 py-2 cursor-pointer hover:scale-105 transition-transform ${
                  example.type === 'bank' ? 'bank-badge-primary' :
                  example.type === 'code' ? 'bank-badge-secondary' :
                  example.type === 'branch' ? 'bank-badge-info' :
                  'bank-badge-success'
                }`}
              >
                {example.icon}
                <span className="font-medium">{example.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 bg-bank-primary/5 rounded-xl border border-bank-primary/10">
            <div className="bg-bank-primary/10 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Building2 size={24} className="text-bank-primary" />
            </div>
            <h3 className="font-semibold text-bank-primary mb-2">Find Banks</h3>
            <p className="text-sm text-muted-foreground">
              Search by bank name or code to find all branches
            </p>
          </div>
          
          <div className="text-center p-6 bg-bank-secondary/5 rounded-xl border border-bank-secondary/10">
            <div className="bg-bank-secondary/10 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <MapPin size={24} className="text-bank-secondary" />
            </div>
            <h3 className="font-semibold text-bank-secondary mb-2">Locate Branches</h3>
            <p className="text-sm text-muted-foreground">
              Find specific branches by name, code, or location
            </p>
          </div>
          
          <div className="text-center p-6 bg-bank-success/5 rounded-xl border border-bank-success/10">
            <div className="bg-bank-success/10 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Clock size={24} className="text-bank-success" />
            </div>
            <h3 className="font-semibold text-bank-success mb-2">Get Details</h3>
            <p className="text-sm text-muted-foreground">
              Access contact info and working hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
