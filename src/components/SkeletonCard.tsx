import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-center animate-pulse">
      <div className="bg-gray-200 rounded-lg p-2 mb-4">
        <div className="w-36 h-36 rounded mx-auto"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-[80%] mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-16"></div>
    </div>
  );
};

export default SkeletonCard;
