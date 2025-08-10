import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

interface Pokemon {
	id: number;
	name: string;
	image: string;
	types: string[];
}

const InfiniteScroll: React.FC = () => {
	const [pokemon, setPokemon] = useState<Pokemon[]>([]);
	const [loading, setLoading] = useState(true);

	// All available Pokemon data
	const allPokemon: Pokemon[] = [
		{
			id: 1,
			name: "Bulbasaur",
			image:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
			types: ["Grass", "Poison"],
		},
		{
			id: 2,
			name: "Ivysaur",
			image:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
			types: ["Grass", "Poison"],
		},
		{
			id: 3,
			name: "Venusaur",
			image:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
			types: ["Grass", "Poison"],
		},
		{
			id: 4,
			name: "Charmander",
			image:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
			types: ["Fire"],
		},
		{
			id: 5,
			name: "Charmeleon",
			image:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
			types: ["Fire"],
		},
		{
			id: 6,
			name: "Charizard",
			image:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
			types: ["Fire", "Flying"],
		},
		{
			id: 7,
			name: "Squirtle",
			image:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
			types: ["Water"],
		},
		{
			id: 8,
			name: "Wartortle",
			image:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
			types: ["Water"],
		},
		{
			id: 9,
			name: "Blastoise",
			image:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
			types: ["Water"],
		},
		{
			id: 10,
			name: "Caterpie",
			image:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
			types: ["Bug"],
		},
		{
			id: 11,
			name: "Metapod",
			image:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png",
			types: ["Bug"],
		},
		{
			id: 12,
			name: "Butterfree",
			image:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
			types: ["Bug", "Flying"],
		},
		{
			id: 13,
			name: "Weedle",
			image:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png",
			types: ["Bug", "Poison"],
		},
		{
			id: 14,
			name: "Kakuna",
			image:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png",
			types: ["Bug", "Poison"],
		},
		{
			id: 15,
			name: "Beedrill",
			image:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png",
			types: ["Bug", "Poison"],
		},
		{
			id: 16,
			name: "Pidgey",
			image:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png",
			types: ["Normal", "Flying"],
		},
		{
			id: 17,
			name: "Pidgeotto",
			image:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png",
			types: ["Normal", "Flying"],
		},
		{
			id: 18,
			name: "Pidgeot",
			image:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png",
			types: ["Normal", "Flying"],
		},
		{
			id: 19,
			name: "Rattata",
			image:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png",
			types: ["Normal"],
		},
		{
			id: 20,
			name: "Raticate",
			image:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png",
			types: ["Normal"],
		},
	];

	useEffect(() => {
		// Simulate API call delay
		setTimeout(() => {
			setPokemon(allPokemon);
			setLoading(false);
		}, 300);
	}, [allPokemon]);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{pokemon.map((poke) => (
					<PokemonCard key={poke.id} pokemon={poke} />
				))}
			</div>
		</div>
	);
};

export default InfiniteScroll;
