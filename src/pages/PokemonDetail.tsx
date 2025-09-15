import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Weight, Ruler, Star, Loader2, AlertCircle } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PokemonDetails } from '@/types/pokemon';
import { pokemonApi } from '@/services/pokemonApi';
import { useFavorites } from '@/hooks/useFavorites';

export const PokemonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const pokemonId = parseInt(id || '0');
  const isInFavorites = pokemon ? isFavorite(pokemon.id) : false;

  useEffect(() => {
    if (!id) {
      setError('ID do Pokémon não encontrado');
      setLoading(false);
      return;
    }

    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        const pokemonData = await pokemonApi.getPokemonDetails(pokemonId);
        setPokemon(pokemonData);
      } catch (err) {
        setError(`Erro ao carregar detalhes do Pokémon #${id}`);
        console.error('Error fetching Pokemon details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id, pokemonId]);

  const handleFavoriteClick = () => {
    if (!pokemon) return;
    
    toggleFavorite({
      id: pokemon.id,
      name: pokemon.name,
      imageUrl: pokemonApi.getPokemonImageUrl(pokemon.id),
    });
  };

  const getTypeColor = (type: string): string => {
    const colors: { [key: string]: string } = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-300',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-400',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-800',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-700',
      dark: 'bg-gray-800',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300',
    };
    return colors[type] || 'bg-gray-400';
  };

  const getStatName = (statName: string): string => {
    const names: { [key: string]: string } = {
      hp: 'HP',
      attack: 'Ataque',
      defense: 'Defesa',
      'special-attack': 'At. Especial',
      'special-defense': 'Def. Especial',
      speed: 'Velocidade',
    };
    return names[statName] || statName;
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">Carregando detalhes do Pokémon...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !pokemon) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          
          <div className="text-center py-16">
            <Alert className="max-w-md mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error || 'Pokémon não encontrado'}
              </AlertDescription>
            </Alert>
            <div className="mt-6 space-x-4">
              <Button asChild variant="outline">
                <Link to="/">Voltar ao Início</Link>
              </Button>
              <Button onClick={() => window.location.reload()}>
                Tentar Novamente
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const pokemonName = pokemonApi.capitalizeFirstLetter(pokemon.name);
  const formattedId = pokemonApi.formatPokemonId(pokemon.id);
  const imageUrl = pokemonApi.getPokemonImageUrl(pokemon.id);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pokemon Image and Basic Info */}
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-8 text-center">
              <div className="relative mb-6">
                <div className="w-64 h-64 mx-auto relative">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-lg">
                      <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
                    </div>
                  )}
                  <img
                    src={imageUrl}
                    alt={pokemonName}
                    className={`w-full h-full object-contain transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
                
                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handleFavoriteClick}
                  className="absolute -top-2 -right-2 pokemon-hover"
                >
                  <Heart 
                    className={`h-6 w-6 transition-colors ${
                      isInFavorites 
                        ? 'text-secondary fill-secondary' 
                        : 'text-muted-foreground hover:text-secondary'
                    }`} 
                  />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {formattedId}
                  </Badge>
                  <h1 className="text-3xl font-bold gradient-text">
                    {pokemonName}
                  </h1>
                </div>

                {/* Types */}
                <div className="flex justify-center space-x-2">
                  {pokemon.types.map((typeInfo) => (
                    <Badge
                      key={typeInfo.type.name}
                      className={`${getTypeColor(typeInfo.type.name)} text-white border-none`}
                    >
                      {pokemonApi.capitalizeFirstLetter(typeInfo.type.name)}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pokemon Stats and Details */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-accent" />
                  <span>Informações Básicas</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Ruler className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Altura</p>
                      <p className="font-semibold">{pokemon.height / 10} m</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <Weight className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Peso</p>
                      <p className="font-semibold">{pokemon.weight / 10} kg</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-1">Experiência Base</p>
                  <p className="text-xl font-bold text-accent">
                    {pokemon.base_experience || 'N/A'} XP
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {getStatName(stat.stat.name)}
                      </span>
                      <span className="text-sm font-bold">
                        {stat.base_stat}
                      </span>
                    </div>
                    <Progress 
                      value={(stat.base_stat / 255) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};