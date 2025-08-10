import React from 'react';
import PokemonCard from './PokemonCard';

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

const PokemonCardDemo: React.FC = () => {
  const demoPokemon: Pokemon = {
    id: 25,
    name: 'Pikachu',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    types: ['Electric']
  };

  const handleCardClick = () => {
    console.log('Pokemon card clicked:', demoPokemon.name);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">PokemonCard Component Demo</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic card */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Basic Card</h3>
          <PokemonCard pokemon={demoPokemon} />
        </div>

        {/* Clickable card */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Clickable Card</h3>
          <PokemonCard
            pokemon={demoPokemon}
            onClick={handleCardClick}
          />
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Usage Examples:</h3>
        <pre className="text-sm text-gray-700 overflow-x-auto">
{`// Basic usage with navigation
<PokemonCard pokemon={pokemon} />

// With click handler (no navigation)
<PokemonCard 
  pokemon={pokemon}
  onClick={() => handleClick()}
/>`}
        </pre>
      </div>
    </div>
  );
};

export default PokemonCardDemo;
