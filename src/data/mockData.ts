export interface Chapter {
  id: string;
  number: number;
  title: string;
  releaseDate: string;
  pages: string[];
}

export interface Manga {
  id: string;
  title: string;
  titleArabic: string;
  description: string;
  coverImage: string;
  bannerImage: string;
  author: string;
  artist: string;
  status: 'ongoing' | 'completed' | 'hiatus';
  genres: string[];
  rating: number;
  views: number;
  chapters: Chapter[];
}

export const GENRES = [
  'أكشن', 'مغامرة', 'كوميديا', 'دراما', 'خيال', 'رعب', 'غموض', 'رومانسي', 'خيال علمي', 'شريحة من الحياة', 'رياضة', 'خارق للطبيعة'
];

export const MOCK_MANGA: Manga[] = [
  {
    id: '1',
    title: 'Shadow Legend',
    titleArabic: 'أسطورة الظل',
    description: 'في عالم حيث تهيمن القوى المظلمة، يظهر بطل غير متوقع من بين الحطام. يتبع شادو ليجند قصة شاب يكتشف قوى قديمة تمكنه من التحكم في الظلال، ويجب عليه القتال لاستعادة النور في وطنه.',
    coverImage: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/544ac29a-0d1e-4f12-aa3e-f7025cecc825/manga-cover-1-3f0335c1-1782686761292.webp',
    bannerImage: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/544ac29a-0d1e-4f12-aa3e-f7025cecc825/manga-cover-1-3f0335c1-1782686761292.webp',
    author: 'تاكيشي كين',
    artist: 'يوكي مورا',
    status: 'ongoing',
    genres: ['أكشن', 'خيال', 'مغامرة'],
    rating: 4.8,
    views: 125000,
    chapters: [
      { id: 'c1', number: 1, title: 'البداية', releaseDate: '2023-10-01', pages: ['https://picsum.photos/800/1200?random=1', 'https://picsum.photos/800/1200?random=2', 'https://picsum.photos/800/1200?random=3'] },
      { id: 'c2', number: 2, title: 'قوة الظلال', releaseDate: '2023-10-08', pages: ['https://picsum.photos/800/1200?random=4', 'https://picsum.photos/800/1200?random=5'] },
    ]
  },
  {
    id: '2',
    title: 'Neon Detective',
    titleArabic: 'المحقق نيون',
    description: 'تحت أضواء النيون الساطعة في مدينة طوكيو المستقبلية، يعمل محقق خاص على حل القضايا التي ترفض الشرطة لمسها. لغز معقد يربط بين أقوى الشركات التكنولوجية وعالم الجريمة السفلي.',
    coverImage: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/544ac29a-0d1e-4f12-aa3e-f7025cecc825/manga-cover-2-6eed06e3-1782686761416.webp',
    bannerImage: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/544ac29a-0d1e-4f12-aa3e-f7025cecc825/manga-cover-2-6eed06e3-1782686761416.webp',
    author: 'هيروشي ياماموتو',
    artist: 'هيروشي ياماموتو',
    status: 'completed',
    genres: ['غموض', 'خيال علمي', 'دراما'],
    rating: 4.5,
    views: 85000,
    chapters: [
      { id: 'c3', number: 1, title: 'ليلة ممطرة', releaseDate: '2023-05-15', pages: ['https://picsum.photos/800/1200?random=6', 'https://picsum.photos/800/1200?random=7'] },
    ]
  },
  {
    id: '3',
    title: 'Celestial Journey',
    titleArabic: 'رحلة سماوية',
    description: 'مغامرة ساحرة عبر ممالك طافية في السماء. تبحث فتاة شابة عن سر اختفاء والدها، لتكتشف عالماً مليئاً بالمخلوقات العجيبة والسحر الذي يتجاوز الخيال.',
    coverImage: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/544ac29a-0d1e-4f12-aa3e-f7025cecc825/manga-cover-3-19dbc622-1782686761792.webp',
    bannerImage: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/544ac29a-0d1e-4f12-aa3e-f7025cecc825/manga-cover-3-19dbc622-1782686761792.webp',
    author: 'أيمي ساتو',
    artist: 'أيمي ساتو',
    status: 'ongoing',
    genres: ['خيال', 'مغامرة', 'شريحة من الحياة'],
    rating: 4.9,
    views: 210000,
    chapters: [
      { id: 'c4', number: 1, title: 'فوق السحاب', releaseDate: '2023-11-20', pages: ['https://picsum.photos/800/1200?random=8'] },
    ]
  },
  {
    id: '4',
    title: 'Silent Screams',
    titleArabic: 'صرخات صامتة',
    description: 'قصة رعب نفسية تدور حول مدرسة مهجورة يقال إنها مسكونة بأرواح الطلاب الذين اختفوا غامضاً قبل عقد من الزمان. مجموعة من الأصدقاء يقررون استكشاف المكان، لكنهم يجدون أنفسهم في كابوس لا ينتهي.',
    coverImage: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/544ac29a-0d1e-4f12-aa3e-f7025cecc825/manga-cover-4-39c60186-1782686761781.webp',
    bannerImage: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/544ac29a-0d1e-4f12-aa3e-f7025cecc825/manga-cover-4-39c60186-1782686761781.webp',
    author: 'كينجي إيتو',
    artist: 'كينجي إيتو',
    status: 'ongoing',
    genres: ['رعب', 'غموض', 'خارق للطبيعة'],
    rating: 4.2,
    views: 56000,
    chapters: [
      { id: 'c5', number: 1, title: 'الهمس', releaseDate: '2023-12-05', pages: ['https://picsum.photos/800/1200?random=9'] },
    ]
  },
  {
    id: '5',
    title: 'Cherry Blossom Dreams',
    titleArabic: 'أحلام براعم الكرز',
    description: 'قصة حب رقيقة تبدأ تحت أشجار الكرز المتفتحة. يلتقي طالبان في المدرسة الثانوية من عوالم مختلفة تماماً، ويجدان العزاء والأمل في صداقتهما المتنامية التي تتحول ببطء إلى شيء أكثر عمقاً.',
    coverImage: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/544ac29a-0d1e-4f12-aa3e-f7025cecc825/manga-cover-5-89f357d1-1782686762266.webp',
    bannerImage: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/544ac29a-0d1e-4f12-aa3e-f7025cecc825/manga-cover-5-89f357d1-1782686762266.webp',
    author: 'هاروكا تاناكا',
    artist: 'هاروكا تاناكا',
    status: 'completed',
    genres: ['رومانسي', 'دراما', 'شريحة من الحياة'],
    rating: 4.7,
    views: 98000,
    chapters: [
      { id: 'c6', number: 1, title: 'اللقاء الأول', releaseDate: '2023-02-14', pages: ['https://picsum.photos/800/1200?random=10'] },
    ]
  }
];
