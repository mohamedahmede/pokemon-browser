import React from 'react';
import { Link } from 'react-router-dom';

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onClick
}) => {
  const cardContent = (
    <div className="p-4 text-center">
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="w-24 h-24 mx-auto object-contain"
      />
      <h3 className="text-sm font-semibold text-gray-800 mt-2 capitalize">
        {pokemon.name}
      </h3>
      <p className="text-xs text-gray-500 mt-1">
        #{pokemon.id.toString().padStart(3, '0')}
      </p>
    </div>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
      >
        {cardContent}
      </button>
    );
  }

  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
    >
      {cardContent}
    </Link>
  );
};

export default PokemonCard;
