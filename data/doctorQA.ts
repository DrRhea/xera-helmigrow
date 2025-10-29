export interface DoctorQA {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export const doctorQAData: DoctorQA[] = [
  {
    id: 1,
    question: "Kapan waktu yang tepat untuk imunisasi anak?",
    answer: "Imunisasi anak sebaiknya dilakukan sesuai jadwal yang direkomendasikan oleh IDAI (Ikatan Dokter Anak Indonesia). Jadwal imunisasi dimulai sejak bayi lahir dengan Hepatitis B, BCG, dan DPT. Pastikan untuk konsultasi dengan dokter anak untuk jadwal yang tepat sesuai kondisi anak Anda.",
    category: "Imunisasi"
  },
  {
    id: 2,
    question: "Bagaimana cara mengatasi demam pada anak?",
    answer: "Untuk mengatasi demam pada anak:\n1. Berikan parasetamol sesuai dosis yang tepat\n2. Kompres dengan air hangat (bukan air dingin)\n3. Pastikan anak minum cukup cairan\n4. Pantau suhu tubuh setiap 4 jam\n5. Jika demam >38.5°C atau berlangsung >3 hari, segera konsultasi dokter",
    category: "Kesehatan Umum"
  },
  {
    id: 3,
    question: "Apa tanda-tanda stunting pada anak?",
    answer: "Tanda-tanda stunting pada anak:\n1. Tinggi badan di bawah standar WHO untuk usianya\n2. Berat badan tidak naik sesuai grafik pertumbuhan\n3. Perkembangan motorik terlambat\n4. Mudah sakit dan infeksi berulang\n5. Konsentrasi dan kemampuan belajar menurun\n\nSegera konsultasi dengan dokter anak jika menemukan tanda-tanda ini.",
    category: "Pertumbuhan"
  },
  {
    id: 4,
    question: "Bagaimana cara memberikan MPASI yang benar?",
    answer: "Cara memberikan MPASI yang benar:\n1. Mulai usia 6 bulan\n2. Mulai dengan tekstur halus (puree)\n3. Berikan 1 jenis makanan baru setiap 3-4 hari\n4. Pastikan gizi seimbang (karbohidrat, protein, lemak, vitamin)\n5. Berikan dalam porsi kecil dan bertahap\n6. Hindari gula dan garam berlebihan",
    category: "Nutrisi"
  },
  {
    id: 5,
    question: "Kapan anak mulai bisa berjalan?",
    answer: "Umumnya anak mulai bisa berjalan pada usia 9-15 bulan. Perkembangan normal:\n- 9-10 bulan: merambat sambil berpegangan\n- 11-12 bulan: berjalan dengan bantuan\n- 12-15 bulan: berjalan sendiri\n\nJika anak belum bisa berjalan di usia 18 bulan, konsultasi dengan dokter anak untuk evaluasi lebih lanjut.",
    category: "Perkembangan"
  },
  {
    id: 6,
    question: "Bagaimana cara mengatasi anak yang susah makan?",
    answer: "Cara mengatasi anak susah makan:\n1. Buat jadwal makan yang teratur\n2. Sajikan makanan dengan menarik dan bervariasi\n3. Hindari memaksa anak makan\n4. Berikan porsi kecil tapi sering\n5. Libatkan anak dalam persiapan makanan\n6. Hindari memberikan camilan berlebihan di antara waktu makan\n7. Konsultasi dokter jika berat badan tidak naik",
    category: "Nutrisi"
  },
  {
    id: 7,
    question: "Apa yang harus dilakukan jika anak mengalami diare?",
    answer: "Jika anak mengalami diare:\n1. Berikan oralit untuk mencegah dehidrasi\n2. Lanjutkan pemberian ASI atau susu formula\n3. Berikan makanan lunak dan mudah dicerna\n4. Pantau tanda dehidrasi (mata cekung, tidak buang air kecil)\n5. Hindari obat diare tanpa resep dokter\n6. Segera ke dokter jika diare berdarah atau >3 hari",
    category: "Kesehatan Umum"
  },
  {
    id: 8,
    question: "Bagaimana cara merangsang perkembangan otak anak?",
    answer: "Cara merangsang perkembangan otak anak:\n1. Berikan nutrisi yang baik (ASI, omega-3, zat besi)\n2. Ajak bermain dan berinteraksi aktif\n3. Bacakan buku cerita sejak dini\n4. Berikan mainan edukatif sesuai usia\n5. Ciptakan lingkungan yang aman dan stimulatif\n6. Batasi screen time dan gadget\n7. Pastikan tidur yang cukup dan berkualitas",
    category: "Perkembangan"
  }
];

export const quickQuestions = [
  "Kapan waktu imunisasi?",
  "Cara atasi demam?",
  "Tanda stunting?",
  "MPASI yang benar?",
  "Kapan mulai berjalan?",
  "Anak susah makan?",
  "Atasi diare?",
  "Stimulasi otak?"
];
