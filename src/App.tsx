import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import TabNavigation from "./components/TabNavigation";
import PageControls from "./components/PageControls";
import InfiniteScroll from "./components/InfiniteScroll";
import PokemonDetail from "./components/PokemonDetail";

function App() {
	const location = useLocation();
	return (
		<div
			className={`App ${
				location.pathname === "/infinite-scroll"
					? "bg-green-100"
					: location.pathname !== "/"
					? "bg-pink-50"
					: "bg-blue-50"
			}`}
		>
			{(location.pathname === "/" ||
				location.pathname === "/infinite-scroll") && (
				<header className="App-header p-8">
					<div className="flex items-center justify-center pb-4">
						<span className="text-yellow-400 text-4xl">⚡</span>
						<h1 className="text-4xl font-bold">Pokédex</h1>
					</div>
					<p className=" text-md text-center opacity-80 pb-4">
						Discover and explore Pokemon with page controls.
					</p>
					<TabNavigation />
				</header>
			)}

			<main className="min-h-screen">
				<div className="">
					<Routes>
						<Route path="/" element={<PageControls />} />
						<Route path="/infinite-scroll" element={<InfiniteScroll />} />
						<Route path="/pokemon/:id" element={<PokemonDetail />} />
					</Routes>
				</div>
			</main>
		</div>
	);
}

export default App;
