import { Pokemon, PokemonDetails, PokemonListResponse } from '@/types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonApi = {
  async getPokemonList(limit: number = 151): Promise<Pokemon[]> {
    try {
      const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
      const data: PokemonListResponse = await response.json();
      
      // Extract ID from URL for each pokemon
      const pokemonWithIds = data.results.map((pokemon) => {
        const id = parseInt(pokemon.url.split('/').slice(-2, -1)[0]);
        return {
          ...pokemon,
          id,
        };
      });
      
      return pokemonWithIds;
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      throw new Error('Failed to fetch Pokemon list');
    }
  },

  async getPokemonDetails(id: number): Promise<PokemonDetails> {
    try {
      const response = await fetch(`${BASE_URL}/pokemon/${id}`);
      
      if (!response.ok) {
        throw new Error(`Pokemon with ID ${id} not found`);
      }
      
      const data: PokemonDetails = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching Pokemon details for ID ${id}:`, error);
      throw new Error(`Failed to fetch Pokemon details for ID ${id}`);
    }
  },

  async searchPokemon(query: string): Promise<Pokemon | null> {
    try {
      const response = await fetch(`${BASE_URL}/pokemon/${query.toLowerCase()}`);
      
      if (!response.ok) {
        return null;
      }
      
      const data: PokemonDetails = await response.json();
      return {
        id: data.id,
        name: data.name,
        url: `${BASE_URL}/pokemon/${data.id}/`,
        sprites: data.sprites,
      };
    } catch (error) {
      console.error(`Error searching for Pokemon: ${query}`, error);
      return null;
    }
  },

  getPokemonImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  },

  formatPokemonId(id: number): string {
    return `#${id.toString().padStart(3, '0')}`;
  },

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
};