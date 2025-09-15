import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ViewMode } from '@/types/pokemon';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export const Header = ({ 
  searchQuery, 
  onSearchChange, 
  viewMode, 
  onViewModeChange 
}: HeaderProps) => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-card">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-pokeball rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-card rounded-full"></div>
          </div>
          <span className="text-xl font-bold gradient-text">
            Pokédex
          </span>
        </Link>

        {/* Search Bar - Only show on home page */}
        {location.pathname === '/' && (
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar Pokémon..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-gradient-card border-border/50 focus:border-primary/50 transition-colors"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex items-center space-x-2">
          {/* View Mode Toggle - Only show on home page */}
          {location.pathname === '/' && (
            <div className="flex items-center border rounded-lg p-1 bg-muted/30">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('grid')}
                className="h-7 w-7 p-0"
              >
                <Grid3X3 className="h-3 w-3" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('list')}
                className="h-7 w-7 p-0"
              >
                <List className="h-3 w-3" />
              </Button>
            </div>
          )}

          {/* Favorites Link */}
          <Button asChild variant="ghost" size="sm">
            <Link to="/favoritos" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Favoritos</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};