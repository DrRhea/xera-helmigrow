export interface DevelopmentMilestone {
  age: number; // in months
  category: string;
  milestone: string;
  description: string;
  achieved: boolean;
}

export interface DevelopmentData {
  age: number;
  physical: DevelopmentMilestone[];
  cognitive: DevelopmentMilestone[];
  social: DevelopmentMilestone[];
  language: DevelopmentMilestone[];
}

export const developmentMilestones: DevelopmentData[] = [
  {
    age: 0,
    physical: [
      {
        age: 0,
        category: 'Fisik',
        milestone: 'Refleks Moro',
        description: 'Mengangkat tangan dan kaki saat terkejut',
        achieved: false
      },
      {
        age: 0,
        category: 'Fisik',
        milestone: 'Refleks Mengisap',
        description: 'Mengisap jari atau puting susu',
        achieved: false
      }
    ],
    cognitive: [
      {
        age: 0,
        category: 'Kognitif',
        milestone: 'Mengikuti Objek',
        description: 'Mata mengikuti objek yang bergerak',
        achieved: false
      }
    ],
    social: [
      {
        age: 0,
        category: 'Sosial',
        milestone: 'Kontak Mata',
        description: 'Melakukan kontak mata dengan orang tua',
        achieved: false
      }
    ],
    language: [
      {
        age: 0,
        category: 'Bahasa',
        milestone: 'Menangis',
        description: 'Menangis untuk berkomunikasi',
        achieved: false
      }
    ]
  },
  {
    age: 1,
    physical: [
      {
        age: 1,
        category: 'Fisik',
        milestone: 'Mengangkat Kepala',
        description: 'Dapat mengangkat kepala saat tengkurap',
        achieved: false
      },
      {
        age: 1,
        category: 'Fisik',
        milestone: 'Menggenggam',
        description: 'Dapat menggenggam jari orang tua',
        achieved: false
      }
    ],
    cognitive: [
      {
        age: 1,
        category: 'Kognitif',
        milestone: 'Mengenali Suara',
        description: 'Mengenali suara orang tua',
        achieved: false
      }
    ],
    social: [
      {
        age: 1,
        category: 'Sosial',
        milestone: 'Tersenyum',
        description: 'Tersenyum responsif',
        achieved: false
      }
    ],
    language: [
      {
        age: 1,
        category: 'Bahasa',
        milestone: 'Cooing',
        description: 'Mengeluarkan suara "ah", "oh"',
        achieved: false
      }
    ]
  },
  {
    age: 2,
    physical: [
      {
        age: 2,
        category: 'Fisik',
        milestone: 'Mengangkat Dada',
        description: 'Dapat mengangkat dada saat tengkurap',
        achieved: false
      },
      {
        age: 2,
        category: 'Fisik',
        milestone: 'Mengikuti Objek',
        description: 'Mengikuti objek dengan mata 180°',
        achieved: false
      }
    ],
    cognitive: [
      {
        age: 2,
        category: 'Kognitif',
        milestone: 'Mengenali Wajah',
        description: 'Mengenali wajah orang tua',
        achieved: false
      }
    ],
    social: [
      {
        age: 2,
        category: 'Sosial',
        milestone: 'Tersenyum Sosial',
        description: 'Tersenyum saat melihat orang',
        achieved: false
      }
    ],
    language: [
      {
        age: 2,
        category: 'Bahasa',
        milestone: 'Babbling',
        description: 'Mengeluarkan suara "ba", "ma"',
        achieved: false
      }
    ]
  },
  {
    age: 3,
    physical: [
      {
        age: 3,
        category: 'Fisik',
        milestone: 'Duduk dengan Bantuan',
        description: 'Dapat duduk dengan bantuan',
        achieved: false
      },
      {
        age: 3,
        category: 'Fisik',
        milestone: 'Menggenggam Mainan',
        description: 'Dapat menggenggam mainan',
        achieved: false
      }
    ],
    cognitive: [
      {
        age: 3,
        category: 'Kognitif',
        milestone: 'Mengenali Nama',
        description: 'Merespons saat dipanggil nama',
        achieved: false
      }
    ],
    social: [
      {
        age: 3,
        category: 'Sosial',
        milestone: 'Tertawa',
        description: 'Tertawa saat diajak bermain',
        achieved: false
      }
    ],
    language: [
      {
        age: 3,
        category: 'Bahasa',
        milestone: 'Vokalisasi',
        description: 'Mengeluarkan berbagai suara',
        achieved: false
      }
    ]
  },
  {
    age: 4,
    physical: [
      {
        age: 4,
        category: 'Fisik',
        milestone: 'Berguling',
        description: 'Dapat berguling dari tengkurap ke terlentang',
        achieved: false
      },
      {
        age: 4,
        category: 'Fisik',
        milestone: 'Mengangkat Kaki',
        description: 'Mengangkat kaki saat berbaring',
        achieved: false
      }
    ],
    cognitive: [
      {
        age: 4,
        category: 'Kognitif',
        milestone: 'Mengenali Mainan',
        description: 'Mengenali mainan favorit',
        achieved: false
      }
    ],
    social: [
      {
        age: 4,
        category: 'Sosial',
        milestone: 'Menangis Saat Ditinggal',
        description: 'Menangis saat ditinggal orang tua',
        achieved: false
      }
    ],
    language: [
      {
        age: 4,
        category: 'Bahasa',
        milestone: 'Babbling Kompleks',
        description: 'Mengeluarkan suara yang lebih kompleks',
        achieved: false
      }
    ]
  },
  {
    age: 5,
    physical: [
      {
        age: 5,
        category: 'Fisik',
        milestone: 'Duduk Tanpa Bantuan',
        description: 'Dapat duduk tanpa bantuan',
        achieved: false
      },
      {
        age: 5,
        category: 'Fisik',
        milestone: 'Memindahkan Mainan',
        description: 'Dapat memindahkan mainan dari satu tangan ke tangan lain',
        achieved: false
      }
    ],
    cognitive: [
      {
        age: 5,
        category: 'Kognitif',
        milestone: 'Mencari Mainan',
        description: 'Mencari mainan yang disembunyikan',
        achieved: false
      }
    ],
    social: [
      {
        age: 5,
        category: 'Sosial',
        milestone: 'Meniru Ekspresi',
        description: 'Meniru ekspresi wajah orang tua',
        achieved: false
      }
    ],
    language: [
      {
        age: 5,
        category: 'Bahasa',
        milestone: 'Mengucap "Mama/Papa"',
        description: 'Mengucapkan "mama" atau "papa"',
        achieved: false
      }
    ]
  },
  {
    age: 6,
    physical: [
      {
        age: 6,
        category: 'Fisik',
        milestone: 'Merangkak',
        description: 'Dapat merangkak',
        achieved: false
      },
      {
        age: 6,
        category: 'Fisik',
        milestone: 'Berdiri dengan Bantuan',
        description: 'Dapat berdiri dengan bantuan',
        achieved: false
      }
    ],
    cognitive: [
      {
        age: 6,
        category: 'Kognitif',
        milestone: 'Mengenali Cermin',
        description: 'Mengenali bayangan di cermin',
        achieved: false
      }
    ],
    social: [
      {
        age: 6,
        category: 'Sosial',
        milestone: 'Malu pada Orang Asing',
        description: 'Menunjukkan rasa malu pada orang asing',
        achieved: false
      }
    ],
    language: [
      {
        age: 6,
        category: 'Bahasa',
        milestone: 'Mengucap 2 Kata',
        description: 'Mengucapkan 2 kata yang berbeda',
        achieved: false
      }
    ]
  },
  {
    age: 9,
    physical: [
      {
        age: 9,
        category: 'Fisik',
        milestone: 'Berdiri Tanpa Bantuan',
        description: 'Dapat berdiri tanpa bantuan',
        achieved: false
      },
      {
        age: 9,
        category: 'Fisik',
        milestone: 'Jepit Jari',
        description: 'Dapat menjepit benda dengan jari',
        achieved: false
      }
    ],
    cognitive: [
      {
        age: 9,
        category: 'Kognitif',
        milestone: 'Mengenali Nama Benda',
        description: 'Mengenali nama benda-benda sederhana',
        achieved: false
      }
    ],
    social: [
      {
        age: 9,
        category: 'Sosial',
        milestone: 'Bermain Cilukba',
        description: 'Menikmati permainan cilukba',
        achieved: false
      }
    ],
    language: [
      {
        age: 9,
        category: 'Bahasa',
        milestone: 'Mengucap 3 Kata',
        description: 'Mengucapkan 3 kata yang berbeda',
        achieved: false
      }
    ]
  },
  {
    age: 12,
    physical: [
      {
        age: 12,
        category: 'Fisik',
        milestone: 'Berjalan',
        description: 'Dapat berjalan tanpa bantuan',
        achieved: false
      },
      {
        age: 12,
        category: 'Fisik',
        milestone: 'Mengambil Benda Kecil',
        description: 'Dapat mengambil benda kecil dengan jari',
        achieved: false
      }
    ],
    cognitive: [
      {
        age: 12,
        category: 'Kognitif',
        milestone: 'Mengikuti Instruksi',
        description: 'Mengikuti instruksi sederhana',
        achieved: false
      }
    ],
    social: [
      {
        age: 12,
        category: 'Sosial',
        milestone: 'Bermain dengan Anak Lain',
        description: 'Menikmati bermain dengan anak lain',
        achieved: false
      }
    ],
    language: [
      {
        age: 12,
        category: 'Bahasa',
        milestone: 'Mengucap 5 Kata',
        description: 'Mengucapkan 5 kata yang berbeda',
        achieved: false
      }
    ]
  },
  {
    age: 18,
    physical: [
      {
        age: 18,
        category: 'Fisik',
        milestone: 'Berlari',
        description: 'Dapat berlari',
        achieved: false
      },
      {
        age: 18,
        category: 'Fisik',
        milestone: 'Menaiki Tangga',
        description: 'Dapat menaiki tangga dengan bantuan',
        achieved: false
      }
    ],
    cognitive: [
      {
        age: 18,
        category: 'Kognitif',
        milestone: 'Mengenali Warna',
        description: 'Mengenali beberapa warna dasar',
        achieved: false
      }
    ],
    social: [
      {
        age: 18,
        category: 'Sosial',
        milestone: 'Berbagi Mainan',
        description: 'Dapat berbagi mainan dengan anak lain',
        achieved: false
      }
    ],
    language: [
      {
        age: 18,
        category: 'Bahasa',
        milestone: 'Mengucap 20 Kata',
        description: 'Mengucapkan 20 kata yang berbeda',
        achieved: false
      }
    ]
  },
  {
    age: 24,
    physical: [
      {
        age: 24,
        category: 'Fisik',
        milestone: 'Melompat',
        description: 'Dapat melompat di tempat',
        achieved: false
      },
      {
        age: 24,
        category: 'Fisik',
        milestone: 'Menggambar Garis',
        description: 'Dapat menggambar garis vertikal',
        achieved: false
      }
    ],
    cognitive: [
      {
        age: 24,
        category: 'Kognitif',
        milestone: 'Mengenali Angka',
        description: 'Mengenali angka 1-5',
        achieved: false
      }
    ],
    social: [
      {
        age: 24,
        category: 'Sosial',
        milestone: 'Bermain Pura-pura',
        description: 'Menikmati bermain pura-pura',
        achieved: false
      }
    ],
    language: [
      {
        age: 24,
        category: 'Bahasa',
        milestone: 'Mengucap 2 Kata Bersama',
        description: 'Mengucapkan 2 kata bersamaan',
        achieved: false
      }
    ]
  }
];

export const getDevelopmentMilestonesForAge = (ageInMonths: number): DevelopmentData | null => {
  // Find the closest age milestone
  const milestones = developmentMilestones.filter(m => m.age <= ageInMonths);
  if (milestones.length === 0) return null;
  
  // Return the highest age milestone that the child has reached
  return milestones[milestones.length - 1];
};

export const getAllMilestonesUpToAge = (ageInMonths: number): DevelopmentMilestone[] => {
  const allMilestones: DevelopmentMilestone[] = [];
  
  developmentMilestones.forEach(data => {
    if (data.age <= ageInMonths) {
      allMilestones.push(...data.physical, ...data.cognitive, ...data.social, ...data.language);
    }
  });
  
  return allMilestones;
};



