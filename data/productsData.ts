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
    image: require('../assets/roti-tepung-komposit.jpeg'),
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
  }
];
