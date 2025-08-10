import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetails } from '../services/pokemonService';

export const usePokemonDetails = (urls: string[]) => {
  return useQuery({
    queryKey: ["pokemonDetails", urls],
    queryFn: () => Promise.all(urls.map(url => fetchPokemonDetails(url))),
    enabled: urls.length > 0, // Only fetch if URLs are available
  });
};