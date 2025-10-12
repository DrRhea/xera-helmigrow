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
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

const { width, height } = Dimensions.get('window');

interface MpasiDetailScreenIbuHamilProps {
  onBack: () => void;
}

const MpasiDetailScreenIbuHamil: React.FC<MpasiDetailScreenIbuHamilProps> = ({ onBack }) => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const recipeData = [
    {
      id: 1,
      title: 'Menu Sehat',
      subtitle: 'Ibu Hamil',
      rating: 4.8,
      image: require('../assets/mpasi/karrousel/car1-06-08-bulan.png'),
    },
    {
      id: 2,
      title: 'Bubur',
      subtitle: 'Kacang & Sayuran',
      rating: 4.9,
      image: require('../assets/mpasi/karrousel/car2-06-08-bulan.png'),
    },
    {
      id: 3,
      title: 'Bubur',
      subtitle: 'Daging & Buah',
      rating: 4.7,
      image: require('../assets/mpasi/karrousel/car3-06-08-bulan.png'),
    },
    {
      id: 4,
      title: 'Bubur',
      subtitle: 'Ikan & Telur',
      rating: 4.6,
      image: require('../assets/mpasi/karrousel/car4-06-08-bulan.png'),
    },
    {
      id: 5,
      title: 'Bubur',
      subtitle: 'Susu & Buah',
      rating: 4.5,
      image: require('../assets/mpasi/karrousel/car5-06-08-bulan.png'),
    }
  ];

  const renderRecipeCard = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.recipeCard}>
      <Image source={item.image} style={styles.recipeImage} />
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
        <Text style={styles.headerTitle}>Detail Gizi Ibu Hamil</Text>
      </View>

      {/* MPASI Card */}
      <View style={styles.mpasiCard}>
        <View style={styles.cardContent}>
          <View style={styles.cardIcon}>
            <Ionicons name="restaurant" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Kebutuhan Gizi</Text>
            <Text style={styles.cardSubtitle}>Ibu Hamil</Text>
          </View>
        </View>
      </View>

      {/* Recipe Carousel */}
      <View style={styles.carouselContainer}>
        <FlatList
          data={recipeData}
          renderItem={renderRecipeCard}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContent}
        />
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* MPASI Profile Section */}
        <View style={styles.mpasiProfileSection}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/mpasi/profil-mpasi-ibuhamil.png')}
              style={styles.mpasiProfileImage}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={onBack}
        >
          <View style={styles.navIcon}>
            <Image
              source={require('../assets/icon navigasi/icon-home.png')}
              style={styles.navIconImage}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={[styles.navIcon, styles.activeNavIcon]}>
            <Image
              source={require('../assets/icon navigasi/icon-konten.png')}
              style={styles.navIconImage}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIcon}>
            <Image
              source={require('../assets/icon navigasi/icon-chat-dokter.png')}
              style={styles.chatDoctorIcon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIcon}>
            <Image
              source={require('../assets/icon navigasi/icon-transaksi.png')}
              style={styles.navIconImage}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIcon}>
            <Image
              source={require('../assets/icon navigasi/icon-profil.png')}
              style={styles.navIconImage}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FFF5F5',
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
  mpasiCard: {
    backgroundColor: '#4A90E2',
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
  },
  carouselContainer: {
    paddingVertical: 16,
    backgroundColor: '#FFF5F5',
  },
  carouselContent: {
    paddingHorizontal: 20,
  },
  recipeCard: {
    width: 160,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
  },
  recipeImage: {
    width: 160,
    height: 120,
    borderRadius: 12,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  mpasiProfileSection: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
  },
  imageContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  mpasiProfileImage: {
    width: '100%',
    height: 350,
  },
  bottomSpacing: {
    height: 20,
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFF5F5',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    marginBottom: 4,
  },
  navIconImage: {
    width: 32,
    height: 32,
  },
  chatDoctorIcon: {
    width: 40,
    height: 40,
  },
  activeNavIcon: {
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    padding: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
  },
});

export default MpasiDetailScreenIbuHamil;
