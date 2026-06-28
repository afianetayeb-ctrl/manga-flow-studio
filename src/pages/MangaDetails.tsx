import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_MANGA } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, Eye, Clock, Heart, Share2, Play } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useSEO } from '@/hooks/useSEO';
import { toast } from 'sonner';

export default function MangaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useStore();
  const manga = MOCK_MANGA.find(m => m.id === id);
  useSEO({ title: manga?.titleArabic, description: manga?.description, image: manga?.coverImage, type: 'article' });
  
  if (!manga) {
    return <div className="text-center py-20">المانغا غير موجودة</div>;
  }

  const isFavorite = favorites.includes(manga.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('تم نسخ الرابط إلى الحافظة');
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Banner */}
      <div className="relative h-[250px] md:h-[400px] w-full overflow-hidden rounded-2xl">
        <img
          src={manga.bannerImage}
          alt={manga.titleArabic}
          className="h-full w-full object-cover blur-sm brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container relative -mt-32 md:-mt-48 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cover */}
          <div className="mx-auto w-[200px] flex-shrink-0 md:mx-0">
            <div className="aspect-[3/4] overflow-hidden rounded-xl border-4 border-background shadow-2xl">
              <img
                src={manga.coverImage}
                alt={manga.titleArabic}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <Button 
                className="w-full bg-primary"
                onClick={() => navigate(`/reader/${manga.id}/${manga.chapters[0]?.id}`)}
              >
                <Play className="ml-2 h-4 w-4 fill-current" />
                اقرأ الفصل الأول
              </Button>
              <Button 
                variant={isFavorite ? "secondary" : "outline"} 
                className="w-full"
                onClick={() => toggleFavorite(manga.id)}
              >
                <Heart className={`ml-2 h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                {isFavorite ? 'في المفضلة' : 'أضف للمفضلة'}
              </Button>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-right">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
              {manga.genres.map(genre => (
                <Badge key={genre} variant="secondary" className="hover:bg-primary hover:text-white transition-colors cursor-pointer">
                  {genre}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-4">{manga.titleArabic}</h1>
            <p className="text-lg text-muted-foreground mb-6 font-medium">{manga.title}</p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-foreground">{manga.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="font-bold text-foreground">{(manga.views / 1000).toFixed(1)}k مشاهدة</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="font-bold text-foreground">{manga.status === 'ongoing' ? 'مستمر' : 'مكتمل'}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="ml-2 h-4 w-4" />
                مشاركة
              </Button>
            </div>

            <div className="bg-card/50 rounded-xl p-6 mb-8 text-right">
              <h3 className="text-xl font-bold mb-4">القصة</h3>
              <p className="leading-relaxed text-muted-foreground">
                {manga.description}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-accent/20 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">المؤلف</p>
                <p className="font-bold">{manga.author}</p>
              </div>
              <div className="bg-accent/20 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">الرسام</p>
                <p className="font-bold">{manga.artist}</p>
              </div>
              <div className="bg-accent/20 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">التصنيف العمري</p>
                <p className="font-bold">13+</p>
              </div>
              <div className="bg-accent/20 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">تاريخ النشر</p>
                <p className="font-bold">2023</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Chapters */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">الفصول ({manga.chapters.length})</h2>
            <Button variant="outline" size="sm">ترتيب تصاعدي</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {manga.chapters.map(chapter => (
              <Link
                key={chapter.id}
                to={`/reader/${manga.id}/${chapter.id}`}
                className="group flex items-center justify-between rounded-xl border bg-card p-4 transition-all hover:border-primary hover:bg-accent/50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                    {chapter.number}
                  </div>
                  <div>
                    <h4 className="font-bold">{chapter.title}</h4>
                    <p className="text-xs text-muted-foreground">{chapter.releaseDate}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  اقرأ
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
