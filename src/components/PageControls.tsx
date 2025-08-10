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
	const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

	const handleImageLoad = React.useCallback((pokemonId: number) => {
		setLoadedImages((prev) => {
			const newSet = new Set(Array.from(prev));
			newSet.add(pokemonId);
			return newSet;
		});
	}, []);

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

	useEffect(() => {
		setLoadedImages(new Set());

		const fallbackTimer = setTimeout(() => {
			if (pokemonDetails && pokemonDetails.length > 0) {
				const allIds = pokemonDetails.map((poke: any) => poke.id);
				setLoadedImages(new Set(allIds));
			}
		}, 2000);

		return () => clearTimeout(fallbackTimer);
	}, [offset, pokemonDetails]);

	const allImagesLoaded =
		pokemonDetails &&
		pokemonDetails.length > 0 &&
		pokemonDetails.every((poke: any) => loadedImages.has(poke.id));

	const shouldForceShow =
		pokemonDetails &&
		pokemonDetails.length > 0 &&
		!isListLoading &&
		!isDetailsLoading &&
		loadedImages.size === 0;

	const hasData =
		pokemonDetails &&
		pokemonDetails.length > 0 &&
		!isListLoading &&
		!isDetailsLoading;

	useEffect(() => {
		if (
			pokemonDetails &&
			pokemonDetails.length > 0 &&
			loadedImages.size === 0
		) {
			const immediateTimer = setTimeout(() => {
				if (loadedImages.size === 0) {
					const allIds = pokemonDetails.map((poke: any) => poke.id);
					setLoadedImages(new Set(allIds));
				}
			}, 500);

			return () => clearTimeout(immediateTimer);
		}
	}, [pokemonDetails]);

	useEffect(() => {
		if (
			pokemonDetails &&
			pokemonDetails.length > 0 &&
			!isListLoading &&
			!isDetailsLoading &&
			loadedImages.size === 0
		) {
			const apiReadyTimer = setTimeout(() => {
				if (loadedImages.size === 0) {
					const allIds = pokemonDetails.map((poke: any) => poke.id);
					setLoadedImages(new Set(allIds));
				}
			}, 1000);

			return () => clearTimeout(apiReadyTimer);
		}
	}, [pokemonDetails, isListLoading, isDetailsLoading, loadedImages.size]);

	if (isListLoading || isDetailsLoading) {
		return (
			<div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 py-8">
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5 gap-3 gap-4 mb-8">
					{Array.from({ length: limit }).map((_, index) => (
						<SkeletonCard key={index} />
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 py-8">
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5 gap-3 gap-4 mb-8">
				{pokemonDetails?.map((poke: any) => (
					<PokemonCard
						key={poke.id}
						pokemon={{
							id: poke?.id,
							name: poke?.name,
							image:
								poke?.sprites?.other?.home?.front_default ||
								poke?.sprites?.front_default ||
								`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke?.id}.png`,
						}}
						onImageLoad={() => handleImageLoad(poke.id)}
					/>
				))}
			</div>

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
