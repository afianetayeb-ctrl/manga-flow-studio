import React from 'react';
import { MOCK_MANGA } from '@/data/mockData';
import { MangaCard } from '@/components/manga/MangaCard';
import { SectionHeader } from '@/components/manga/SectionHeader';
import { Heart } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useSEO } from '@/hooks/useSEO';

export default function Favorites() {
  const { favorites } = useStore();
  useSEO({ title: 'المفضلة', description: 'قائمة المانغا المفضلة لديك. تابع أحدث الفصول لعناوينك المفضلة.' });
  const favoriteManga = MOCK_MANGA.filter(m => favorites.includes(m.id));

  return (
    <div className="animate-in fade-in duration-500">
      <SectionHeader title="المفضلة" icon={Heart} />
      
      {favoriteManga.length > 0 ? (
        <div className="manga-grid">
          {favoriteManga.map(manga => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="rounded-full bg-red-500/10 p-6 mb-4 text-red-500">
            <Heart className="h-10 w-10" />
          </div>
          <h3 className="text-xl font-bold">قائمة المفضلة فارغة</h3>
          <p className="text-muted-foreground">لم تقم بإضافة أي مانغا إلى مفضلتك بعد.</p>
        </div>
      )}
    </div>
  );
}
