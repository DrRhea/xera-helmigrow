export interface MpasiRecipe {
  id: number;
  title: string;
  subtitle: string;
  thumbnail: any;
  dataImages: any[];
  scrollableDataImages?: any[]; // Untuk gambar yang bisa di-scroll
  description?: string;
  ingredients?: string[];
  instructions?: string[];
  nutritionInfo?: {
    calories?: string;
    protein?: string;
    carbs?: string;
    fat?: string;
  };
}

export interface MpasiAgeGroup {
  ageRange: string;
  placeholderImage: any;
  recipes: MpasiRecipe[];
}

export const mpasiData: MpasiAgeGroup[] = [
  {
    ageRange: "6-8 Bulan",
    placeholderImage: require('../assets/mpasi/profil-mpasi-06-08-bulan.png'),
    recipes: [
      {
        id: 1,
        title: "Bubur Singkong",
        subtitle: "Isi Ikan & Ayam",
        thumbnail: require('../assets/resep-mpasi/usia-6-8-bulan/bubur-singkong/bubur-singkong-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/usia-6-8-bulan/bubur-singkong/bubur-singkong-data.png')
        ],
        description: "Bubur singkong bergizi dengan campuran ikan dan ayam yang cocok untuk bayi usia 6-8 bulan",
        ingredients: [
          "Singkong 50g",
          "Ikan fillet 20g", 
          "Daging ayam 20g",
          "Wortel 15g",
          "Air secukupnya"
        ],
        instructions: [
          "Kupas dan potong singkong menjadi kecil",
          "Rebus singkong hingga lunak",
          "Masukkan ikan dan ayam, masak hingga matang",
          "Tambahkan wortel yang sudah dipotong kecil",
          "Haluskan semua bahan hingga menjadi bubur",
          "Sajikan dalam keadaan hangat"
        ],
        nutritionInfo: {
          calories: "120 kkal",
          protein: "8g",
          carbs: "18g",
          fat: "2g"
        }
      },
      {
        id: 2,
        title: "Bubur",
        subtitle: "Soto Ayam",
        thumbnail: require('../assets/resep-mpasi/usia-6-8-bulan/bubur-soto-ayam/bubur-soto-ayam-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/usia-6-8-bulan/bubur-soto-ayam/bubur-soto-ayam-data.png')
        ],
        description: "Bubur soto ayam bergizi yang cocok untuk bayi usia 6-8 bulan",
        ingredients: [
          "Beras 40g",
          "Daging ayam 25g",
          "Wortel 15g",
          "Daun seledri 5g",
          "Air secukupnya"
        ],
        instructions: [
          "Cuci beras hingga bersih",
          "Rebus beras dengan air hingga menjadi bubur",
          "Masukkan daging ayam yang sudah dipotong kecil",
          "Tambahkan wortel yang sudah dipotong halus",
          "Masak hingga semua bahan matang",
          "Tambahkan daun seledri, aduk sebentar",
          "Haluskan semua bahan hingga menjadi bubur lembut",
          "Sajikan dalam keadaan hangat"
        ],
        nutritionInfo: {
          calories: "125 kkal",
          protein: "9g",
          carbs: "19g",
          fat: "2.2g"
        }
      },
      {
        id: 3,
        title: "Bubur Sup",
        subtitle: "Daging Kacang Merah",
        thumbnail: require('../assets/resep-mpasi/usia-6-8-bulan/bubur-sup-daging/bubur-sup-daging-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/usia-6-8-bulan/bubur-sup-daging/bubur-sup-daging-data.png')
        ],
        description: "Bubur sup daging dengan kacang merah yang bergizi untuk bayi usia 6-8 bulan",
        ingredients: [
          "Beras 40g",
          "Daging sapi 20g",
          "Kacang merah 15g",
          "Wortel 10g",
          "Kentang 10g",
          "Air secukupnya"
        ],
        instructions: [
          "Cuci beras hingga bersih",
          "Rendam kacang merah selama 2 jam, lalu rebus hingga lunak",
          "Rebus beras dengan air hingga menjadi bubur",
          "Masukkan daging sapi yang sudah dipotong kecil",
          "Tambahkan wortel dan kentang yang sudah dipotong halus",
          "Masukkan kacang merah yang sudah lunak",
          "Masak hingga semua bahan matang dan tercampur rata",
          "Haluskan semua bahan hingga menjadi bubur lembut",
          "Sajikan dalam keadaan hangat"
        ],
        nutritionInfo: {
          calories: "135 kkal",
          protein: "10g",
          carbs: "21g",
          fat: "2.5g"
        }
      },
      {
        id: 4,
        title: "Bubur Kanju",
        subtitle: "Rumbi Ayam & Udang",
        thumbnail: require('../assets/resep-mpasi/usia-6-8-bulan/bubur-kanju/bubur-kanju-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/usia-6-8-bulan/bubur-kanju/bubur-kanju-data.png')
        ],
        description: "Bubur kanju dengan rumbi ayam dan udang yang bergizi untuk bayi usia 6-8 bulan",
        ingredients: [
          "Beras 40g",
          "Daging ayam 20g",
          "Udang 15g",
          "Wortel 10g",
          "Daun bayam 5g",
          "Air secukupnya"
        ],
        instructions: [
          "Cuci beras hingga bersih",
          "Rebus beras dengan air hingga menjadi bubur",
          "Masukkan daging ayam yang sudah dipotong kecil",
          "Tambahkan udang yang sudah dibersihkan dan dipotong halus",
          "Masukkan wortel yang sudah dipotong kecil",
          "Masak hingga semua bahan matang",
          "Tambahkan daun bayam yang sudah dicuci bersih",
          "Aduk sebentar hingga bayam layu",
          "Haluskan semua bahan hingga menjadi bubur lembut",
          "Sajikan dalam keadaan hangat"
        ],
        nutritionInfo: {
          calories: "130 kkal",
          protein: "11g",
          carbs: "20g",
          fat: "2.3g"
        }
      },
      {
        id: 5,
        title: "Puding Kentang",
        subtitle: "Ayam & Telur",
        thumbnail: require('../assets/resep-mpasi/usia-6-8-bulan/puding-kentang/puding-kentang-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/usia-6-8-bulan/puding-kentang/puding-kentang-data.png')
        ],
        description: "Puding kentang dengan ayam dan telur yang bergizi untuk bayi usia 6-8 bulan",
        ingredients: [
          "Kentang 50g",
          "Daging ayam 20g",
          "Telur ayam 1 butir",
          "Wortel 10g",
          "Susu formula 50ml",
          "Air secukupnya"
        ],
        instructions: [
          "Kupas dan potong kentang menjadi kecil",
          "Rebus kentang hingga lunak",
          "Masukkan daging ayam yang sudah dipotong kecil",
          "Tambahkan wortel yang sudah dipotong halus",
          "Masak hingga semua bahan matang",
          "Kocok telur ayam hingga rata",
          "Tuang telur ke dalam campuran kentang dan ayam",
          "Aduk terus hingga telur matang",
          "Tambahkan susu formula, aduk hingga tercampur",
          "Haluskan semua bahan hingga menjadi puding lembut",
          "Sajikan dalam keadaan hangat"
        ],
        nutritionInfo: {
          calories: "140 kkal",
          protein: "12g",
          carbs: "18g",
          fat: "3g"
        }
      }
    ]
  },
  {
    ageRange: "9-11 Bulan",
    placeholderImage: require('../assets/mpasi/profil-mpasi-09-11-bulan.png'),
    recipes: [
      {
        id: 1,
        title: "Nasi Tim",
        subtitle: "Campuran Sayuran",
        thumbnail: require('../assets/resep-mpasi/usia-9-11-bulan/nasi-tim/nasi-tim-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/usia-9-11-bulan/nasi-tim/nasi-tim-data.png')
        ],
        description: "Nasi tim dengan campuran sayuran yang bergizi untuk bayi usia 9-11 bulan",
        ingredients: [
          "Beras 40g",
          "Wortel 20g",
          "Brokoli 15g",
          "Daging ayam 25g",
          "Air secukupnya"
        ],
        instructions: [
          "Cuci beras hingga bersih",
          "Potong sayuran menjadi kecil",
          "Masukkan semua bahan ke dalam panci",
          "Masak dengan api kecil hingga menjadi tim",
          "Aduk sesekali agar tidak lengket",
          "Sajikan dalam keadaan hangat"
        ],
        nutritionInfo: {
          calories: "140 kkal",
          protein: "10g",
          carbs: "22g",
          fat: "2.5g"
        }
      },
      {
        id: 2,
        title: "Nasi Tim",
        subtitle: "Ayam Lele Cincang",
        thumbnail: require('../assets/resep-mpasi/usia-9-11-bulan/nasi-tim-ayam-lele/nasi-tim-ayam-lele-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/usia-9-11-bulan/nasi-tim-ayam-lele/nasi-tim-ayam-lele-data.png')
        ],
        description: "Nasi tim dengan ayam dan lele cincang yang bergizi untuk bayi usia 9-11 bulan",
        ingredients: [
          "Beras 45g",
          "Daging ayam 25g",
          "Daging lele 20g",
          "Wortel 15g",
          "Brokoli 10g",
          "Air secukupnya"
        ],
        instructions: [
          "Cuci beras hingga bersih",
          "Cincang halus daging ayam dan lele",
          "Potong wortel dan brokoli menjadi kecil",
          "Masukkan beras ke dalam panci dengan air",
          "Tambahkan daging ayam dan lele cincang",
          "Masukkan wortel dan brokoli",
          "Masak dengan api kecil hingga menjadi tim",
          "Aduk sesekali agar tidak lengket",
          "Pastikan semua bahan matang sempurna",
          "Sajikan dalam keadaan hangat"
        ],
        nutritionInfo: {
          calories: "150 kkal",
          protein: "12g",
          carbs: "24g",
          fat: "2.8g"
        }
      },
      {
        id: 3,
        title: "Mie Kukus",
        subtitle: "Telur Puyuh",
        thumbnail: require('../assets/resep-mpasi/usia-9-11-bulan/mie-kukus/mie-kukus-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/usia-9-11-bulan/mie-kukus/mie-kukus-data.png')
        ],
        description: "Mie kukus dengan telur puyuh yang bergizi untuk bayi usia 9-11 bulan",
        ingredients: [
          "Mie bayi 30g",
          "Telur puyuh 3 butir",
          "Wortel 15g",
          "Brokoli 10g",
          "Daging ayam 20g",
          "Air secukupnya"
        ],
        instructions: [
          "Rebus mie bayi hingga lunak, tiriskan",
          "Rebus telur puyuh hingga matang, kupas kulitnya",
          "Potong wortel dan brokoli menjadi kecil",
          "Cincang halus daging ayam",
          "Kukus mie bersama wortel dan brokoli",
          "Tambahkan daging ayam cincang",
          "Masukkan telur puyuh yang sudah dikupas",
          "Kukus selama 10-15 menit hingga semua matang",
          "Aduk rata semua bahan",
          "Sajikan dalam keadaan hangat"
        ],
        nutritionInfo: {
          calories: "145 kkal",
          protein: "11g",
          carbs: "23g",
          fat: "2.6g"
        }
      },
      {
        id: 4,
        title: "Nasi Tim",
        subtitle: "Ikan Telur Sayuran",
        thumbnail: require('../assets/resep-mpasi/usia-9-11-bulan/nasi-tim-ikan/nasi-tim-ikan-sayuran-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/usia-9-11-bulan/nasi-tim-ikan/nasi-tim-ikan-sayuran-data.png')
        ],
        description: "Nasi tim dengan ikan, telur dan sayuran yang bergizi untuk bayi usia 9-11 bulan",
        ingredients: [
          "Beras 45g",
          "Ikan fillet 25g",
          "Telur ayam 1 butir",
          "Wortel 15g",
          "Brokoli 10g",
          "Bayam 5g",
          "Air secukupnya"
        ],
        instructions: [
          "Cuci beras hingga bersih",
          "Potong ikan fillet menjadi kecil",
          "Kocok telur ayam hingga rata",
          "Potong wortel, brokoli dan bayam menjadi kecil",
          "Masukkan beras ke dalam panci dengan air",
          "Tambahkan ikan fillet yang sudah dipotong",
          "Masukkan wortel dan brokoli",
          "Tuang telur kocok ke dalam campuran",
          "Masak dengan api kecil hingga menjadi tim",
          "Tambahkan bayam di akhir, aduk sebentar",
          "Pastikan semua bahan matang sempurna",
          "Sajikan dalam keadaan hangat"
        ],
        nutritionInfo: {
          calories: "155 kkal",
          protein: "13g",
          carbs: "25g",
          fat: "2.9g"
        }
      },
      {
        id: 5,
        title: "Tim Bubur Manado",
        subtitle: "Daging dan Udang",
        thumbnail: require('../assets/resep-mpasi/usia-9-11-bulan/tim-bubur-manado/tim-bubur-manado-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/usia-9-11-bulan/tim-bubur-manado/tim-bubur-manado-data.png')
        ],
        description: "Tim bubur Manado dengan daging dan udang yang bergizi untuk bayi usia 9-11 bulan",
        ingredients: [
          "Beras 45g",
          "Daging sapi 20g",
          "Udang 15g",
          "Wortel 15g",
          "Kacang panjang 10g",
          "Daun kemangi 5g",
          "Air secukupnya"
        ],
        instructions: [
          "Cuci beras hingga bersih",
          "Cincang halus daging sapi",
          "Bersihkan udang dan potong kecil",
          "Potong wortel dan kacang panjang menjadi kecil",
          "Masukkan beras ke dalam panci dengan air",
          "Tambahkan daging sapi cincang",
          "Masukkan udang yang sudah dibersihkan",
          "Tambahkan wortel dan kacang panjang",
          "Masak dengan api kecil hingga menjadi tim",
          "Tambahkan daun kemangi di akhir",
          "Aduk sebentar hingga kemangi layu",
          "Pastikan semua bahan matang sempurna",
          "Sajikan dalam keadaan hangat"
        ],
        nutritionInfo: {
          calories: "160 kkal",
          protein: "14g",
          carbs: "26g",
          fat: "3.1g"
        }
      }
    ]
  },
  {
    ageRange: "12-23 Bulan",
    placeholderImage: require('../assets/mpasi/profil-mpasi-12-23-bulan.png'),
    recipes: [
      {
        id: 1,
        title: "Nugget Tempe",
        subtitle: "Ayam Sayuran",
        thumbnail: require('../assets/resep-mpasi/usia-12-23-bulan/nasi-sup/nasi-sup-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/usia-12-23-bulan/nasi-sup/nasi-sup-data.png')
        ],
        description: "Nugget tempe dengan ayam dan sayuran yang bergizi untuk balita usia 12-23 bulan",
        ingredients: [
          "Tempe 100g",
          "Daging ayam 50g",
          "Wortel 30g",
          "Brokoli 25g",
          "Telur 1 butir",
          "Tepung roti secukupnya",
          "Minyak untuk menggoreng"
        ],
        instructions: [
          "Haluskan tempe hingga lembut",
          "Cincang halus daging ayam",
          "Parut wortel dan potong brokoli kecil",
          "Campur tempe, ayam, wortel, dan brokoli",
          "Tambahkan telur, aduk hingga rata",
          "Bentuk adonan menjadi nugget",
          "Gulingkan di tepung roti",
          "Goreng hingga kuning keemasan",
          "Tiriskan minyak berlebih",
          "Sajikan dalam keadaan hangat"
        ],
        nutritionInfo: {
          calories: "180 kkal",
          protein: "15g",
          carbs: "20g",
          fat: "6g"
        }
      },
      {
        id: 2,
        title: "Nasi Soto",
        subtitle: "Ayam Kuah Kuning",
        thumbnail: require('../assets/resep-mpasi/usia-12-23-bulan/nasi-soto/nasi-soto-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/usia-12-23-bulan/nasi-soto/nasi-soto-data.png')
        ],
        description: "Nasi soto ayam dengan kuah kuning yang bergizi untuk balita usia 12-23 bulan",
        ingredients: [
          "Nasi putih 80g",
          "Daging ayam 60g",
          "Wortel 25g",
          "Kacang panjang 20g",
          "Daun seledri 10g",
          "Bawang merah 5g",
          "Kunyit 3g",
          "Air secukupnya"
        ],
        instructions: [
          "Rebus daging ayam hingga matang, suwir-suwir",
          "Haluskan bawang merah dan kunyit",
          "Tumis bumbu halus hingga harum",
          "Tambahkan air, masak hingga mendidih",
          "Masukkan daging ayam suwir",
          "Tambahkan wortel dan kacang panjang",
          "Masak hingga sayuran lunak",
          "Tambahkan daun seledri, aduk sebentar",
          "Sajikan nasi dengan kuah soto",
          "Pastikan suhu tidak terlalu panas"
        ],
        nutritionInfo: {
          calories: "200 kkal",
          protein: "18g",
          carbs: "25g",
          fat: "4g"
        }
      },
      {
        id: 3,
        title: "Sup Telur Puyuh",
        subtitle: "Ikan Air Tawar Labu Kuning",
        thumbnail: require('../assets/resep-mpasi/usia-12-23-bulan/sup-telur/sup-telur-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/usia-12-23-bulan/sup-telur/sup-telur-data.png')
        ],
        description: "Sup telur puyuh dengan ikan air tawar dan labu kuning yang bergizi untuk balita usia 12-23 bulan",
        ingredients: [
          "Telur puyuh 5 butir",
          "Ikan air tawar 50g",
          "Labu kuning 40g",
          "Wortel 20g",
          "Daun bayam 15g",
          "Bawang putih 3g",
          "Air secukupnya"
        ],
        instructions: [
          "Rebus telur puyuh hingga matang, kupas kulitnya",
          "Potong ikan air tawar menjadi kecil",
          "Potong labu kuning dan wortel menjadi dadu kecil",
          "Haluskan bawang putih",
          "Tumis bawang putih hingga harum",
          "Tambahkan air, masak hingga mendidih",
          "Masukkan ikan air tawar, masak hingga matang",
          "Tambahkan labu kuning dan wortel",
          "Masak hingga sayuran lunak",
          "Masukkan telur puyuh dan daun bayam",
          "Aduk sebentar hingga bayam layu",
          "Sajikan dalam keadaan hangat"
        ],
        nutritionInfo: {
          calories: "190 kkal",
          protein: "16g",
          carbs: "22g",
          fat: "5g"
        }
      },
      {
        id: 4,
        title: "Nasi Ikan",
        subtitle: "Kuah Kuning",
        thumbnail: require('../assets/resep-mpasi/usia-12-23-bulan/nasi-ikan/nasi-ikan-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/usia-12-23-bulan/nasi-ikan/nasi-ikan-data.png')
        ],
        description: "Nasi ikan dengan kuah kuning yang bergizi untuk balita usia 12-23 bulan",
        ingredients: [
          "Nasi putih 80g",
          "Ikan fillet 60g",
          "Wortel 25g",
          "Kacang panjang 20g",
          "Daun kemangi 10g",
          "Bawang merah 5g",
          "Kunyit 3g",
          "Air secukupnya"
        ],
        instructions: [
          "Potong ikan fillet menjadi kecil",
          "Haluskan bawang merah dan kunyit",
          "Tumis bumbu halus hingga harum",
          "Tambahkan air, masak hingga mendidih",
          "Masukkan ikan fillet, masak hingga matang",
          "Tambahkan wortel dan kacang panjang",
          "Masak hingga sayuran lunak",
          "Tambahkan daun kemangi, aduk sebentar",
          "Sajikan nasi dengan kuah ikan kuning",
          "Pastikan suhu tidak terlalu panas"
        ],
        nutritionInfo: {
          calories: "195 kkal",
          protein: "17g",
          carbs: "24g",
          fat: "4.5g"
        }
      },
      {
        id: 5,
        title: "Nugget Tempe",
        subtitle: "Ayam Sayuran",
        thumbnail: require('../assets/resep-mpasi/usia-12-23-bulan/nugget-tempe/nugget-tempe-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/usia-12-23-bulan/nugget-tempe/nugget-tempe-data.png')
        ],
        description: "Nugget tempe dengan ayam dan sayuran yang bergizi untuk balita usia 12-23 bulan",
        ingredients: [
          "Tempe 120g",
          "Daging ayam 60g",
          "Wortel 35g",
          "Brokoli 30g",
          "Telur 1 butir",
          "Tepung roti secukupnya",
          "Minyak untuk menggoreng"
        ],
        instructions: [
          "Haluskan tempe hingga lembut",
          "Cincang halus daging ayam",
          "Parut wortel dan potong brokoli kecil",
          "Campur tempe, ayam, wortel, dan brokoli",
          "Tambahkan telur, aduk hingga rata",
          "Bentuk adonan menjadi nugget",
          "Gulingkan di tepung roti",
          "Goreng hingga kuning keemasan",
          "Tiriskan minyak berlebih",
          "Sajikan dalam keadaan hangat"
        ],
        nutritionInfo: {
          calories: "210 kkal",
          protein: "18g",
          carbs: "22g",
          fat: "7g"
        }
      }
    ]
  },
  {
    ageRange: "2-5 Tahun",
    placeholderImage: require('../assets/mpasi/profil-mpasi-2-5-tahun.png'),
    recipes: [
      {
        id: 1,
        title: "Nasi Bakar",
        subtitle: "Ayam Santan",
        thumbnail: require('../assets/resep-mpasi/usia-2-5-tahun/nasi-bakar/nasi-bakar-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/usia-2-5-tahun/nasi-bakar/nasi-bakar-data.png')
        ],
        scrollableDataImages: [
          require('../assets/resep-mpasi/usia-2-5-tahun/nasi-bakar/nasi-bakar-data-2.png')
        ],
        description: "Nasi bakar dengan ayam santan yang bergizi untuk anak usia 2-5 tahun",
        ingredients: [
          "Nasi putih 100g",
          "Daging ayam 80g",
          "Santan 100ml",
          "Wortel 40g",
          "Kacang panjang 30g",
          "Daun kemangi 15g",
          "Bawang merah 8g",
          "Kunyit 5g",
          "Daun pisang untuk membungkus"
        ],
        instructions: [
          "Potong daging ayam menjadi kecil",
          "Haluskan bawang merah dan kunyit",
          "Tumis bumbu halus hingga harum",
          "Masukkan daging ayam, masak hingga matang",
          "Tambahkan santan, masak hingga mendidih",
          "Masukkan wortel dan kacang panjang",
          "Masak hingga sayuran lunak",
          "Tambahkan daun kemangi, aduk sebentar",
          "Campur nasi dengan kuah ayam santan",
          "Bungkus dengan daun pisang",
          "Bakar hingga daun pisang layu",
          "Sajikan dalam keadaan hangat"
        ],
        nutritionInfo: {
          calories: "250 kkal",
          protein: "20g",
          carbs: "35g",
          fat: "8g"
        }
      },
      {
        id: 2,
        title: "Nasi Sup Tabas",
        subtitle: "Udang Sayur",
        thumbnail: require('../assets/resep-mpasi/usia-2-5-tahun/nasi-sup-tabas/nasi-sup-tabas-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/usia-2-5-tahun/nasi-sup-tabas/nasi-sup-tabas-data.png')
        ],
        scrollableDataImages: [
          require('../assets/resep-mpasi/usia-2-5-tahun/nasi-sup-tabas/nasi-sup-tabas-data-2.png')
        ],
        description: "Nasi sup tabas dengan udang dan sayuran yang bergizi untuk anak usia 2-5 tahun",
        ingredients: [
          "Nasi putih 100g",
          "Udang 70g",
          "Wortel 35g",
          "Brokoli 30g",
          "Kacang panjang 25g",
          "Daun seledri 15g",
          "Bawang putih 5g",
          "Air secukupnya"
        ],
        instructions: [
          "Bersihkan udang dan potong kecil",
          "Haluskan bawang putih",
          "Tumis bawang putih hingga harum",
          "Tambahkan air, masak hingga mendidih",
          "Masukkan udang, masak hingga matang",
          "Tambahkan wortel, brokoli, dan kacang panjang",
          "Masak hingga sayuran lunak",
          "Tambahkan daun seledri, aduk sebentar",
          "Sajikan nasi dengan kuah sup tabas",
          "Pastikan suhu tidak terlalu panas"
        ],
        nutritionInfo: {
          calories: "240 kkal",
          protein: "22g",
          carbs: "32g",
          fat: "5g"
        }
      },
      {
        id: 3,
        title: "Nasi Masak",
        subtitle: "Ayam Kecap Sayur",
        thumbnail: require('../assets/resep-mpasi/usia-2-5-tahun/nasi-masak/nasi-masak-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/usia-2-5-tahun/nasi-masak/nasi-masak-data.png')
        ],
        description: "Nasi masak dengan ayam kecap dan sayuran yang bergizi untuk anak usia 2-5 tahun",
        ingredients: [
          "Nasi putih 100g",
          "Daging ayam 80g",
          "Wortel 40g",
          "Brokoli 35g",
          "Kecap manis 20ml",
          "Bawang merah 8g",
          "Bawang putih 5g",
          "Minyak untuk menumis"
        ],
        instructions: [
          "Potong daging ayam menjadi kecil",
          "Haluskan bawang merah dan bawang putih",
          "Tumis bumbu halus hingga harum",
          "Masukkan daging ayam, masak hingga matang",
          "Tambahkan kecap manis, aduk rata",
          "Masukkan wortel dan brokoli",
          "Masak hingga sayuran lunak",
          "Aduk sesekali agar tidak lengket",
          "Sajikan nasi dengan ayam kecap sayur",
          "Pastikan suhu tidak terlalu panas"
        ],
        nutritionInfo: {
          calories: "260 kkal",
          protein: "24g",
          carbs: "38g",
          fat: "6g"
        }
      },
      {
        id: 4,
        title: "Bola-bola Nasi",
        subtitle: "Rabuk Ikan",
        thumbnail: require('../assets/resep-mpasi/usia-2-5-tahun/bola-nasi/bola-nasi-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/usia-2-5-tahun/bola-nasi/bola-nasi-data.png')
        ],
        description: "Bola-bola nasi dengan rabuk ikan yang bergizi untuk anak usia 2-5 tahun",
        ingredients: [
          "Nasi putih 120g",
          "Ikan fillet 60g",
          "Wortel 30g",
          "Brokoli 25g",
          "Telur 1 butir",
          "Tepung roti secukupnya",
          "Minyak untuk menggoreng"
        ],
        instructions: [
          "Haluskan ikan fillet hingga lembut",
          "Parut wortel dan potong brokoli kecil",
          "Campur nasi dengan ikan halus",
          "Tambahkan wortel dan brokoli",
          "Masukkan telur, aduk hingga rata",
          "Bentuk adonan menjadi bola-bola",
          "Gulingkan di tepung roti",
          "Goreng hingga kuning keemasan",
          "Tiriskan minyak berlebih",
          "Sajikan dalam keadaan hangat"
        ],
        nutritionInfo: {
          calories: "280 kkal",
          protein: "26g",
          carbs: "40g",
          fat: "7g"
        }
      }
    ]
  },
  {
    ageRange: "Ibu Hamil",
    placeholderImage: require('../assets/mpasi/profil-mpasi-ibuhamil.png'),
    recipes: [
      {
        id: 1,
        title: "Nasi Kuning",
        subtitle: "Harum Rampa Ikan Tuna Balado",
        thumbnail: require('../assets/resep-mpasi/ibu-hamil/nasi-kuning/nasi-kuning-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/ibu-hamil/nasi-kuning/nasi-kuning-data.png')
        ],
        scrollableDataImages: [
          require('../assets/resep-mpasi/ibu-hamil/nasi-kuning/nasi-kuning-data-2.png')
        ],
        description: "Nasi kuning dengan harum rampa ikan tuna balado yang bergizi untuk ibu hamil",
        ingredients: [
          "Nasi putih 120g",
          "Ikan tuna 100g",
          "Kunyit 10g",
          "Santan 150ml",
          "Wortel 50g",
          "Kacang panjang 40g",
          "Daun kemangi 20g",
          "Bawang merah 10g",
          "Cabai merah 5g"
        ],
        instructions: [
          "Cuci beras hingga bersih",
          "Haluskan kunyit dan bawang merah",
          "Masak nasi dengan santan dan kunyit",
          "Potong ikan tuna menjadi kecil",
          "Buat sambal balado dengan cabai merah",
          "Tumis ikan tuna dengan sambal balado",
          "Potong sayuran menjadi kecil",
          "Masak sayuran hingga lunak",
          "Sajikan nasi kuning dengan ikan tuna balado",
          "Tambahkan sayuran dan daun kemangi"
        ],
        nutritionInfo: {
          calories: "320 kkal",
          protein: "28g",
          carbs: "45g",
          fat: "8g"
        }
      },
      {
        id: 2,
        title: "Liwet Ikan Goreng",
        subtitle: "Dan Kari Daun Singkong dan Ebi",
        thumbnail: require('../assets/resep-mpasi/ibu-hamil/liwet/liwet-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/ibu-hamil/liwet/liwet-data.png')
        ],
        scrollableDataImages: [
          require('../assets/resep-mpasi/ibu-hamil/liwet/liwet-data-2.png')
        ],
        description: "Liwet ikan goreng dengan kari daun singkong dan ebi yang bergizi untuk ibu hamil",
        ingredients: [
          "Nasi liwet 120g",
          "Ikan goreng 100g",
          "Daun singkong 80g",
          "Ebi 30g",
          "Santan 150ml",
          "Bawang merah 10g",
          "Bawang putih 8g",
          "Kunyit 5g",
          "Cabai merah 3g"
        ],
        instructions: [
          "Siapkan nasi liwet yang sudah matang",
          "Goreng ikan hingga matang dan renyah",
          "Haluskan bumbu kari (bawang merah, bawang putih, kunyit, cabai)",
          "Tumis bumbu kari hingga harum",
          "Tambahkan santan, masak hingga mendidih",
          "Masukkan daun singkong yang sudah dicuci",
          "Tambahkan ebi, masak hingga daun singkong lunak",
          "Sajikan nasi liwet dengan ikan goreng",
          "Tuang kari daun singkong dan ebi di samping",
          "Pastikan suhu tidak terlalu panas"
        ],
        nutritionInfo: {
          calories: "350 kkal",
          protein: "32g",
          carbs: "42g",
          fat: "10g"
        }
      },
      {
        id: 3,
        title: "Siomay Ayam",
        subtitle: "Udang Komplit",
        thumbnail: require('../assets/resep-mpasi/ibu-hamil/siomay/siomay-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/ibu-hamil/siomay/siomay-data.png')
        ],
        scrollableDataImages: [
          require('../assets/resep-mpasi/ibu-hamil/siomay/siomay-data-2.png')
        ],
        description: "Siomay ayam dengan udang komplit yang bergizi untuk ibu hamil",
        ingredients: [
          "Daging ayam 120g",
          "Udang 80g",
          "Tepung tapioka 60g",
          "Wortel 40g",
          "Brokoli 35g",
          "Telur 1 butir",
          "Bawang putih 8g",
          "Kulit pangsit secukupnya"
        ],
        instructions: [
          "Haluskan daging ayam dan udang",
          "Parut wortel dan potong brokoli kecil",
          "Campur daging ayam, udang, dan sayuran",
          "Tambahkan tepung tapioka dan telur",
          "Aduk hingga adonan rata dan kalis",
          "Bungkus adonan dengan kulit pangsit",
          "Kukus siomay selama 15-20 menit",
          "Pastikan siomay matang sempurna",
          "Sajikan dengan saus kacang atau kecap",
          "Tambahkan sayuran segar sebagai pelengkap"
        ],
        nutritionInfo: {
          calories: "280 kkal",
          protein: "26g",
          carbs: "35g",
          fat: "6g"
        }
      },
      {
        id: 4,
        title: "Lapis Tamie",
        subtitle: "Isi Ayam",
        thumbnail: require('../assets/resep-mpasi/ibu-hamil/lapis-tamie/lapis-tamie-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/ibu-hamil/lapis-tamie/lapis-tamie-data.png')
        ],
        scrollableDataImages: [
          require('../assets/resep-mpasi/ibu-hamil/lapis-tamie/lapis-tamie-data-2.png')
        ],
        description: "Lapis tamie dengan isi ayam yang bergizi untuk ibu hamil",
        ingredients: [
          "Mie tamie 100g",
          "Daging ayam 100g",
          "Wortel 50g",
          "Brokoli 40g",
          "Telur 2 butir",
          "Bawang merah 10g",
          "Bawang putih 8g",
          "Kecap manis 20ml",
          "Minyak untuk menumis"
        ],
        instructions: [
          "Rebus mie tamie hingga lunak, tiriskan",
          "Potong daging ayam menjadi kecil",
          "Haluskan bawang merah dan bawang putih",
          "Tumis bumbu halus hingga harum",
          "Masukkan daging ayam, masak hingga matang",
          "Tambahkan wortel dan brokoli",
          "Masak hingga sayuran lunak",
          "Masukkan mie tamie, aduk rata",
          "Tuang telur kocok, aduk hingga telur matang",
          "Tambahkan kecap manis, aduk hingga rata",
          "Sajikan dalam keadaan hangat"
        ],
        nutritionInfo: {
          calories: "300 kkal",
          protein: "24g",
          carbs: "38g",
          fat: "8g"
        }
      },
      {
        id: 5,
        title: "Nasi Rawon",
        subtitle: "Nasi Rawon",
        thumbnail: require('../assets/resep-mpasi/ibu-hamil/rawon/nasi-rawon-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/ibu-hamil/rawon/nasi-rawon-data.png')
        ],
        description: "Nasi rawon yang bergizi untuk ibu hamil",
        ingredients: [
          "Nasi putih 120g",
          "Daging sapi 100g",
          "Kluwek 20g",
          "Bawang merah 15g",
          "Bawang putih 10g",
          "Kunyit 8g",
          "Daun salam 3 lembar",
          "Sereh 2 batang",
          "Air secukupnya"
        ],
        instructions: [
          "Potong daging sapi menjadi kecil",
          "Haluskan bumbu rawon (bawang merah, bawang putih, kunyit, kluwek)",
          "Tumis bumbu halus hingga harum",
          "Masukkan daging sapi, masak hingga matang",
          "Tambahkan air, masak hingga mendidih",
          "Masukkan daun salam dan sereh",
          "Masak dengan api kecil hingga daging empuk",
          "Sajikan nasi dengan kuah rawon",
          "Tambahkan tauge dan daun bawang",
          "Pastikan suhu tidak terlalu panas"
        ],
        nutritionInfo: {
          calories: "340 kkal",
          protein: "30g",
          carbs: "40g",
          fat: "9g"
        }
      }
    ]
  }
];

// Helper function to get recipes by age range
export const getRecipesByAge = (ageRange: string): MpasiAgeGroup | undefined => {
  return mpasiData.find(group => group.ageRange === ageRange);
};

// Helper function to get recipe by ID and age range
export const getRecipeById = (ageRange: string, recipeId: number): MpasiRecipe | undefined => {
  const ageGroup = getRecipesByAge(ageRange);
  return ageGroup?.recipes.find(recipe => recipe.id === recipeId);
};
