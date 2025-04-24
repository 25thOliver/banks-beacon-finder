
import React from "react";

const WelcomeSection = () => {
  return (
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
  );
};

export default WelcomeSection;
