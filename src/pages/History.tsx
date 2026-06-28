import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_MANGA } from '@/data/mockData';
import { SectionHeader } from '@/components/manga/SectionHeader';
import { History as HistoryIcon, Clock, Trash2 } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { useSEO } from '@/hooks/useSEO';

export default function History() {
  const { history } = useStore();
  useSEO({ title: 'سجل القراءة', description: 'تتبع سجل القراءة الخاص بك وعد إلى الفصول التي قرأتها مؤخراً.' });
  
  const historyItems = history.map(item => {
    const manga = MOCK_MANGA.find(m => m.id === item.mangaId);
    const chapter = manga?.chapters.find(c => c.id === item.chapterId);
    return { ...item, manga, chapter };
  }).filter(item => item.manga);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <SectionHeader title="سجل القراءة" icon={HistoryIcon} />
      </div>
      
      {historyItems.length > 0 ? (
        <div className="space-y-4">
          {historyItems.map((item, idx) => (
            <div key={idx} className="group flex items-center gap-4 rounded-xl border bg-card p-4 transition-all hover:bg-accent/50">
              <Link to={`/manga/${item.manga?.id}`} className="h-20 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                <img src={item.manga?.coverImage} alt={item.manga?.titleArabic} className="h-full w-full object-cover" />
              </Link>
              <div className="flex-1">
                <Link to={`/manga/${item.manga?.id}`} className="font-bold hover:text-primary">{item.manga?.titleArabic}</Link>
                <p className="text-sm text-muted-foreground">آخر فصل قرأته: الفصل {item.chapter?.number}</p>
                <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(item.timestamp).toLocaleDateString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
              <Button asChild variant="secondary" size="sm">
                <Link to={`/reader/${item.manga?.id}/${item.chapter?.id}`}>متابعة القراءة</Link>
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="rounded-full bg-accent p-6 mb-4">
            <HistoryIcon className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold">سجل القراءة فارغ</h3>
          <p className="text-muted-foreground">لم تقرأ أي مانغا مؤخراً.</p>
        </div>
      )}
    </div>
  );
}
