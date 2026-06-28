import React, { useState } from 'react';
import { MOCK_MANGA, GENRES } from '@/data/mockData';
import { SectionHeader } from '@/components/manga/SectionHeader';
import { 
  LayoutDashboard, 
  BookOpen, 
  Layers, 
  Users, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('manga');
  useSEO({ title: 'لوحة التحكم', description: 'إدارة محتوى الموقع والمستخدمين والإعدادات.' });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredManga = MOCK_MANGA.filter(m => 
    m.titleArabic.includes(searchTerm) || m.title.includes(searchTerm)
  );

  const handleDelete = (name: string) => {
    toast.error(`هذه نسخة تجريبية. لا يمكن حذف "${name}"`);
  };

  const handleAdd = () => {
    toast.info('سيتم فتح نموذج إضافة محتوى جديد قريباً');
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SectionHeader title="لوحة التحكم" icon={LayoutDashboard} />
        <Button onClick={handleAdd}>
          <Plus className="ml-2 h-4 w-4" />
          إضافة جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 mb-8">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">إجمالي المانغا</p>
              <h3 className="text-2xl font-bold">{MOCK_MANGA.length}</h3>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-green-500/10 p-3 text-green-500">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">الفصول المنشورة</p>
              <h3 className="text-2xl font-bold">156</h3>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-blue-500/10 p-3 text-blue-500">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">المستخدمين</p>
              <h3 className="text-2xl font-bold">1,240</h3>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-yellow-500/10 p-3 text-yellow-500">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">طلبات معلقة</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="manga" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="manga">المانغا</TabsTrigger>
          <TabsTrigger value="chapters">الفصول</TabsTrigger>
          <TabsTrigger value="categories">التصنيفات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="manga" className="mt-6 space-y-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="البحث في المانغا..."
              className="pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="rounded-xl border bg-card overflow-hidden">
            <table className="w-full text-right text-sm">
              <thead className="bg-accent/50 border-b">
                <tr>
                  <th className="px-6 py-4 font-bold">المانغا</th>
                  <th className="px-6 py-4 font-bold">الحالة</th>
                  <th className="px-6 py-4 font-bold">الفصول</th>
                  <th className="px-6 py-4 font-bold">المشاهدات</th>
                  <th className="px-6 py-4 font-bold">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredManga.map(manga => (
                  <tr key={manga.id} className="hover:bg-accent/20">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={manga.coverImage} alt="" className="h-10 w-8 rounded object-cover" />
                        <div>
                          <p className="font-bold">{manga.titleArabic}</p>
                          <p className="text-xs text-muted-foreground">{manga.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={manga.status === 'ongoing' ? 'default' : 'secondary'}>
                        {manga.status === 'ongoing' ? 'مستمرة' : 'مكتملة'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 font-medium">{manga.chapters.length}</td>
                    <td className="px-6 py-4 text-muted-foreground">{(manga.views / 1000).toFixed(1)}k</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(manga.titleArabic)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="chapters" className="mt-6">
          <div className="rounded-xl border bg-card p-12 text-center">
            <p className="text-muted-foreground">سيتم عرض قائمة أحدث الفصول المضافة هنا مع خيارات الإدارة.</p>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GENRES.map(genre => (
              <div key={genre} className="flex items-center justify-between rounded-lg border p-4 bg-card">
                <span className="font-medium">{genre}</span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
