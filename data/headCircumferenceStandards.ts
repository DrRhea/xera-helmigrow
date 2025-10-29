export interface HeadCircumferenceCategory {
  category: string;
  range: string;
  description: string;
  recommendation: string;
  color: string;
}

export interface HeadCircumferenceStandards {
  boys: HeadCircumferenceCategory[];
  girls: HeadCircumferenceCategory[];
}

export const headCircumferenceStandards: HeadCircumferenceStandards = {
  boys: [
    {
      category: 'Sangat Kecil',
      range: '< -3 SD',
      description: 'Lingkar kepala sangat kecil (mikrosefali berat)',
      recommendation: 'Segera rujuk ke tenaga kesehatan spesialis anak untuk pemeriksaan lebih lanjut (kemungkinan gangguan pertumbuhan otak). Evaluasi asupan gizi terutama protein, asam lemak esensial, dan mikronutrien (zat besi, yodium, zinc). Pemantauan tumbuh kembang tiap bulan.',
      color: '#FF0000'
    },
    {
      category: 'Kecil',
      range: '-3 SD s/d < -2 SD',
      description: 'Lingkar kepala kecil (mikrosefali)',
      recommendation: 'Tingkatkan kualitas asupan gizi (ASI eksklusif bila <6 bulan, MP-ASI bergizi seimbang bila ≥6 bulan). Stimulasi perkembangan kognitif dengan interaksi, bermain, dan komunikasi. Pemantauan rutin lingkar kepala tiap bulan.',
      color: '#FF6B6B'
    },
    {
      category: 'Normal',
      range: '-2 SD s/d +2 SD',
      description: 'Lingkar kepala normal',
      recommendation: 'Pertahankan pola gizi seimbang dan stimulasi tumbuh kembang sesuai usia. Pantau secara berkala di posyandu atau fasilitas kesehatan.',
      color: '#6BCF7F'
    },
    {
      category: 'Besar',
      range: '> +2 SD s/d +3 SD',
      description: 'Lingkar kepala besar',
      recommendation: 'Evaluasi riwayat keluarga (genetik) dan kondisi medis (misalnya hidrosefalus). Konsultasi bila ada gejala klinis lain (kepala cepat membesar, muntah, keterlambatan perkembangan). Pantau pertumbuhan tiap bulan.',
      color: '#FF8C00'
    },
    {
      category: 'Sangat Besar',
      range: '> +3 SD',
      description: 'Lingkar kepala sangat besar (makrosefali)',
      recommendation: 'Segera rujuk ke spesialis anak untuk pemeriksaan lanjutan (misalnya imaging otak). Pastikan tidak ada tanda tekanan intrakranial meningkat.',
      color: '#FF0000'
    }
  ],
  girls: [
    {
      category: 'Sangat Kecil',
      range: '< -3 SD',
      description: 'Lingkar kepala sangat kecil (mikrosefali berat)',
      recommendation: 'Segera rujuk ke tenaga kesehatan spesialis anak untuk pemeriksaan lebih lanjut (kemungkinan gangguan pertumbuhan otak). Evaluasi asupan gizi terutama protein, asam lemak esensial, dan mikronutrien (zat besi, yodium, zinc). Pemantauan tumbuh kembang tiap bulan.',
      color: '#FF0000'
    },
    {
      category: 'Kecil',
      range: '-3 SD s/d < -2 SD',
      description: 'Lingkar kepala kecil (mikrosefali)',
      recommendation: 'Tingkatkan kualitas asupan gizi (ASI eksklusif bila <6 bulan, MP-ASI bergizi seimbang bila ≥6 bulan). Stimulasi perkembangan kognitif dengan interaksi, bermain, dan komunikasi. Pemantauan rutin lingkar kepala tiap bulan.',
      color: '#FF6B6B'
    },
    {
      category: 'Normal',
      range: '-2 SD s/d +2 SD',
      description: 'Lingkar kepala normal',
      recommendation: 'Pertahankan pola gizi seimbang dan stimulasi tumbuh kembang sesuai usia. Pantau secara berkala di posyandu atau fasilitas kesehatan.',
      color: '#6BCF7F'
    },
    {
      category: 'Besar',
      range: '> +2 SD s/d +3 SD',
      description: 'Lingkar kepala besar',
      recommendation: 'Evaluasi riwayat keluarga (genetik) dan kondisi medis (misalnya hidrosefalus). Konsultasi bila ada gejala klinis lain (kepala cepat membesar, muntah, keterlambatan perkembangan). Pantau pertumbuhan tiap bulan.',
      color: '#FF8C00'
    },
    {
      category: 'Sangat Besar',
      range: '> +3 SD',
      description: 'Lingkar kepala sangat besar (makrosefali)',
      recommendation: 'Segera rujuk ke spesialis anak untuk pemeriksaan lanjutan (misalnya imaging otak). Pastikan tidak ada tanda tekanan intrakranial meningkat.',
      color: '#FF0000'
    }
  ]
};

export const getHeadCircumferenceStatus = (zScore: number, gender: 'Laki-laki' | 'Perempuan') => {
  const standards = gender === 'Laki-laki' ? headCircumferenceStandards.boys : headCircumferenceStandards.girls;
  
  if (zScore < -3) return standards[0]; // Sangat Kecil
  if (zScore < -2) return standards[1]; // Kecil
  if (zScore <= 2) return standards[2]; // Normal
  if (zScore <= 3) return standards[3]; // Besar
  return standards[4]; // Sangat Besar
};
