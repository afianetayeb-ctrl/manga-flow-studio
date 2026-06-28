import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

export function useSEO({ title, description, image, type = 'website' }: SEOProps = {}) {
  useEffect(() => {
    const siteName = 'MangaAr';
    const defaultTitle = `${siteName} - اقرأ المانغا بالعربية`;
    const defaultDescription = 'منصتكم المفضلة لقراءة المانغا والمانهوا باللغة العربية. استمتع بآلاف الفصول المحدثة يومياً.';

    const pageTitle = title ? `${title} | ${siteName}` : defaultTitle;
    const pageDescription = description || defaultDescription;

    // Update document title
    document.title = pageTitle;

    // Update meta description
    const updateMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', pageDescription);
    updateMeta('og:title', pageTitle, true);
    updateMeta('og:description', pageDescription, true);
    updateMeta('og:type', type, true);
    if (image) {
      updateMeta('og:image', image, true);
    }
    updateMeta('twitter:title', pageTitle, true);
    updateMeta('twitter:description', pageDescription, true);
  }, [title, description, image, type]);
}
