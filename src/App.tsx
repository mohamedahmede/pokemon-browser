import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import TabNavigation from "./components/TabNavigation";


function App() {
	return (
		<Router>
			<div className="App text-center bg-[#eaf0fe]  ">
				<header className="App-header p-8">
					<div className="flex items-center justify-center pb-4">
						<span className="text-yellow-400 text-4xl">⚡</span>
						<h1 className="text-4xl font-bold">Pokédex</h1>
					</div>
					<p className=" text-md opacity-80 pb-4">
						Discover and explore Pokemon with page controls.
					</p>
					<TabNavigation />
				</header>

				<main className="min-h-screen">
					<div className=""></div>
				</main>
			</div>
		</Router>
	);
}

export default App;
