import { Link } from 'react-router-dom';
import { Star, Eye, Heart } from 'lucide-react';
import { Manga } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/context/StoreContext';
import { cn } from '@/lib/utils';

export function MangaCard({ manga }: { manga: Manga }) {
  const { favorites, toggleFavorite } = useStore();
  const isFavorite = favorites.includes(manga.id);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg">
      <Link to={`/manga/${manga.id}`} className="relative aspect-[3/4] overflow-hidden">
        <img
          src={manga.coverImage}
          alt={manga.titleArabic}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <Badge variant={manga.status === 'ongoing' ? 'default' : 'secondary'} className="bg-primary text-primary-foreground border-none">
            {manga.status === 'ongoing' ? 'مستمر' : 'مكتمل'}
          </Badge>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(manga.id);
          }}
          className={cn(
            "absolute top-2 right-2 rounded-full p-2 transition-colors",
            isFavorite ? "bg-red-500 text-white" : "bg-black/50 text-white hover:bg-black/70"
          )}
        >
          <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
        </button>

        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white/90">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span>{manga.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{(manga.views / 1000).toFixed(1)}k</span>
          </div>
        </div>
      </Link>
      
      <div className="p-3">
        <Link to={`/manga/${manga.id}`} className="block">
          <h3 className="line-clamp-1 text-sm font-bold hover:text-primary transition-colors">
            {manga.titleArabic}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
          {manga.genres.join(' • ')}
        </p>
      </div>
    </div>
  );
}
