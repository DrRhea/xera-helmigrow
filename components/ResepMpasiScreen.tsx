import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

const { width, height } = Dimensions.get('window');

interface ResepMpasiScreenProps {
  onBack: () => void;
}

const ResepMpasiScreen: React.FC<ResepMpasiScreenProps> = ({ onBack }) => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const bottomNavItems = [
    { id: 1, icon: 'home', label: 'Home', active: false },
    { id: 2, icon: 'document-text', label: 'Konten', active: true },
    { id: 3, icon: 'medical', label: 'Chat Dokter', active: false },
    { id: 4, icon: 'receipt', label: 'Transaksi', active: false },
    { id: 5, icon: 'person', label: 'Profil', active: false },
  ];

  const recipeData = [
    {
      id: 1,
      title: 'Kebutuhan MP-ASI',
      subtitle: 'Usia 06-08 Bulan',
      image: require('../assets/icons/resep-mpasi.png'),
      badge: 'LANJUTKAN PEMBERIAN ASI 70% MP-ASI 30%',
      rating: 5,
    },
    {
      id: 2,
      title: 'Kebutuhan MP-ASI',
      subtitle: 'Usia 09-11 Bulan',
      image: require('../assets/icons/resep-mpasi.png'),
      badge: 'LANJUTKAN PEMBERIAN ASI 50% MP-ASI 50%',
      rating: 5,
    },
    {
      id: 3,
      title: 'Kebutuhan MP-ASI',
      subtitle: 'Usia 12-23 Bulan',
      image: require('../assets/icons/resep-mpasi.png'),
      badge: 'LANJUTKAN PEMBERIAN ASI 70%',
      rating: 5,
    },
    {
      id: 4,
      title: 'Kebutuhan MP-ASI',
      subtitle: 'Usia 02-03 Tahun',
      image: require('../assets/icons/resep-mpasi.png'),
      badge: 'LANJUTKAN PEMBERIAN ASI 30%',
      rating: 5,
    },
    {
      id: 5,
      title: 'Kebutuhan Gizi',
      subtitle: 'Ibu Hamil',
      image: require('../assets/icons/resep-mpasi.png'),
      badge: 'NUTRISI LENGKAP UNTUK IBU HAMIL',
      rating: 5,
    },
  ];

  const renderRecipeCard = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.recipeCard}>
      <View style={styles.cardImageContainer}>
        <Image
          source={item.image}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <Ionicons
              key={index}
              name="star-outline"
              size={16}
              color="#FFD700"
              style={styles.star}
            />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.fullScreenContainer}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Image
            source={require('../assets/icons/back-icon.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resep Mpasi</Text>
      </View>

      {/* Recipe Grid */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={recipeData}
          renderItem={renderRecipeCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
          contentContainerStyle={styles.gridContainer}
        />
        
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        {bottomNavItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.navItem}>
            <View style={[styles.navIcon, item.active && styles.activeNavIcon]}>
              <Ionicons 
                name={item.icon as any} 
                size={20} 
                color={item.active ? '#FF6B9D' : '#666666'} 
              />
            </View>
            <Text style={[styles.navLabel, item.active && styles.activeNavLabel]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  gridContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  recipeCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  cardImageContainer: {
    position: 'relative',
    height: 120,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: 8,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 10,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 2,
  },
  bottomSpacing: {
    height: 40,
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    marginBottom: 5,
  },
  activeNavIcon: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 8,
  },
  navLabel: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
  },
  activeNavLabel: {
    color: '#FF6B9D',
    fontFamily: 'Poppins_600SemiBold',
  },
});

export default ResepMpasiScreen;
