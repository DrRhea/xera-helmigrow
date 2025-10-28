# 📋 Dokumentasi Kuesioner Tumbuh Kembang

## 🎯 **OVERVIEW**

Fitur kuesioner tumbuh kembang yang dinamis berdasarkan usia anak, mengikuti standar KPSP (Kuesioner Pra Skrining Perkembangan) dengan desain yang konsisten dengan aplikasi HelmiGrow.

## 🏗️ **ARQUITEKTUR IMPLEMENTASI**

### **1. Komponen Utama**
- **`GrowthQuestionnaireScreen.tsx`** - Screen utama kuesioner
- **`questionnaireService.ts`** - Service untuk API kuesioner
- **`HomeScreen.tsx`** - Integrasi tombol kuesioner

### **2. Struktur Data**
```typescript
interface Question {
  id: number;
  question: string;
  category: 'Gerak kasar' | 'Sosialisasi dan kemandirian' | 'Bicara dan bahasa' | 'Gerak halus';
  hasImage: boolean;
  imagePath?: string;
}

interface QuestionnaireSubmission {
  child_id: number;
  questionnaire_type: string;
  age_in_months: number;
  answers: QuestionnaireAnswer[];
  completed_at: string;
}
```

## 📊 **KUESIONER BERDASARKAN USIA**

### **0-3 Bulan (Sudah Diimplementasi)**
Berdasarkan gambar yang diberikan, mencakup 10 pertanyaan:

#### **Gerak Kasar (4 pertanyaan)**
1. Apakah bayi Anda dapat menggerakkan lengan dan tungkai dengan mudah?
8. Apakah bayi Anda dapat mengangkat kepalanya ketika berbaring tengkurap?
9. Apakah bayi Anda dapat mengangkat kepalanya membentuk sudut 45° ketika berbaring tengkurap?
10. Apakah bayi Anda dapat mengangkat kepalanya dengan tegak ketika berbaring tengkurap?

#### **Sosialisasi dan Kemandirian (2 pertanyaan)**
2. Apakah bayi Anda dapat melihat dan menatap wajah Anda?
3. Apakah bayi Anda dapat tersenyum kembali ketika Anda tersenyum?

#### **Bicara dan Bahasa (2 pertanyaan)**
4. Apakah bayi Anda dapat mengeluarkan suara-suara lain (mengoceh) selain menangis?
5. Apakah bayi Anda dapat tertawa keras?

#### **Gerak Halus (2 pertanyaan)**
6. Apakah bayi Anda dapat menggerakkan kepalanya dari satu sisi ke sisi yang lain?
7. Apakah bayi Anda dapat menggerakkan kepalanya ke tengah ketika berbaring?

### **Usia Lainnya (Siap untuk Implementasi)**
- 4-6 bulan
- 7-9 bulan
- 10-12 bulan
- 13-18 bulan
- 19-24 bulan
- 25-36 bulan
- 37-48 bulan
- 49-60 bulan

## 🎨 **DESAIN UI/UX**

### **1. Header**
- Gradient background (biru)
- Tombol back
- Nama anak dan usia
- Progress bar

### **2. Question Card**
- Category badge dengan warna berbeda
- Nomor pertanyaan
- Teks pertanyaan
- Placeholder untuk ilustrasi
- Tombol jawaban (Ya/Tidak)

### **3. Navigation**
- Tombol Sebelumnya/Selanjutnya
- Tombol Selesai di pertanyaan terakhir
- Loading state saat submit

