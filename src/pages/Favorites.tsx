import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFavorites } from '@/hooks/useFavorites';
import { pokemonApi } from '@/services/pokemonApi';

export const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  const handleRemoveFavorite = (e: React.MouseEvent, pokemonId: number) => {
    e.preventDefault();
    e.stopPropagation();
    removeFavorite(pokemonId);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Home
            </Link>
          </Button>
          
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-3 bg-gradient-pokeball rounded-lg">
              <Heart className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                <span className="gradient-text">Pokémon</span> Favoritos
              </h1>
              <p className="text-muted-foreground">
                {favorites.length} Pokémon salvos como favoritos
              </p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {favorites.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-pikachu rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-accent-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Nenhum favorito ainda</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Você ainda não salvou nenhum Pokémon como favorito. 
              Explore a Pokédex e clique no coração para salvar seus Pokémon preferidos!
            </p>
            <Button asChild variant="hero">
              <Link to="/">
                Explorar Pokémon
              </Link>
            </Button>
          </div>
        )}

        {/* Favorites Grid */}
        {favorites.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((pokemon) => {
              const pokemonName = pokemonApi.capitalizeFirstLetter(pokemon.name);
              const pokemonId = pokemonApi.formatPokemonId(pokemon.id);
              
              return (
                <Link key={pokemon.id} to={`/detalhes/${pokemon.id}`}>
                  <Card className="group pokemon-hover bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                    <CardContent className="p-6 text-center relative">
                      {/* Remove Favorite Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleRemoveFavorite(e, pokemon.id)}
                        className="absolute top-2 right-2 z-10 pokemon-hover"
                      >
                        <Heart className="h-4 w-4 text-secondary fill-secondary transition-colors hover:text-destructive hover:fill-destructive" />
                      </Button>

                      {/* Pokemon Image */}
                      <div className="w-32 h-32 mx-auto mb-4">
                        <img
                          src={pokemon.imageUrl}
                          alt={pokemonName}
                          className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
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
            })}
          </div>
        )}

        {/* Quick Actions */}
        {favorites.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Clique no coração vermelho para remover da lista de favoritos
            </p>
            <Button asChild variant="outline">
              <Link to="/">
                Descobrir Mais Pokémon
              </Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};