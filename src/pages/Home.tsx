import React from 'react';
import { MOCK_MANGA } from '@/data/mockData';
import { MangaCard } from '@/components/manga/MangaCard';
import { SectionHeader } from '@/components/manga/SectionHeader';
import { Hero } from '@/components/home/Hero';
import { Zap, Flame, Clock, TrendingUp } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

export default function Home() {
  useSEO({ title: 'الرئيسية', description: 'اكتشف أحدث المانغا والمانهوا المترجمة بالعربية. تصفح الآلاف من العناوين في مختلف التصنيفات.' });
  // Sort for different sections
  const trending = [...MOCK_MANGA].sort((a, b) => b.views - a.views);
  const latest = [...MOCK_MANGA].sort((a, b) => {
    const latestA = Math.max(...a.chapters.map(c => new Date(c.releaseDate).getTime()), 0);
    const latestB = Math.max(...b.chapters.map(c => new Date(c.releaseDate).getTime()), 0);
    return latestB - latestA;
  });

  return (
    <div className="animate-in fade-in duration-500">
      <Hero mangaList={trending} />

      <section className="mb-12">
        <SectionHeader title="رائج الآن" icon={Flame} viewAllLink="/search?sort=trending" />
        <div className="manga-grid">
          {trending.map(manga => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionHeader title="أحدث التحديثات" icon={Clock} viewAllLink="/latest" />
        <div className="manga-grid">
          {latest.map(manga => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionHeader title="مقترح لك" icon={Zap} />
        <div className="manga-grid">
          {[...MOCK_MANGA].reverse().map(manga => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </div>
      </section>
    </div>
  );
}
