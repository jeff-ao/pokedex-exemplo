import { ReactNode, useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ViewMode } from '@/types/pokemon';

interface LayoutProps {
  children: ReactNode;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
}

export const Layout = ({ 
  children, 
  searchQuery = '',
  onSearchChange = () => {},
  viewMode = 'grid',
  onViewModeChange = () => {}
}: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
      />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};