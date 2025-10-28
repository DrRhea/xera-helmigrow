export interface LegendaImunisasi {
  kategori: string;
  deskripsi: string;
  visual: string;
}

export interface JadwalImunisasi {
  vaksin: string;
  dianjurkan?: string;
  rentang_diperbolehkan?: string;
  imunisasi_kejar?: string;
  tidak_diperbolehkan?: string;
}

export interface DataImunisasi {
  judul: string;
  deskripsi: string;
  legenda: LegendaImunisasi[];
  jadwal: JadwalImunisasi[];
}

export const imunisasiData: DataImunisasi = {
  "judul": "Jadwal Imunisasi Lengkap Bayi dan Balita",
  "deskripsi": "Jadwal pemberian vaksin untuk bayi dan balita berdasarkan usia dalam bulan, lengkap dengan kategori waktu pemberian yang direvisi.",
  "legenda": [
    {
      "kategori": "Dianjurkan (Tepat Waktu)",
      "deskripsi": "Usia yang paling tepat dan dianjurkan untuk memberikan imunisasi.",
      "visual": "Putih"
    },
    {
      "kategori": "Rentang Diperbolehkan",
      "deskripsi": "Usia yang masih bisa diberikan imunisasi jika terlewat dari jadwal yang dianjurkan.",
      "visual": "Kuning"
    },
    {
      "kategori": "Imunisasi Kejar",
      "deskripsi": "Usia untuk pemberian imunisasi bagi yang belum lengkap (catch-up immunization).",
      "visual": "Oranye"
    },
    {
      "kategori": "Tidak Diperbolehkan",
      "deskripsi": "Usia di mana pemberian imunisasi sudah tidak dianjurkan atau tidak berlaku lagi.",
      "visual": "Abu-abu"
    }
  ],
  "jadwal": [
    {
      "vaksin": "Hepatitis B (<24 Jam)",
      "dianjurkan": "Saat lahir (0 bulan)",
      "tidak_diperbolehkan": "Usia 1 bulan ke atas"
    },
    {
      "vaksin": "BCG",
      "dianjurkan": "0-1 bulan",
      "rentang_diperbolehkan": "2 - 11 bulan",
      "tidak_diperbolehkan": "12 - 59 bulan"
    },
    {
      "vaksin": "Polio tetes 1",
      "dianjurkan": "0-1 bulan",
      "rentang_diperbolehkan": "2 - 11 bulan",
      "imunisasi_kejar": "12 - 59 bulan"
    },
    {
      "vaksin": "DPT-HB-Hib 1",
      "dianjurkan": "2 bulan",
      "rentang_diperbolehkan": "3 - 11 bulan",
      "imunisasi_kejar": "12 - 59 bulan",
      "tidak_diperbolehkan": "Usia 0 - 1 bulan"
    },
    {
      "vaksin": "Polio Tetes 2",
      "dianjurkan": "2 bulan",
      "rentang_diperbolehkan": "3 - 11 bulan",
      "imunisasi_kejar": "12 - 59 bulan",
      "tidak_diperbolehkan": "Usia 0 - 1 bulan"
    },
    {
      "vaksin": "Rota Virus (RV) 1*",
      "dianjurkan": "2 bulan",
      "rentang_diperbolehkan": "3 - 4 bulan",
      "tidak_diperbolehkan": "Usia 0 - 1 bulan dan 7 bulan ke atas"
    },
    {
      "vaksin": "PCV 1",
      "dianjurkan": "2 bulan",
      "rentang_diperbolehkan": "3 - 11 bulan",
      "imunisasi_kejar": "12 - 59 bulan",
      "tidak_diperbolehkan": "Usia 0 - 1 bulan"
    },
    {
      "vaksin": "DPT-HB-Hib 2",
      "dianjurkan": "3 bulan",
      "rentang_diperbolehkan": "4 - 11 bulan",
      "imunisasi_kejar": "12 - 59 bulan",
      "tidak_diperbolehkan": "Usia 0 - 2 bulan"
    },
    {
      "vaksin": "Polio Tetes 3",
      "dianjurkan": "3 bulan",
      "rentang_diperbolehkan": "4 - 11 bulan",
      "imunisasi_kejar": "12 - 59 bulan",
      "tidak_diperbolehkan": "Usia 0 - 2 bulan"
    },
    {
      "vaksin": "Rota Virus (RV) 2*",
      "dianjurkan": "3 bulan",
      "rentang_diperbolehkan": "4 - 6 bulan",
      "tidak_diperbolehkan": "Usia 0 - 2 bulan dan 7 bulan ke atas"
    },
    {
      "vaksin": "PCV 2",
      "dianjurkan": "3 bulan",
      "rentang_diperbolehkan": "4 - 11 bulan",
      "imunisasi_kejar": "12 - 59 bulan",
      "tidak_diperbolehkan": "Usia 0 - 2 bulan"
    },
    {
      "vaksin": "DPT-HB-Hib 3",
      "dianjurkan": "4 bulan",
      "rentang_diperbolehkan": "5 - 11 bulan",
      "imunisasi_kejar": "12 - 59 bulan",
      "tidak_diperbolehkan": "Usia 0 - 3 bulan"
    },
    {
      "vaksin": "Polio Tetes 4",
      "dianjurkan": "4 bulan",
      "rentang_diperbolehkan": "5 - 11 bulan",
      "imunisasi_kejar": "12 - 59 bulan",
      "tidak_diperbolehkan": "Usia 0 - 3 bulan"
    },
    {
      "vaksin": "Polio Suntik (IPV) 1",
      "dianjurkan": "4 bulan",
      "rentang_diperbolehkan": "5 - 11 bulan",
      "imunisasi_kejar": "12 - 59 bulan",
      "tidak_diperbolehkan": "Usia 0 - 3 bulan"
    },
    {
      "vaksin": "Rota Virus (RV) 3*",
      "dianjurkan": "4 bulan",
      "rentang_diperbolehkan": "5 - 6 bulan",
      "tidak_diperbolehkan": "Usia 0 - 4 bulan dan 7 bulan ke atas"
    },
    {
      "vaksin": "Campak-Rubella (MR)",
      "dianjurkan": "9 bulan",
      "rentang_diperbolehkan": "10 - 11 bulan",
      "imunisasi_kejar": "12 - 59 bulan",
      "tidak_diperbolehkan": "Usia 0 - 8 bulan"
    },
    {
      "vaksin": "Polio Suntik (IPV) 2*",
      "dianjurkan": "9 bulan",
      "rentang_diperbolehkan": "10 - 11 bulan",
      "imunisasi_kejar": "12 - 59 bulan",
      "tidak_diperbolehkan": "Usia 0 - 8 bulan"
    },
    {
      "vaksin": "Japanese Encephalitis (JE)",
      "dianjurkan": "10 bulan",
      "imunisasi_kejar": "11 - 59 bulan",
      "tidak_diperbolehkan": "Usia 0 - 9 bulan"
    },
    {
      "vaksin": "PCV 3",
      "dianjurkan": "12 bulan",
      "rentang_diperbolehkan": "18 - 23 bulan",
      "imunisasi_kejar": "23 - 59 bulan",
      "tidak_diperbolehkan": "Usia 0 - 11 bulan"
    },
    {
      "vaksin": "DPT-HB-Hib Lanjutan",
      "dianjurkan": "18 bulan",
      "rentang_diperbolehkan": "23 bulan",
      "imunisasi_kejar": "diatas 23 bulan - 59 bulan",
      "tidak_diperbolehkan": "Usia 0 - 17 bulan"
    },
    {
      "vaksin": "Campak-Rubella (MR) Lanjutan",
      "dianjurkan": "18 bulan",
      "rentang_diperbolehkan": "23 bulan",
      "imunisasi_kejar": "diatas 23 bulan - 59 bulan",
      "tidak_diperbolehkan": "Usia 0 - 17 bulan"
    }
  ]
};

