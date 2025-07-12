import React from 'react';
import Skeleton from './Skeleton';

const SearchResultSkeleton: React.FC = () => {
  return (
    <div className="bank-card p-6 mb-4">
      <div className="flex flex-wrap justify-between gap-4 items-start mb-4">
        {/* Bank Logo Skeleton */}
        <div className="flex items-center gap-3">
          <Skeleton width={48} height={48} rounded="full" />
          <div className="space-y-2">
            <Skeleton width={200} height={24} />
            <Skeleton width={150} height={16} />
          </div>
        </div>

        {/* Bank Info Skeleton */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <Skeleton width={180} height={28} />
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            <Skeleton width={120} height={32} rounded="lg" />
            <Skeleton width={140} height={32} rounded="lg" />
            <Skeleton width={100} height={32} rounded="lg" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton width={16} height={16} rounded="full" />
            <Skeleton width={150} height={16} />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton width={16} height={16} rounded="full" />
            <Skeleton width={120} height={16} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Skeleton width={16} height={16} rounded="full" />
          <Skeleton width={180} height={16} />
        </div>
      </div>

      {/* Branches Skeleton */}
      <div className="mt-4">
        <Skeleton width={200} height={20} className="mb-3" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-bank-primary/5 border border-bank-primary/20 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <Skeleton width={140} height={18} className="mb-1" />
                  <div className="flex items-center gap-1">
                    <Skeleton width={12} height={12} rounded="full" />
                    <Skeleton width={100} height={14} />
                  </div>
                </div>
                <Skeleton width={80} height={24} rounded="lg" />
              </div>
              <div className="flex items-center gap-1">
                <Skeleton width={12} height={12} rounded="full" />
                <Skeleton width={120} height={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultSkeleton; 