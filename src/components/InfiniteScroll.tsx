import React, { useState, useEffect, useCallback, useRef } from "react";
import PokemonCard from "./PokemonCard";
import SkeletonCard from "./SkeletonCard";
import { usePokemonList } from "../hooks/usePokemonList";
import { usePokemonDetails } from "../hooks/usePokemonDetails";

const InfiniteScroll: React.FC = () => {
	const [offset, setOffset] = useState(0);
	const [limit] = useState(20);
	const [allPokemon, setAllPokemon] = useState<any[]>([]);
	const [hasMore, setHasMore] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
	const [isInitialLoad, setIsInitialLoad] = useState(true);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const lastPokemonRef = useRef<HTMLDivElement | null>(null);

	const handleImageLoad = useCallback((pokemonId: number) => {
		setLoadedImages((prev) => {
			const newSet = new Set(Array.from(prev));
			newSet.add(pokemonId);
			return newSet;
		});
	}, []);

	const { data: pokemonList, isLoading: isListLoading } = usePokemonList(
		offset,
		limit
	);

	const pokemonUrls =
		pokemonList?.results?.map((pokemon: any) => pokemon.url) || [];
	const { data: pokemonDetails, isLoading: isDetailsLoading } =
		usePokemonDetails(pokemonUrls);

	useEffect(() => {
		if (pokemonDetails && pokemonDetails.length > 0) {
			setAllPokemon((prev) => {
				const newPokemon = [...prev];
				pokemonDetails.forEach((poke: any) => {
					const existingIndex = newPokemon.findIndex((p) => p.id === poke.id);
					if (existingIndex === -1) {
						newPokemon.push(poke);
					}
				});
				return newPokemon;
			});
			setHasMore(pokemonDetails.length === limit);
			
			if (isInitialLoad) {
				setIsInitialLoad(false);
			}
		}
	}, [pokemonDetails, limit, isInitialLoad]);

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

	const loadMore = useCallback(() => {
		if (!isLoadingMore && hasMore) {
			setIsLoadingMore(true);
			setOffset((prev) => prev + limit);
			setTimeout(() => setIsLoadingMore(false), 500);
		}
	}, [isLoadingMore, hasMore, limit]);

	const lastPokemonElementRef = useCallback((node: HTMLDivElement | null) => {
		if (isListLoading) return;
		if (observerRef.current) observerRef.current.disconnect();
		
		observerRef.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && hasMore) {
				loadMore();
			}
		});
		
		if (node) observerRef.current.observe(node);
		lastPokemonRef.current = node;
	}, [isListLoading, hasMore, loadMore]);



	if (isInitialLoad && (isListLoading || isDetailsLoading)) {
		return (
			<div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 py-8">
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5 gap-3 gap-4">
					{Array.from({ length: 20 }).map((_, index) => (
						<SkeletonCard key={index} />
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 py-8">
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5 gap-3 gap-4">
				{allPokemon.map((poke: any, index: number) => {
					if (allPokemon.length === index + 1) {
						return (
							<div key={poke.id} ref={lastPokemonElementRef}>
								<PokemonCard
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
							</div>
						);
					}
					return (
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
					);
				})}
			</div>

			{isLoadingMore && (
				<div className="text-center py-8">
					<div className="inline-flex items-center space-x-2">
						<div className="w-4 h-4 bg-green-500 rounded-full animate-spin"></div>
						<span className="text-green-600">Loading more Pokemon...</span>
					</div>
				</div>
			)}

			{!isInitialLoad && (isListLoading || isDetailsLoading) && (
				<div className="text-center py-4">
					<div className="inline-flex items-center space-x-2">
						<div className="w-4 h-4 bg-blue-500 rounded-full animate-spin"></div>
						<span className="text-blue-600">Loading...</span>
					</div>
				</div>
			)}

			<div className="text-center py-4 text-gray-600">
				Showing {allPokemon.length} Pokemon
			</div>
		</div>
	);
};

export default InfiniteScroll;
