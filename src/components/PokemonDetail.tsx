import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
  description: string;
}

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Simulate fetching detailed Pokémon data
    // In a real app, this would be an API call
    const mockPokemonData: { [key: number]: PokemonDetailData } = {
      1: {
        id: 1,
        name: 'Bulbasaur',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        types: ['Grass', 'Poison'],
        height: 0.7,
        weight: 6.9,
        abilities: ['Overgrow', 'Chlorophyll'],
        stats: { hp: 45, attack: 49, defense: 49, specialAttack: 65, specialDefense: 65, speed: 45 },
        description: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.'
      },
      4: {
        id: 4,
        name: 'Charmander',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
        types: ['Fire'],
        height: 0.6,
        weight: 8.5,
        abilities: ['Blaze', 'Solar Power'],
        stats: { hp: 39, attack: 52, defense: 43, specialAttack: 60, specialDefense: 50, speed: 65 },
        description: 'Obviously prefers hot things. When it rains, steam is said to spout from the tip of its tail.'
      },
      7: {
        id: 7,
        name: 'Squirtle',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
        types: ['Water'],
        height: 0.5,
        weight: 9.0,
        abilities: ['Torrent', 'Rain Dish'],
        stats: { hp: 44, attack: 48, defense: 65, specialAttack: 50, specialDefense: 64, speed: 43 },
        description: 'After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.'
      },
      25: {
        id: 25,
        name: 'Pikachu',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        types: ['Electric'],
        height: 0.4,
        weight: 6.0,
        abilities: ['Static', 'Lightning Rod'],
        stats: { hp: 35, attack: 55, defense: 40, specialAttack: 50, specialDefense: 50, speed: 90 },
        description: 'When several of these Pokémon gather, their electricity can cause lightning storms.'
      },
      133: {
        id: 133,
        name: 'Eevee',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png',
        types: ['Normal'],
        height: 0.3,
        weight: 6.5,
        abilities: ['Run Away', 'Adaptability'],
        stats: { hp: 55, attack: 55, defense: 50, specialAttack: 45, specialDefense: 65, speed: 55 },
        description: 'Its genetic code is irregular. It may mutate if it is exposed to radiation from element stones.'
      },
      6: {
        id: 6,
        name: 'Charizard',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
        types: ['Fire', 'Flying'],
        height: 1.7,
        weight: 90.5,
        abilities: ['Blaze', 'Solar Power'],
        stats: { hp: 78, attack: 84, defense: 78, specialAttack: 109, specialDefense: 85, speed: 100 },
        description: 'It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.'
      }
    };

    setTimeout(() => {
      const pokemonData = mockPokemonData[parseInt(id)];
      if (pokemonData) {
        setPokemon(pokemonData);
      }
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Pokémon Not Found</h1>
        <p className="text-gray-600 mb-6">The Pokémon you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        ← Back
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Left side - Image and basic info */}
          <div className="md:w-1/3 p-8 bg-gray-50">
            <div className="text-center">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-48 h-48 mx-auto object-contain"
              />
              <h1 className="text-3xl font-bold text-gray-800 mt-4 capitalize">
                {pokemon.name}
              </h1>
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
              <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                {pokemon.description}
              </p>
            </div>
          </div>

          {/* Right side - Detailed stats */}
          <div className="md:w-2/3 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Stats & Information</h2>
            
            {/* Physical characteristics */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Physical</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Height:</span>
                    <span className="font-medium">{pokemon.height}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-medium">{pokemon.weight}kg</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Abilities</h3>
                <div className="space-y-1">
                  {pokemon.abilities.map((ability) => (
                    <span
                      key={ability}
                      className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded mr-2"
                    >
                      {ability}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Base stats */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Base Stats</h3>
              <div className="space-y-3">
                {Object.entries(pokemon.stats).map(([stat, value]) => (
                  <div key={stat} className="flex items-center">
                    <span className="w-24 text-sm font-medium text-gray-600 capitalize">
                      {stat === 'hp' ? 'HP' : stat}
                    </span>
                    <div className="flex-1 ml-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{value}</span>
                        <span>255</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(value / 255) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
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
