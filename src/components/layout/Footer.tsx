import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-primary">MangaAr</Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              منصتكم المفضلة لقراءة المانغا والمانهوا باللغة العربية. تابع آخر التحديثات واستمتع بتجربة قراءة فريدة.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">الرئيسية</Link></li>
              <li><Link to="/search" className="hover:text-primary">اكتشف</Link></li>
              <li><Link to="/latest" className="hover:text-primary">أحدث الفصول</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">الدعم</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-primary">سياسة الخصوصية</Link></li>
              <li><Link to="#" className="hover:text-primary">شروط الاستخدام</Link></li>
              <li><Link to="#" className="hover:text-primary">اتصل بنا</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} MangaAr. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
