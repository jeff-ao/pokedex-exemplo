import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404 - Página não encontrada</h1>
        <p className="mb-4 text-xl text-muted-foreground">
          Oops! A página que você está procurando não existe.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-colors"
        >
          Voltar para a Pokédex
        </a>
      </div>
    </div>
  );
};

export default NotFound;
