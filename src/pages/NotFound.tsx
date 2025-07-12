import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Building2, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bank-primary/5 to-bank-secondary/5 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-bank-primary/10 rounded-full flex items-center justify-center mb-4">
            <Building2 className="w-12 h-12 text-bank-primary" />
          </div>
          <h1 className="text-6xl font-bold text-bank-primary mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4 mb-8">
          <Link
            to="/"
            className="w-full bg-bank-primary text-white py-3 px-6 rounded-lg hover:bg-bank-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go to Homepage
          </Link>
          
          <Link
            to="/"
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Search Banks
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Popular Searches
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {['KCB', 'Equity Bank', 'Nairobi', 'Mombasa', 'Bank Codes'].map((term) => (
              <Link
                key={term}
                to={`/?search=${encodeURIComponent(term)}`}
                className="text-sm bg-bank-primary/10 text-bank-primary px-3 py-1 rounded-full hover:bg-bank-primary/20 transition-colors"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mx-auto transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
