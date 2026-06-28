import React from 'react';
import { useStore } from '@/context/StoreContext';
import { SectionHeader } from '@/components/manga/SectionHeader';
import { User, Mail, Calendar, Settings, Bell, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useSEO } from '@/hooks/useSEO';

export default function Profile() {
  const { isDarkMode, setIsDarkMode } = useStore();
  useSEO({ title: 'الملف الشخصي', description: 'إدارة حسابك وإعداداتك الشخصية على MangaAr.' });

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <SectionHeader title="الملف الشخصي" icon={User} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-4">
          <div className="rounded-xl border bg-card p-6 text-center">
            <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-bold">زائر متفاعل</h3>
            <p className="text-sm text-muted-foreground">عضو منذ أكتوبر 2023</p>
            <Button variant="outline" className="mt-6 w-full text-destructive hover:bg-destructive/10">
              <LogOut className="ml-2 h-4 w-4" />
              تسجيل الخروج
            </Button>
          </div>
          
          <nav className="rounded-xl border bg-card overflow-hidden">
            <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium bg-accent">
              <User className="h-4 w-4" />
              المعلومات الشخصية
            </button>
            <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-accent/50 transition-colors">
              <Bell className="h-4 w-4" />
              الإشعارات
            </button>
            <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-accent/50 transition-colors">
              <Shield className="h-4 w-4" />
              الأمان والخصوصية
            </button>
            <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-accent/50 transition-colors">
              <Settings className="h-4 w-4" />
              الإعدادات
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          <div className="rounded-xl border bg-card p-6">
            <h4 className="text-lg font-bold mb-6">المعلومات الشخصية</h4>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>اسم المستخدم</Label>
                <Input defaultValue="MangaLover99" />
              </div>
              <div className="space-y-2">
                <Label>البريد الإلكتروني</Label>
                <Input defaultValue="user@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <Label>الاسم الكامل</Label>
                <Input defaultValue="أحمد محمد" />
              </div>
              <div className="space-y-2">
                <Label>تاريخ الميلاد</Label>
                <Input defaultValue="1995-05-15" type="date" />
              </div>
            </div>
            <Button className="mt-8">حفظ التغييرات</Button>
          </div>

          <div className="rounded-xl border bg-card p-6">
            <h4 className="text-lg font-bold mb-6">إعدادات الموقع</h4>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>الوضع الليلي</Label>
                  <p className="text-sm text-muted-foreground">تفعيل المظهر الداكن للموقع</p>
                </div>
                <Switch 
                  checked={isDarkMode} 
                  onCheckedChange={setIsDarkMode}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>تلقي الإشعارات</Label>
                  <p className="text-sm text-muted-foreground">تلقي تنبيهات عند نزول فصول جديدة للمفضلة</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>تحميل الصور مسبقاً</Label>
                  <p className="text-sm text-muted-foreground">تسريع تجربة القراءة عبر تحميل الصفحات التالية</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