### **4. Color Coding**
- **Gerak kasar**: Hijau (#4CAF50)
- **Sosialisasi dan kemandirian**: Kuning (#FFC107)
- **Bicara dan bahasa**: Merah (#F44336)
- **Gerak halus**: Biru (#2196F3)

## 🔧 **FITUR TEKNIS**

### **1. Dynamic Age Calculation**
```typescript
const calculateAgeInMonths = () => {
  const birthDate = new Date(childData.birth_date);
  const today = new Date();
  const ageInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + 
                     (today.getMonth() - birthDate.getMonth());
  return ageInMonths;
};
```

### **2. Age-Based Questionnaire Selection**
```typescript
if (ageInMonths >= 0 && ageInMonths <= 3) {
  questionnaireData = getQuestionsFor0To3Months();
} else if (ageInMonths >= 4 && ageInMonths <= 6) {
  questionnaireData = getQuestionsFor4To6Months();
}
// ... dan seterusnya
```

### **3. Answer Validation**
- Semua pertanyaan harus dijawab
- Validasi sebelum submit
- Error handling yang user-friendly

### **4. Progress Tracking**
- Progress bar visual
- Indikator "X dari Y" pertanyaan
- Navigation yang smooth

## 📱 **INTEGRASI DENGAN HOMESCREEN**

### **1. Tombol Kuesioner**
- Ditambahkan di setiap card anak
- Icon clipboard dengan teks "Kuesioner"
- Styling konsisten dengan desain aplikasi

### **2. Navigation Flow**
```
HomeScreen → Pilih Anak → Kuesioner → Hasil → Kembali ke HomeScreen
```

## 🚀 **CARA PENGGUNAAN**

### **1. Akses Kuesioner**
1. Buka HomeScreen
2. Pilih anak yang ingin dinilai
3. Klik tombol "Kuesioner" di card anak

### **2. Mengisi Kuesioner**
1. Baca pertanyaan dengan teliti
2. Pilih jawaban "Ya" atau "Tidak"
3. Gunakan tombol navigasi untuk berpindah
4. Pastikan semua pertanyaan terjawab

### **3. Submit Hasil**
1. Klik "Selesai" di pertanyaan terakhir
2. Tunggu proses penyimpanan
3. Lihat hasil dan status perkembangan

## 🔮 **PENGEMBANGAN SELANJUTNYA**

### **1. Backend API (Perlu Diimplementasi)**
```php
// Routes yang diperlukan
POST /api/questionnaires - Submit kuesioner
GET /api/questionnaires/child/{id} - Riwayat kuesioner anak
GET /api/questionnaires/{id} - Detail hasil kuesioner
GET /api/questionnaires/recommendations/{age} - Rekomendasi berdasarkan usia
```

### **2. Database Schema (Perlu Dibuat)**
```sql
-- Tabel questionnaires
CREATE TABLE questionnaires (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  child_id BIGINT NOT NULL,
  questionnaire_type VARCHAR(50) NOT NULL,
  age_in_months INT NOT NULL,
  total_questions INT NOT NULL,
  correct_answers INT NOT NULL,
  score_percentage DECIMAL(5,2) NOT NULL,
  development_status ENUM('Normal', 'Perlu Perhatian', 'Perlu Evaluasi'),
  recommendations JSON,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (child_id) REFERENCES children(id)
);

-- Tabel questionnaire_answers
CREATE TABLE questionnaire_answers (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  questionnaire_id BIGINT NOT NULL,
  question_id INT NOT NULL,
  answer BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (questionnaire_id) REFERENCES questionnaires(id)
);
```

### **3. Fitur Tambahan**
- **Riwayat Kuesioner**: Tampilkan hasil kuesioner sebelumnya
- **Grafik Perkembangan**: Visualisasi perkembangan anak
- **Rekomendasi Personal**: Saran berdasarkan hasil kuesioner
- **Notifikasi**: Pengingat untuk kuesioner berkala
- **Export Hasil**: Download hasil kuesioner

## ✅ **STATUS IMPLEMENTASI**

### **✅ Sudah Selesai**
- [x] Komponen GrowthQuestionnaireScreen
- [x] Service questionnaireService
- [x] Integrasi dengan HomeScreen
- [x] Kuesioner 0-3 bulan (sesuai gambar)
- [x] UI/UX yang konsisten
- [x] Dynamic age calculation
- [x] Answer validation
- [x] Progress tracking

### **🔄 Siap untuk Implementasi**
- [ ] Kuesioner untuk usia 4-60 bulan
- [ ] Backend API endpoints
- [ ] Database schema
- [ ] Ilustrasi untuk pertanyaan
- [ ] Hasil dan rekomendasi

### **📋 Template untuk Usia Lainnya**
```typescript
const getQuestionsFor4To6Months = (): Question[] => [
  {
    id: 1,
    question: "Pertanyaan untuk 4-6 bulan...",
    category: "Gerak kasar",
    hasImage: false
  },
  // ... tambahkan pertanyaan sesuai standar KPSP
];
```

## 🎯 **KESIMPULAN**

Implementasi kuesioner tumbuh kembang sudah siap dengan:
- ✅ Struktur yang scalable untuk semua usia
- ✅ Desain yang konsisten dengan aplikasi
- ✅ Validasi dan error handling yang baik
- ✅ User experience yang smooth
- ✅ Siap untuk integrasi backend

**Tinggal menambahkan pertanyaan untuk usia lainnya dan implementasi backend API!** 🚀
