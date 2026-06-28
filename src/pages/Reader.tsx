import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_MANGA } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Settings, 
  Layout, 
  ZoomIn, 
  ZoomOut, 
  List, 
  Home,
  ChevronDown
} from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useStore } from '@/context/StoreContext';
import { useSEO } from '@/hooks/useSEO';

export default function Reader() {
  const { mangaId, chapterId } = useParams();
  const navigate = useNavigate();
  const { addToHistory } = useStore();
  
  const manga = MOCK_MANGA.find(m => m.id === mangaId);
  const chapter = manga?.chapters.find(c => c.id === chapterId);
  useSEO({ title: chapter ? `${manga?.titleArabic} - الفصل ${chapter.number}` : 'قراءة المانغا', description: manga?.description, image: manga?.coverImage, type: 'article' });
  
  const [zoom, setZoom] = useState(100);
  const [scrollMode, setScrollMode] = useState<'vertical' | 'webtoon'>('vertical');

  useEffect(() => {
    if (mangaId && chapterId) {
      addToHistory(mangaId, chapterId);
    }
    window.scrollTo(0, 0);
  }, [mangaId, chapterId]);

  if (!manga || !chapter) {
    return <div className="text-center py-20">الفصل غير موجود</div>;
  }

  const currentIndex = manga.chapters.findIndex(c => c.id === chapterId);
  const nextChapter = manga.chapters[currentIndex + 1];
  const prevChapter = manga.chapters[currentIndex - 1];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Reader Nav */}
      <div className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-black/80 px-4 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/manga/${manga.id}`}><ChevronRight className="h-5 w-5" /></Link>
          </Button>
          <div className="hidden md:block">
            <h1 className="text-sm font-bold line-clamp-1">{manga.titleArabic}</h1>
            <p className="text-xs text-muted-foreground">الفصل {chapter.number}: {chapter.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10">
                الفصل {chapter.number}
                <ChevronDown className="mr-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="max-h-[300px] overflow-y-auto bg-black text-white border-white/10">
              {manga.chapters.map(c => (
                <DropdownMenuItem 
                  key={c.id} 
                  onClick={() => navigate(`/reader/${manga.id}/${c.id}`)}
                  className={c.id === chapterId ? 'bg-primary' : ''}
                >
                  الفصل {c.number}: {c.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="hidden lg:flex items-center gap-1 border-x border-white/10 px-4 mx-2">
            <Button variant="ghost" size="icon" onClick={() => setZoom(Math.max(50, zoom - 10))}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs w-10 text-center">{zoom}%</span>
            <Button variant="ghost" size="icon" onClick={() => setZoom(Math.min(150, zoom + 10))}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="ghost" size="icon" onClick={() => setScrollMode(scrollMode === 'vertical' ? 'webtoon' : 'vertical')} title="تغيير وضع القراءة">
            <Layout className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            disabled={!prevChapter}
            onClick={() => prevChapter && navigate(`/reader/${manga.id}/${prevChapter.id}`)}
          >
            السابق
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            disabled={!nextChapter}
            onClick={() => nextChapter && navigate(`/reader/${manga.id}/${nextChapter.id}`)}
          >
            التالي
          </Button>
        </div>
      </div>

      {/* Pages */}
      <div className={`mx-auto flex flex-col items-center py-8 ${scrollMode === 'webtoon' ? 'gap-0' : 'gap-4'}`}>
        {chapter.pages.map((page, idx) => (
          <div 
            key={idx} 
            className="relative" 
            style={{ width: `${zoom}%`, maxWidth: '1000px' }}
          >
            <img
              src={page}
              alt={`Page ${idx + 1}`}
              className="w-full h-auto select-none"
              loading={idx < 2 ? 'eager' : 'lazy'}
            />
            <div className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-1 text-[10px]">
              {idx + 1} / {chapter.pages.length}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="flex flex-col items-center gap-6 py-20 border-t border-white/10">
        <h3 className="text-xl font-bold">لقد انتهيت من قراءة الفصل {chapter.number}</h3>
        <div className="flex gap-4">
          {prevChapter && (
            <Button variant="outline" onClick={() => navigate(`/reader/${manga.id}/${prevChapter.id}`)}>
              <ChevronRight className="ml-2 h-4 w-4" />
              الفصل السابق
            </Button>
          )}
          <Button asChild>
            <Link to={`/manga/${manga.id}`}>قائمة الفصول</Link>
          </Button>
          {nextChapter && (
            <Button onClick={() => navigate(`/reader/${manga.id}/${nextChapter.id}`)}>
              الفصل التالي
              <ChevronLeft className="mr-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
