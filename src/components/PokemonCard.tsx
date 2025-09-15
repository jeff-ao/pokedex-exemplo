import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pokemon } from '@/types/pokemon';
import { pokemonApi } from '@/services/pokemonApi';
import { useFavorites } from '@/hooks/useFavorites';
import { ViewMode } from '@/types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  viewMode: ViewMode;
}

export const PokemonCard = ({ pokemon, viewMode }: PokemonCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const imageUrl = pokemonApi.getPokemonImageUrl(pokemon.id);
  const pokemonName = pokemonApi.capitalizeFirstLetter(pokemon.name);
  const pokemonId = pokemonApi.formatPokemonId(pokemon.id);
  const isInFavorites = isFavorite(pokemon.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleFavorite({
      id: pokemon.id,
      name: pokemon.name,
      imageUrl,
    });
  };

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  if (viewMode === 'list') {
    return (
      <Link to={`/detalhes/${pokemon.id}`}>
        <Card className="group pokemon-hover bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300">
          <CardContent className="flex items-center p-6 space-x-6">
            {/* Pokemon Image */}
            <div className="relative w-20 h-20 flex-shrink-0">
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-lg">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              )}
              {!imageError && (
                <img
                  src={imageUrl}
                  alt={pokemonName}
                  className={`w-full h-full object-contain transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              )}
              {imageError && (
                <div className="w-full h-full bg-muted/50 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">No Image</span>
                </div>
              )}
            </div>

            {/* Pokemon Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {pokemonName}
                  </h3>
                  <Badge variant="outline" className="mt-1">
                    {pokemonId}
                  </Badge>
                </div>

                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFavoriteClick}
                  className="pokemon-hover"
                >
                  <Heart 
                    className={`h-5 w-5 transition-colors ${
                      isInFavorites 
                        ? 'text-secondary fill-secondary' 
                        : 'text-muted-foreground hover:text-secondary'
                    }`} 
                  />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/detalhes/${pokemon.id}`}>
      <Card className="group pokemon-hover bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden">
        <CardContent className="p-6 text-center relative">
          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 z-10 pokemon-hover"
          >
            <Heart 
              className={`h-4 w-4 transition-colors ${
                isInFavorites 
                  ? 'text-secondary fill-secondary' 
                  : 'text-muted-foreground hover:text-secondary'
              }`} 
            />
          </Button>

          {/* Pokemon Image */}
          <div className="relative w-32 h-32 mx-auto mb-4">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-lg">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
            {!imageError && (
              <img
                src={imageUrl}
                alt={pokemonName}
                className={`w-full h-full object-contain transition-all duration-300 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}
            {imageError && (
              <div className="w-full h-full bg-muted/50 rounded-lg flex items-center justify-center">
                <span className="text-sm text-muted-foreground">No Image</span>
              </div>
            )}
          </div>

          {/* Pokemon Info */}
          <div className="space-y-2">
            <Badge variant="outline" className="text-xs">
              {pokemonId}
            </Badge>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {pokemonName}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};