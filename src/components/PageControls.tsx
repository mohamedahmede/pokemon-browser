import React, { useState } from 'react';
import PokemonCard from './PokemonCard';
import { usePokemonList } from '../hooks/usePokemonList';
import { usePokemonDetails } from '../hooks/usePokemonDetails';

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

const PageControls: React.FC = () => {
  const [offset, setOffset] = useState(0);

  // Fetch the list of Pokémon
  const { data: pokemonList, isLoading: isListLoading } = usePokemonList(offset);

  // Fetch details for the Pokémon in the list
  const pokemonUrls = pokemonList?.results?.map((pokemon: any) => pokemon.url) || [];
  const { data: pokemonDetails, isLoading: isDetailsLoading } = usePokemonDetails(pokemonUrls);

  if (isListLoading || isDetailsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemonDetails?.map((poke: any) => (
          <PokemonCard
            key={poke.id}
            pokemon={{
              id: poke.id,
              name: poke.name,
              image: poke.sprites.front_default
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PageControls;
