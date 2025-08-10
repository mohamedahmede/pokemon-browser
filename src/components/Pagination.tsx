import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  currentItemsCount: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  currentItemsCount
}) => {
  // Calculate which page numbers to show
  const getVisiblePages = () => {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    // Adjust start page if we're near the end
    if (endPage - startPage < 4 && startPage > 1) {
      startPage = Math.max(1, endPage - 4);
    }
    
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();
  const endPage = Math.min(totalPages, Math.max(1, currentPage - 2) + 4);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <span>‹</span>
          <span className="ml-1">Previous</span>
        </button>
        
        {/* Page Numbers */}
        {visiblePages.map((pageNum) => {
          const isActive = pageNum === currentPage;
          const isClickable = pageNum <= totalPages;
          
          return (
            <button
              key={pageNum}
              onClick={() => isClickable ? onPageChange(pageNum) : null}
              disabled={!isClickable}
              className={`px-3 py-2 text-sm font-medium rounded-lg ${
                isActive
                  ? 'bg-black text-white'
                  : isClickable
                  ? 'bg-white text-gray-700 hover:bg-gray-50'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
        
        {/* Show ellipsis only if there are more pages after the visible range */}
        {endPage < totalPages && (
          <span className="px-2 text-gray-500">...</span>
        )}
        
        {/* Last Page - only show if it's not already visible */}
        {endPage < totalPages && (
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-2 text-sm font-medium rounded-lg bg-white text-gray-700 hover:bg-gray-50"
          >
            {totalPages}
          </button>
        )}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <span className="mr-1">Next</span>
          <span>›</span>
        </button>
      </div>
      
      {/* Page Information */}
      <p className="text-sm text-gray-600">
        Page {currentPage} of {totalPages} ({currentItemsCount} Pokemon shown)
      </p>
    </div>
  );
};

export default Pagination;
