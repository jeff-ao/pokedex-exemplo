import { Heart, Code } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-card border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-pokeball rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-card rounded-full"></div>
              </div>
              <span className="text-lg font-bold gradient-text">Pokédex</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Explore o mundo Pokémon com nossa Pokédex moderna. Descubra
              informações detalhadas sobre seus Pokémon favoritos.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Links Rápidos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-primary transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a
                  href="/favoritos"
                  className="hover:text-primary transition-colors"
                >
                  Favoritos
                </a>
              </li>
              <li>
                <a
                  href="https://pokeapi.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  PokéAPI
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Sobre</h3>
            <p className="text-sm text-muted-foreground">
              Desenvolvido com React, TypeScript e Tailwind CSS. Consumindo a
              PokéAPI para trazer informações precisas sobre todos os Pokémon.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Pokédex. Dados fornecidos pela{" "}
            <a
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              PokéAPI
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
