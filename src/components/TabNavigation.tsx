import React from "react";
import { Link, useLocation } from "react-router-dom";

const TabNavigation: React.FC = () => {
	const location = useLocation();

	const isActive = (path: string) => {
		return location.pathname === path;
	};

	return (
		<nav className="">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex justify-center">
					<div className="flex space-x-4">
						<Link
							to="/"
							className={`px-4 py-2 text-sm font-medium border-2 border-transparent rounded-lg transition-colors ${
								isActive("/")
									? "bg-[#19191b] text-white"
									: "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
							}`}
						>
							Page Controls
						</Link>
						<Link
							to="/infinite-scroll"
							className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
								isActive("/infinite-scroll")
									? "bg-[#19191b] text-white"
									: "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
							}`}
						>
							Infinite Scroll
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default TabNavigation;
