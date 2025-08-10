import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '../services/pokemonService';

export const usePokemonList = (offset: number, limit: number = 20) => {
  return useQuery({
    queryKey: ["pokemonList", offset, limit],
    queryFn: () => fetchPokemonList(offset, limit),
    placeholderData: (previousData) => previousData,  // Prevents flickering during pagination
  });
};
