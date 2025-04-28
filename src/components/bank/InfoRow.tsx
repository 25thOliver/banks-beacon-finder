
import React from "react";

interface InfoRowProps {
  icon: React.ReactNode;
  value?: React.ReactNode;
  label: string;
  className?: string;
}

const InfoRow = ({ icon, value, label, className = "" }: InfoRowProps) =>
  value ? (
    <div className={`flex items-center gap-2 text-sm mb-1 ${className}`}>
      <span className="inline-flex items-center justify-center w-4 h-4 text-primary">{icon}</span>
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  ) : null;

export default InfoRow;
