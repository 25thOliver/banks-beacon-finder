import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
  color?: 'primary' | 'white' | 'gray';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
  text,
  color = 'primary',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const colorClasses = {
    primary: 'text-bank-primary',
    white: 'text-white',
    gray: 'text-gray-500',
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Loader2 
        className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`} 
      />
      {text && (
        <span className={`text-sm ${colorClasses[color]}`}>
          {text}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner; 