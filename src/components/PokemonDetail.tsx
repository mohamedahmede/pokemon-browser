import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface PokemonDetailData {
	id: number;
	name: string;
	image: string;
	types: string[];
	height: number;
	weight: number;
	abilities: string[];
	stats: {
		hp: number;
		attack: number;
		defense: number;
		specialAttack: number;
		specialDefense: number;
		speed: number;
	};
}

const PokemonDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const fetchPokemonDetails = async (pokemonId: string) => {
		const response = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${pokemonId}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch Pokemon details");
		}
		return response.json();
	};

	const {
		data: pokemonData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["pokemonDetail", id],
		queryFn: () => fetchPokemonDetails(id!),
		enabled: !!id,
	});

	// Transform API data to our interface format
	const pokemon: PokemonDetailData | null = pokemonData
		? {
				id: pokemonData.id,
				name: pokemonData.name,
				image:
					pokemonData.sprites?.other?.home?.front_default ||
					pokemonData.sprites?.front_default ||
					`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`,
				types: pokemonData.types?.map((type: any) => type.type.name) || [],
				height: pokemonData.height / 10, // Convert from decimeters to meters
				weight: pokemonData.weight / 10, // Convert from hectograms to kilograms
				abilities:
					pokemonData.abilities?.map((ability: any) => ability.ability.name) ||
					[],
				stats: {
					hp: pokemonData.stats?.[0]?.base_stat || 0,
					attack: pokemonData.stats?.[1]?.base_stat || 0,
					defense: pokemonData.stats?.[2]?.base_stat || 0,
					specialAttack: pokemonData.stats?.[3]?.base_stat || 0,
					specialDefense: pokemonData.stats?.[4]?.base_stat || 0,
					speed: pokemonData.stats?.[5]?.base_stat || 0,
				},
		  }
		: null;

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto px-4 py-8 text-center">
				<h1 className="text-3xl font-bold text-gray-800 mb-4">
					Error Loading Pokémon
				</h1>
				<p className="text-gray-600 mb-6">
					Failed to load Pokémon details. Please try again.
				</p>
				<button
					onClick={() => navigate(-1)}
					className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
				>
					Go Back
				</button>
			</div>
		);
	}

	if (!pokemon) {
		return (
			<div className="container mx-auto px-4 py-8 text-center">
				<h1 className="text-3xl font-bold text-gray-800 mb-4">
					Pokémon Not Found
				</h1>
				<p className="text-gray-600 mb-6">
					The Pokémon you're looking for doesn't exist.
				</p>
				<button
					onClick={() => navigate("/")}
					className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
				>
					Back to List
				</button>
			</div>
		);
	}

	return (
		<div className="container px-4  lg:px-[10rem] py-8">
			<button
				onClick={() => navigate(-1)}
				className="mb-6 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
			>
				← Back to List
			</button>

			<div className="bg-white rounded-lg shadow-lg overflow-hidden lg:mx-[5rem]">
				<div className="details-header text-center text-white bg-gradient-to-r from-purple-500 to-pink-500 p-8">
					<h1 className="text-3xl font-bold  p-4 capitalize">{pokemon.name}</h1>
					<p className="text-xs sm:text-sm font-medium ">
						#{pokemon.id.toString().padStart(3, "0")}
					</p>
				</div>

				<div className="md:flex">
					{/* Left side - Image and basic info */}
					<div className="md:w-1/3 p-8 bg-gray-50">
						<div className="text-center">
							<img
								src={pokemon.image}
								alt={pokemon.name}
								className="w-48 h-48 mx-auto object-contain"
							/>

							<div className="flex justify-center space-x-2 mt-3">
								{pokemon.types.map((type) => (
									<span
										key={type}
										className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full"
									>
										{type}
									</span>
								))}
							</div>

							{/* Height and Weight cards below types */}
							<div className="flex justify-center space-x-4 mt-6">
								<div className="bg-white rounded-lg p-4 text-center shadow-sm w-[40%]">
									<div className="flex items-center justify-center">
										<div className="w-6 h-6 mb-2 text-gray-400">📏</div>
										<div className="text-xs text-gray-500 mb-1">Height</div>
									</div>
									<div className="text-lg font-bold text-gray-800">
										{pokemon.height}
									</div>
								</div>
								<div className="bg-white rounded-lg p-4 text-center shadow-sm w-[40%]">
									<div className="flex items-center justify-center">
										<div className="w-6 h-6 mb-2 text-gray-400">⚖️</div>
										<div className="text-xs text-gray-500 mb-1">Weight</div>
									</div>
									<div className="text-lg font-bold text-gray-800">
										{pokemon.weight} kg
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right side - Detailed stats */}
					<div className="md:w-2/3 p-8">
						<h2 className="text-2xl font-bold text-gray-800 mb-6">
							Base Stats
						</h2>
						{/* Base stats */}
						<div className="mb-8">
							<div className="space-y-3">
								{Object.entries(pokemon.stats).map(([stat, value]) => (
									<div key={stat} className="flex items-center">
										<span className="w-24 text-sm font-medium text-gray-600 capitalize">
											{stat === "hp" ? "HP" : stat}
										</span>
										<div className="flex-1 ml-4">
											<div className="flex justify-between text-sm text-gray-600 mb-1">
												<span>{value}</span>
												<span>255</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-2">
												<div
													className="bg-black h-2 rounded-full"
													style={{ width: `${(value / 255) * 100}%` }}
												></div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Abilities */}
						<div className="mb-8">
							<h2 className="text-2xl font-bold text-gray-800 mb-6">
								Abilities
							</h2>
							<div className="space-y-2">
								{pokemon.abilities.map((ability) => (
									<span
										key={ability}
										className="inline-block px-3 py-2 text-sm font-medium border border-gray-300 rounded-full mr-3"
									>
										{ability}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PokemonDetail;
