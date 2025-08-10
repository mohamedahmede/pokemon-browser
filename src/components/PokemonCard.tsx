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
    <div className="p-6 text-center">
             <div className="bg-gray-100 p-2 mb-4">
         <img
           src={pokemon.image}
           alt={pokemon.name}
           className="w-36 h-36 mx-auto object-contain"
         />
       </div>
      <h3 className="text-base font-bold text-gray-900 mb-2 capitalize">
        {pokemon.name}
      </h3>
      <p className="text-sm font-medium text-gray-600">
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
