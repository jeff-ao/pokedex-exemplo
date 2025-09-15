import { useState, useEffect } from 'react';
import { FavoritePokemon } from '@/types/pokemon';

const FAVORITES_KEY = 'pokemon-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoritePokemon[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        localStorage.removeItem(FAVORITES_KEY);
      }
    }
  }, []);

  const addFavorite = (pokemon: FavoritePokemon) => {
    setFavorites((prev) => {
      const isAlreadyFavorite = prev.some((fav) => fav.id === pokemon.id);
      if (isAlreadyFavorite) return prev;
      
      const newFavorites = [...prev, pokemon];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const removeFavorite = (pokemonId: number) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((fav) => fav.id !== pokemonId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (pokemonId: number): boolean => {
    return favorites.some((fav) => fav.id === pokemonId);
  };

  const toggleFavorite = (pokemon: FavoritePokemon) => {
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
};