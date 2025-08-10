import React from "react";

const SkeletonCard: React.FC = () => {
	return (
		<div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6 text-center animate-pulse">
			<div className="bg-gray-200 rounded-lg p-1 sm:p-2 mb-2 sm:mb-3 md:mb-4">
				<div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded mx-auto"></div>
			</div>
			<div className="h-3 sm:h-4 bg-gray-200 rounded w-[80%] mb-1 sm:mb-2"></div>
			<div className="h-2 sm:h-3 bg-gray-200 rounded w-16"></div>
		</div>
	);
};

export default SkeletonCard;
