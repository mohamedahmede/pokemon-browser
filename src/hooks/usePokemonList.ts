import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '../services/pokemonService';

export const usePokemonList = (offset: number) => {
  return useQuery({
    queryKey: ["pokemonList", offset],
    queryFn: () => fetchPokemonList(offset),
    placeholderData: (previousData) => previousData,  // Prevents flickering during pagination
  });
};
