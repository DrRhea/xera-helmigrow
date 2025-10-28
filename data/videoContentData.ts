export interface VideoContent {
  id: number;
  title: string;
  description: string;
  tag: string;
  viewCount: number;
  duration: string; // formatted duration like "5:30"
  videoFile: string; // nama file video di assets
  thumbnailUrl?: string;
  category: string;
  author: string;
  createdAt: string;
  isPublished: boolean;
}

export const videoContentData: VideoContent[] = [
  {
    id: 1,
    title: 'Cari Mainan',
    description: 'Video stimulasi untuk melatih kemampuan mencari dan mengenali objek pada anak',
    tag: 'Stimulasi Kognitif',
    viewCount: 1250,
    duration: '3:45',
    videoFile: 'cari-mainan.mp4',
    category: 'Stimulasi',
    author: 'Tim HelmiGrow',
    createdAt: '2024-01-15',
    isPublished: true,
  },
  {
    id: 2,
    title: 'Ciluk Ba',
    description: 'Permainan interaktif ciluk ba untuk melatih respons dan komunikasi anak',
    tag: 'Interaksi Sosial',
    viewCount: 2100,
    duration: '2:30',
    videoFile: 'ciluk-ba.mp4',
    category: 'Interaksi',
    author: 'Tim HelmiGrow',
    createdAt: '2024-01-16',
    isPublished: true,
  },
  {
    id: 3,
    title: 'Nyanyian Tidur',
    description: 'Lagu pengantar tidur yang menenangkan untuk membantu anak tidur nyenyak',
    tag: 'Relaksasi',
    viewCount: 3200,
    duration: '4:15',
    videoFile: 'nyanyian-tidur.mp4',
    category: 'Relaksasi',
    author: 'Tim HelmiGrow',
    createdAt: '2024-01-17',
    isPublished: true,
  },
  {
    id: 4,
    title: 'Stimulasi Bahasa',
    description: 'Video edukatif untuk melatih kemampuan berbahasa dan komunikasi anak',
    tag: 'Perkembangan Bahasa',
    viewCount: 1800,
    duration: '5:20',
    videoFile: 'stimulasi-bahasa.mp4',
    category: 'Bahasa',
    author: 'Tim HelmiGrow',
    createdAt: '2024-01-18',
    isPublished: true,
  },
  {
    id: 5,
    title: 'Stimulasi Berdiri',
    description: 'Latihan motorik kasar untuk membantu anak belajar berdiri dan berjalan',
    tag: 'Motorik Kasar',
    viewCount: 1650,
    duration: '4:00',
    videoFile: 'stimulasi-berdiri.mp4',
    category: 'Motorik',
    author: 'Tim HelmiGrow',
    createdAt: '2024-01-19',
    isPublished: true,
  },
  {
    id: 6,
    title: 'Tangkap Bola Motorik',
    description: 'Latihan koordinasi mata-tangan dan motorik halus dengan permainan bola',
    tag: 'Motorik Halus',
    viewCount: 1950,
    duration: '3:15',
    videoFile: 'tangkap-bola-motorik.mp4',
    category: 'Motorik',
    author: 'Tim HelmiGrow',
    createdAt: '2024-01-20',
    isPublished: true,
  },
  {
    id: 7,
    title: 'Tapuakambaiambai',
    description: 'Permainan tradisional yang melatih ritme dan koordinasi gerak anak',
    tag: 'Tradisional',
    viewCount: 2800,
    duration: '4:45',
    videoFile: 'tapuakambaiambai.mp4',
    category: 'Tradisional',
    author: 'Tim HelmiGrow',
    createdAt: '2024-01-21',
    isPublished: true,
  },
];

// Helper function untuk mendapatkan video berdasarkan ID
export const getVideoById = (id: number): VideoContent | undefined => {
  return videoContentData.find(video => video.id === id);
};

// Helper function untuk mendapatkan video berdasarkan kategori
export const getVideosByCategory = (category: string): VideoContent[] => {
  return videoContentData.filter(video => video.category === category);
};

// Helper function untuk mendapatkan semua kategori
export const getAllCategories = (): string[] => {
  const categories = videoContentData.map(video => video.category);
  return [...new Set(categories)];
};
