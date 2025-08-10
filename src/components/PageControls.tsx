import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import SkeletonCard from "./SkeletonCard";
import { usePokemonList } from "../hooks/usePokemonList";
import { usePokemonDetails } from "../hooks/usePokemonDetails";

interface Pokemon {
	id: number;
	name: string;
	image: string;
	types: string[];
}

const PageControls: React.FC = () => {
	const [offset, setOffset] = useState(0);
	const [limit, setLimit] = useState(20);

	// Fetch the list of Pokémon
	const { data: pokemonList, isLoading: isListLoading } = usePokemonList(
		offset,
		limit
	);

	// Fetch details for the Pokémon in the list
	const pokemonUrls =
		pokemonList?.results?.map((pokemon: any) => pokemon.url) || [];
	const { data: pokemonDetails, isLoading: isDetailsLoading } =
		usePokemonDetails(pokemonUrls);



	if (isListLoading || isDetailsLoading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					{Array.from({ length: limit }).map((_, index) => (
						<SkeletonCard key={index} />
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
				{pokemonDetails?.map((poke: any) => (
					<PokemonCard
						key={poke.id}
						pokemon={{
							id: poke?.id,
							name: poke?.name,
							image: poke?.sprites?.other?.dream_world?.front_default,
							// image: poke.sprites.other.home.front_default,
						}}
					/>
				))}
			</div>

			{/* Pagination Controls */}
			<Pagination
				currentPage={Math.floor(offset / limit) + 1}
				totalPages={Math.ceil((pokemonList?.count || 0) / limit)}
				onPageChange={(page) => setOffset((page - 1) * limit)}
				totalItems={pokemonList?.count || 0}
				itemsPerPage={limit}
				currentItemsCount={pokemonDetails?.length || 0}
			/>
		</div>
	);
};

export default PageControls;
