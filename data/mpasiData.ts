export interface MpasiRecipe {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: any;
  dataImages: any[];
  rating: number;
  ageGroup: string;
}

export interface MpasiAgeGroup {
  ageGroup: string;
  profileImage: any;
  recipes: MpasiRecipe[];
}

export const mpasiData: MpasiAgeGroup[] = [
  {
    ageGroup: '6-8 bulan',
    profileImage: require('../assets/mpasi/profil-mpasi-06-08-bulan.png'),
    recipes: []
  },
  {
    ageGroup: '9-11 bulan',
    profileImage: require('../assets/mpasi/profil-mpasi-09-11-bulan.png'),
    recipes: [
      {
        id: 'nasi-tim',
        title: 'Nasi Tim',
        subtitle: 'Ikan Tuna Telur Puyuh',
        thumbnail: require('../assets/resep-mpasi/usia-6-8-bulan/nasi-tim/nasi-tim-thumbnail.png'),
        dataImages: [
          require('../assets/resep-mpasi/usia-6-8-bulan/nasi-tim/nasi-tim-data.png')
        ],
        rating: 4.8,
        ageGroup: '9-11 bulan'
      }
    ]
  }
];
