
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-surface rounded-lg shadow-lg overflow-hidden ${className}`}>
        {title && (
            <div className="p-4 border-b border-on-surface/10">
                <h3 className="text-xl font-semibold text-on-surface">{title}</h3>
            </div>
        )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
