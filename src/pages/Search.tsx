import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_MANGA, GENRES } from '@/data/mockData';
import { MangaCard } from '@/components/manga/MangaCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/manga/SectionHeader';
import { Search as SearchIcon, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSEO } from '@/hooks/useSEO';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  useSEO({ title: query ? `البحث: ${query}` : 'اكتشف المانغا', description: 'ابحث عن المانغا المفضلة لديك باستخدام الفلاتر المتقدمة حسب التصنيف والحالة.' });
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('all');

  const filteredManga = useMemo(() => {
    return MOCK_MANGA.filter(manga => {
      const matchesQuery = manga.titleArabic.toLowerCase().includes(query.toLowerCase()) || 
                          manga.title.toLowerCase().includes(query.toLowerCase());
      const matchesGenre = selectedGenres.length === 0 || 
                          selectedGenres.every(g => manga.genres.includes(g));
      const matchesStatus = status === 'all' || manga.status === status;
      
      return matchesQuery && matchesGenre && matchesStatus;
    });
  }, [query, selectedGenres, status]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  return (
    <div className="animate-in fade-in duration-500">
      <SectionHeader title="البحث المتقدم" icon={SearchIcon} />
      
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Filters Sidebar */}
        <div className="space-y-6 rounded-xl border bg-card p-6 md:col-span-1">
          <div>
            <h3 className="mb-3 font-bold">الحالة</h3>
            <div className="flex flex-col gap-2">
              {['all', 'ongoing', 'completed'].map(s => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                    status === s ? 'bg-primary text-white' : 'hover:bg-accent'
                  }`}
                >
                  <span>{s === 'all' ? 'الكل' : s === 'ongoing' ? 'مستمر' : 'مكتمل'}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-bold">التصنيفات</h3>
            <div className="flex flex-wrap gap-2">
              {GENRES.map(genre => (
                <Badge
                  key={genre}
                  variant={selectedGenres.includes(genre) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleGenre(genre)}
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          {(selectedGenres.length > 0 || status !== 'all' || query) && (
            <Button 
              variant="ghost" 
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => {
                setSelectedGenres([]);
                setStatus('all');
                setSearchParams({});
              }}
            >
              <X className="ml-2 h-4 w-4" />
              مسح الكل
            </Button>
          )}
        </div>

        {/* Results */}
        <div className="md:col-span-3">
          <div className="mb-6 relative">
            <SearchIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="ابحث بالعنوان..."
              className="pr-10 h-12 text-lg"
              value={query}
              onChange={(e) => setSearchParams({ q: e.target.value })}
            />
          </div>

          <div className="mb-4 text-sm text-muted-foreground">
            تم العثور على {filteredManga.length} مانغا
          </div>

          {filteredManga.length > 0 ? (
            <div className="manga-grid">
              {filteredManga.map(manga => (
                <MangaCard key={manga.id} manga={manga} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="rounded-full bg-accent p-6 mb-4">
                <SearchIcon className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold">لم يتم العثور على نتائج</h3>
              <p className="text-muted-foreground">جرب كلمات بحث مختلفة أو تغيير الفلاتر</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
