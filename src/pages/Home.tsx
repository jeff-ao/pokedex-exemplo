import { useState, useEffect, useMemo } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { PokemonCard } from '@/components/PokemonCard';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Pokemon, ViewMode } from '@/types/pokemon';
import { pokemonApi } from '@/services/pokemonApi';
import heroImage from '@/assets/pokemon-hero.jpg';

export const Home = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        setLoading(true);
        setError(null);
        const pokemon = await pokemonApi.getPokemonList(151);
        setPokemonList(pokemon);
      } catch (err) {
        setError('Erro ao carregar a lista de Pokémon. Tente novamente.');
        console.error('Error fetching Pokemon list:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  const filteredPokemon = useMemo(() => {
    if (!searchQuery.trim()) return pokemonList;
    
    const query = searchQuery.toLowerCase();
    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query) ||
      pokemon.id.toString().includes(query)
    );
  }, [pokemonList, searchQuery]);

  const retry = () => {
    setError(null);
    window.location.reload();
  };

  return (
    <Layout
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40" />
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold">
                <span className="gradient-text">Pokédex</span>
                <br />
                <span className="text-foreground">Moderna</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-md">
                Explore o incrível mundo Pokémon! Descubra informações 
                detalhadas sobre todos os seus Pokémon favoritos.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-3 h-3 bg-gradient-primary rounded-full"></div>
                  <span>{pokemonList.length} Pokémon disponíveis</span>
                </div>
              </div>
            </div>
            
            <div className="relative lg:block hidden">
              <img
                src={heroImage}
                alt="Pokemon Hero"
                className="w-full max-w-md mx-auto rounded-2xl shadow-pokemon"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        {/* Results Info */}
        {!loading && !error && (
          <div className="mb-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {searchQuery ? (
                <>
                  Mostrando {filteredPokemon.length} resultado{filteredPokemon.length !== 1 ? 's' : ''} 
                  {filteredPokemon.length > 0 && ` para "${searchQuery}"`}
                </>
              ) : (
                `${filteredPokemon.length} Pokémon encontrados`
              )}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg text-muted-foreground">Carregando Pokémon...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="py-16">
            <Alert className="max-w-md mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <div className="text-center mt-4">
              <Button onClick={retry}>Tentar Novamente</Button>
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filteredPokemon.length === 0 && searchQuery && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Nenhum Pokémon encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Não encontramos nenhum Pokémon com "{searchQuery}". 
              Tente buscar por outro nome ou número.
            </p>
            <Button variant="outline" onClick={() => setSearchQuery('')}>
              Ver Todos os Pokémon
            </Button>
          </div>
        )}

        {/* Pokemon Grid/List */}
        {!loading && !error && filteredPokemon.length > 0 && (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" 
              : "space-y-4"
          }>
            {filteredPokemon.map((pokemon) => (
              <PokemonCard 
                key={pokemon.id} 
                pokemon={pokemon} 
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};