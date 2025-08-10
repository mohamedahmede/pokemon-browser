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
  onImageLoad?: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onClick,
  onImageLoad
}) => {
  const cardContent = (
    <div className="p-3 sm:p-4 md:p-6 text-center">
      <div className="bg-gray-100 p-1 sm:p-2 mb-2 sm:mb-3 md:mb-4">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 mx-auto object-contain"
          onLoad={onImageLoad}
        />
      </div>
      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2 capitalize">
        {pokemon.name}
      </h3>
      <p className="text-xs sm:text-sm font-medium text-gray-600">
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
