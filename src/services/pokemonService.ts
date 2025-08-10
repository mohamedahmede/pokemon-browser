
export const fetchPokemonList = async (offset: number) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
    return res.json();
  };
  
  export const fetchPokemonDetails = async (url: string) => {
    const res = await fetch(url);
    return res.json();
  };
  