// Helper function untuk menghitung usia dalam bulan
export const calculateAgeInMonths = (birthDate: string): number => {
  const birth = new Date(birthDate);
  const today = new Date();
  
  let months = (today.getFullYear() - birth.getFullYear()) * 12;
  months += today.getMonth() - birth.getMonth();
  
  if (today.getDate() < birth.getDate()) {
    months--;
  }
  
  return Math.max(0, months);
};

// Helper function untuk menentukan status vaksin berdasarkan usia
export const getVaccineStatus = (vaccine: JadwalImunisasi, ageInMonths: number): {
  status: 'dianjurkan' | 'rentang_diperbolehkan' | 'imunisasi_kejar' | 'tidak_diperbolehkan' | 'belum_waktu';
  description: string;
  color: string;
} => {
  // Parse usia dari string
  const parseAgeRange = (ageString: string): { min: number; max: number } => {
    if (ageString.includes('Saat lahir') || ageString.includes('0 bulan')) {
      return { min: 0, max: 0 };
    }
    
    const match = ageString.match(/(\d+)\s*-\s*(\d+)/);
    if (match) {
      return { min: parseInt(match[1]), max: parseInt(match[2]) };
    }
    
    const singleMatch = ageString.match(/(\d+)\s*bulan/);
    if (singleMatch) {
      const age = parseInt(singleMatch[1]);
      return { min: age, max: age };
    }
    
    return { min: 0, max: 999 };
  };

  // Cek tidak diperbolehkan
  if (vaccine.tidak_diperbolehkan) {
    const notAllowedRange = parseAgeRange(vaccine.tidak_diperbolehkan);
    if (ageInMonths >= notAllowedRange.min && ageInMonths <= notAllowedRange.max) {
      return {
        status: 'tidak_diperbolehkan',
        description: vaccine.tidak_diperbolehkan,
        color: '#CCCCCC'
      };
    }
  }

  // Cek dianjurkan
  if (vaccine.dianjurkan) {
    const recommendedRange = parseAgeRange(vaccine.dianjurkan);
    if (ageInMonths >= recommendedRange.min && ageInMonths <= recommendedRange.max) {
      return {
        status: 'dianjurkan',
        description: vaccine.dianjurkan,
        color: '#FFFFFF'
      };
    }
  }

  // Cek rentang diperbolehkan
  if (vaccine.rentang_diperbolehkan) {
    const allowedRange = parseAgeRange(vaccine.rentang_diperbolehkan);
    if (ageInMonths >= allowedRange.min && ageInMonths <= allowedRange.max) {
      return {
        status: 'rentang_diperbolehkan',
        description: vaccine.rentang_diperbolehkan,
        color: '#FFD700'
      };
    }
  }

  // Cek imunisasi kejar
  if (vaccine.imunisasi_kejar) {
    const catchUpRange = parseAgeRange(vaccine.imunisasi_kejar);
    if (ageInMonths >= catchUpRange.min && ageInMonths <= catchUpRange.max) {
      return {
        status: 'imunisasi_kejar',
        description: vaccine.imunisasi_kejar,
        color: '#FFA500'
      };
    }
  }

  // Belum waktu
  return {
    status: 'belum_waktu',
    description: 'Belum waktunya',
    color: '#E0E0E0'
  };
};
