export interface ProductData {
  id: number;
  name: string;
  shelfLife: string;
  image: any;
  tag: string;
  // Detail data
  composition: string[];
  nutrition: {
    servingSize: string;
    servingsPerPackage: string;
    perServing: {
      totalEnergy: string;
      energyFromFat: string;
      totalFat: string;
      protein: string;
      carbohydrate: string;
    };
  };
  price: string;
}

export const productsData: ProductData[] = [
  {
    id: 1,
    name: 'ROTI TEPUNG KOMPOSIT',
    shelfLife: '7 hari – suhu ruang',
    image: require('../assets/info-produk/roti-tepung-komposit.jpeg'),
    tag: 'Produk',
    composition: [
      'Tepung terigu protein tinggi',
      'Tepung kacang merah',
      'Tepung kacang kedelai',
      'Tepung jagung',
      'Gula',
      'Margarin',
      'Ragi',
      'Susu UHT'
    ],
    nutrition: {
      servingSize: '60 gr (1 Pcs)',
      servingsPerPackage: '1 sajian dalam kemasan',
      perServing: {
        totalEnergy: '196,9 kkal',
        energyFromFat: '42,4 kkal',
        totalFat: '4,7 gr',
        protein: '5,68 gr',
        carbohydrate: '32,86 gr'
      }
    },
    price: 'Rp. 8000'
  },
  {
    id: 2,
    name: 'Vla Dadih',
    shelfLife: '1 hari – suhu ruang, 3 hari – suhu lemari pendingin',
    image: require('../assets/info-produk/via-dadih.jpeg'),
    tag: 'Produk',
    composition: [
      'Susu',
      'Gula',
      'Maizena',
      'Telur',
      'Dadih'
    ],
    nutrition: {
      servingSize: '30 gr (1 Pcs)',
      servingsPerPackage: '1 sajian dalam kemasan',
      perServing: {
        totalEnergy: '74,65 kkal',
        energyFromFat: '32,04 kkal',
        totalFat: '3,56 gr',
        protein: '1,89 gr',
        carbohydrate: '32,86 gr'
      }
    },
    price: 'Rp. 5000'
  },
  {
    id: 3,
    name: 'Healthy Cookies',
    shelfLife: '1 bulan - suhu ruang',
    image: require('../assets/info-produk/healthy-cookies.jpeg'),
    tag: 'Produk',
    composition: [
      'Tepung kacang merah',
      'Tepung kacang kedelai',
      'Tepung jagung',
      'Tepung terigu',
      'Putih telur',
      'Gula',
      'Margarin'
    ],
    nutrition: {
      servingSize: '40 gr (20 Pcs)',
      servingsPerPackage: '1 sajian dalam kemasan',
      perServing: {
        totalEnergy: '316 kkal',
        energyFromFat: '189 kkal',
        totalFat: '21 gr',
        protein: '4,4 gr',
        carbohydrate: '26,8 gr'
      }
    },
    price: 'Rp. 25000'
  },
  {
    id: 4,
    name: 'Puding Dadih',
    shelfLife: '1 hari – suhu ruang, 3 hari – suhu lemari pendingin',
    image: require('../assets/info-produk/puding-dadih.jpeg'),
    tag: 'Produk',
    composition: [
      'Agar',
      'Kental manis',
      'Saus mangga atau bubuk coklat (tergantung varian)',
      'Dadih'
    ],
    nutrition: {
      servingSize: '35 gram',
      servingsPerPackage: '1 sajian dalam kemasan',
      perServing: {
        totalEnergy: '83,72 kkal',
        energyFromFat: '26,46 kkal',
        totalFat: '2,94 gr',
        protein: '1,74 gr',
        carbohydrate: '13,54 gr'
      }
    },
    price: 'Rp. 5000'
  },
  {
    id: 5,
    name: 'Puding Telang',
    shelfLife: '1 hari – suhu ruang, 3 hari – suhu lemari pendingin',
    image: require('../assets/info-produk/puding-telang.jpeg'),
    tag: 'Produk',
    composition: [
      'Agar',
      'Susu UHT',
      'Ekstrak bunga telang',
      'Gula pasir'
    ],
    nutrition: {
      servingSize: '35 gram',
      servingsPerPackage: '1 sajian dalam kemasan',
      perServing: {
        totalEnergy: '83,72 kkal',
        energyFromFat: '26,46 kkal',
        totalFat: '2,94 gr',
        protein: '1,74 gr',
        carbohydrate: '13,54 gr'
      }
    },
    price: 'Rp. 5000'
  },
  {
    id: 6,
    name: 'Crust Pie Buah',
    shelfLife: '1 hari – suhu ruang, 3 hari – suhu lemari pendingin',
    image: require('../assets/info-produk/crust-pie-buah.jpeg'),
    tag: 'Produk',
    composition: [
      'Tepung komposit',
      'Kuning telur',
      'Margarin',
      'Buah-buahan',
      'Vla dadih'
    ],
    nutrition: {
      servingSize: '30 gr (1 pcs)',
      servingsPerPackage: '1 sajian dalam kemasan',
      perServing: {
        totalEnergy: '90,21 kkal',
        energyFromFat: '0 kkal', // Tidak ada data energi dari lemak
        totalFat: '3,89 gr',
        protein: '2,19 gr',
        carbohydrate: '12,84 gr'
      }
    },
    price: 'Rp. 5000'
  },
  {
    id: 7,
    name: 'Salad Buah Vla Dadih',
    shelfLife: '1 hari – suhu ruang, 3 hari – suhu lemari pendingin',
    image: require('../assets/info-produk/salad-buad-via-dadih.jpeg'),
    tag: 'Produk',
    composition: [
      'Buah-buahan segar',
      'Vla dadih',
      'Potongan jelly'
    ],
    nutrition: {
      servingSize: '100 gram',
      servingsPerPackage: '1 sajian dalam kemasan',
      perServing: {
        totalEnergy: '114,1 kkal',
        energyFromFat: '0 kkal', // Tidak ada data energi dari lemak
        totalFat: '7 gr',
        protein: '8,4 gr',
        carbohydrate: '23,2 gr'
      }
    },
    price: 'Rp. 15000'
  },
  {
    id: 8,
    name: 'Tepung Dadih Susu Sapi',
    shelfLife: '1 bulan',
    image: require('../assets/info-produk/tepung-dadih-susu-sapi.png'),
    tag: 'Produk',
    composition: [
      'Susu sapi difermentasikan'
    ],
    nutrition: {
      servingSize: '3 gram',
      servingsPerPackage: '1 sajian dalam kemasan',
      perServing: {
        totalEnergy: '9,65 kkal',
        energyFromFat: '0 kkal', // Tidak ada data energi dari lemak
        totalFat: '0,25 gr',
        protein: '0,36 gr',
        carbohydrate: '1,5 gr'
      }
    },
    price: 'Rp. 5000'
  },
  {
    id: 9,
    name: 'Dadiah',
    shelfLife: '3-5 hari – suhu dingin',
    image: require('../assets/home/foto-dadiah.png'),
    tag: 'Produk',
    composition: [
      'Susu kerbau difermentasikan',
      'Bakteri asam laktat',
      'Probiotik alami'
    ],
    nutrition: {
      servingSize: '100 gram',
      servingsPerPackage: '1 sajian dalam kemasan',
      perServing: {
        totalEnergy: '85 kkal',
        energyFromFat: '45 kkal',
        totalFat: '5 gr',
        protein: '6 gr',
        carbohydrate: '4 gr'
      }
    },
    price: 'Rp. 12000'
  }
];
