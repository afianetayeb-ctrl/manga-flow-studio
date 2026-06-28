import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Manga } from '@/data/mockData';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Hero({ mangaList }: { mangaList: Manga[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const featured = mangaList.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featured.length]);

  const current = featured[currentIndex];

  return (
    <div className="relative mb-12 h-[300px] md:h-[450px] w-full overflow-hidden rounded-2xl shadow-xl">
      <div className="absolute inset-0 transition-all duration-700">
        <img
          src={current.bannerImage}
          alt={current.titleArabic}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
      </div>

      <div className="absolute inset-y-0 right-0 flex w-full flex-col justify-center px-6 md:w-2/3 md:px-12 text-white">
        <h1 className="text-3xl font-black md:text-5xl leading-tight">
          {current.titleArabic}
        </h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {current.genres.map(g => (
            <span key={g} className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm">
              {g}
            </span>
          ))}
        </div>
        <p className="mt-6 line-clamp-3 max-w-lg text-sm md:text-base text-gray-200">
          {current.description}
        </p>
        <div className="mt-8 flex gap-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => navigate(`/manga/${current.id}`)}>
            <Play className="ml-2 h-4 w-4 fill-current" />
            اقرأ الآن
          </Button>
          <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20" onClick={() => navigate(`/manga/${current.id}`)}>
            التفاصيل
          </Button>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 flex gap-2">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
