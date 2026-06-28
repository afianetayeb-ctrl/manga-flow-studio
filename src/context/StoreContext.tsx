import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface StoreContextType {
  favorites: string[];
  toggleFavorite: (mangaId: string) => void;
  history: { mangaId: string; chapterId: string; timestamp: number }[];
  addToHistory: (mangaId: string, chapterId: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<string[]>('mangaar-favorites', []);
  const [history, setHistory] = useLocalStorage<{ mangaId: string; chapterId: string; timestamp: number }[]>('mangaar-history', []);
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('mangaar-darkmode', true);

  const toggleFavorite = (mangaId: string) => {
    setFavorites(prev => 
      prev.includes(mangaId) ? prev.filter(id => id !== mangaId) : [...prev, mangaId]
    );
  };

  const addToHistory = (mangaId: string, chapterId: string) => {
    setHistory(prev => {
      const newHistory = prev.filter(h => h.mangaId !== mangaId);
      return [{ mangaId, chapterId, timestamp: Date.now() }, ...newHistory].slice(0, 50);
    });
  };

  return (
    <StoreContext.Provider value={{ favorites, toggleFavorite, history, addToHistory, isDarkMode, setIsDarkMode }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
