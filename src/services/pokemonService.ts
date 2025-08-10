
export const fetchPokemonList = async (offset: number, limit: number = 20) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    return res.json();
  };
  
  export const fetchPokemonDetails = async (url: string) => {
    const res = await fetch(url);
    return res.json();
  };
  