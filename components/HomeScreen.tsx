import React, { useState } from 'react';
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
import AddChildScreen from './AddChildScreen';
import ImunisasiScreen from './ImunisasiScreen';
import ResepMpasiScreen from './ResepMpasiScreen';

const { width, height } = Dimensions.get('window');

interface HomeScreenProps {
  onLogout: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onLogout }) => {
  const [showAddChild, setShowAddChild] = useState(false);
  const [showImunisasi, setShowImunisasi] = useState(false);
  const [showResepMpasi, setShowResepMpasi] = useState(false);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleAddChild = () => {
    setShowAddChild(true);
  };

  const handleBackFromAddChild = () => {
    setShowAddChild(false);
  };

  const handleSaveChild = () => {
    setShowAddChild(false);
    // Here you can add logic to save the child data
  };

  const handleImunisasi = () => {
    setShowImunisasi(true);
  };

  const handleBackFromImunisasi = () => {
    setShowImunisasi(false);
  };

  const handleResepMpasi = () => {
    setShowResepMpasi(true);
  };

  const handleBackFromResepMpasi = () => {
    setShowResepMpasi(false);
  };

  if (showAddChild) {
    return (
      <AddChildScreen 
        onBack={handleBackFromAddChild}
        onSave={handleSaveChild}
      />
    );
  }

  if (showImunisasi) {
    return (
      <ImunisasiScreen 
        onBack={handleBackFromImunisasi}
      />
    );
  }

  if (showResepMpasi) {
    return (
      <ResepMpasiScreen 
        onBack={handleBackFromResepMpasi}
      />
    );
  }

  const featureIcons = [
    { id: 1, icon: require('../assets/icons/jadwal-imunisasi.png'), label: 'Jadwal Imuninasi' },
    { id: 2, icon: require('../assets/icons/resep-mpasi.png'), label: 'Resep MPASI' },
    { id: 3, icon: require('../assets/icons/grafik-tumbuhi.png'), label: 'Grafik Tumbuhi' },
    { id: 4, icon: require('../assets/icons/tahap-kembang.png'), label: 'Tahap Kembang' },
    { id: 5, icon: require('../assets/icons/artikel.png'), label: 'Artikel' },
    { id: 6, icon: require('../assets/icons/info-produk.png'), label: 'Info Produk' },
    { id: 7, icon: require('../assets/icons/diari-anak.png'), label: 'Diari Anak' },
  ];

  const contentCards = [
    {
      id: 1,
      title: 'Dadiah',
      description: 'Makanan Pencegah Stunting',
      image: '🥣', // Placeholder emoji
    },
    {
      id: 2,
      title: 'Dadiah',
      description: 'Makanan Pencegah Stunting',
      image: '🥣', // Placeholder emoji
    },
  ];

  const bottomNavItems = [
    { id: 1, icon: 'home', label: 'Home', active: true },
    { id: 2, icon: 'document-text', label: 'Konten', active: false },
    { id: 3, icon: 'medical', label: 'Chat Dokter', active: false },
    { id: 4, icon: 'receipt', label: 'Transaksi', active: false },
    { id: 5, icon: 'person', label: 'Profil', active: false },
  ];

  const renderFeatureIcon = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.featureIconContainer}
      onPress={() => {
        if (item.id === 1) { // Jadwal Imuninasi
          handleImunisasi();
        } else if (item.id === 2) { // Resep MPASI
          handleResepMpasi();
        }
        // Add other navigation handlers here for other icons
      }}
    >
      <View style={styles.featureIcon}>
        <Image
          source={item.icon}
          style={styles.featureIconImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.featureLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderContentCard = ({ item }: { item: any }) => (
    <View style={styles.contentCard}>
      <View style={styles.cardImage}>
        <Text style={styles.cardImageEmoji}>{item.image}</Text>
      </View>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <TouchableOpacity style={styles.readMoreButton}>
        <Text style={styles.readMoreText}>Selengkapnya</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require('../assets/logo-helmigrowth-horizontal.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color="#000000" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>1</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Greeting */}
        <Text style={styles.greeting}>Hai Febrinaldo</Text>

        {/* Child Profile Section */}
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Profil Anak</Text>
        </View>

        <LinearGradient
          colors={['#3FB2E6', '#B3E8FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.childProfileCard}
        >
          <View style={styles.childProfileContent}>
            <View style={styles.childIcons}>
              <Image
                source={require('../assets/icons/ikon-bayi.png')}
                style={styles.childIconImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.childProfileText}>
              <Text style={styles.childProfileTitle}>Mom Dad belum Punya Profil Anak</Text>
              <TouchableOpacity style={styles.addChildButton} onPress={handleAddChild}>
                <LinearGradient
                  colors={['#F15797', '#FFFDED']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.addChildGradient}
                >
                  <Text style={styles.addChildText}>+ Tambahkan Anak</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {/* Feature Icons */}
        <View style={styles.featureSection}>
          <FlatList
            data={featureIcons}
            renderItem={renderFeatureIcon}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featureList}
          />
          <View style={styles.carouselDots}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Manjujai Banner */}
        <LinearGradient
          colors={['#F267A0', '#FEF8EB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.manjujaiBanner}
        >
          <View style={styles.manjujaiContent}>
            <View style={styles.manjujaiImage}>
              <Image
                source={require('../assets/icons/manjujai.png')}
                style={styles.manjujaiIcon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.manjujaiText}>
              <Text style={styles.manjujaiTitle}>Manjujai</Text>
              <Text style={styles.manjujaiSubtitle}>Video & Edukasi Manjujai</Text>
            </View>
            <TouchableOpacity style={styles.manjujaiArrow}>
              <Image
                source={require('../assets/icons/panah-manjujai.png')}
                style={styles.manjujaiArrowIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Content Carousel Placeholder */}
        <View style={styles.carouselPlaceholder}>
          <Text style={styles.placeholderText}>Content Carousel</Text>
        </View>
        <View style={styles.carouselDots}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Content Cards */}
        <View style={styles.contentSection}>
          <FlatList
            data={contentCards}
            renderItem={renderContentCard}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentList}
          />
        </View>

        {/* Bottom Spacing */}
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
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 120,
    height: 40,
    marginRight: 10,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  greeting: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitleText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
  },
  childProfileCard: {
    width: width * 0.9, // 90% of screen width for better responsiveness
    minHeight: 100, // Minimum height for better content spacing
    borderRadius: 16, // Slightly larger for modern look
    padding: 16, // Reduced padding for better content fit
    marginBottom: 24, // Consistent spacing
    alignSelf: 'center',
  },
  childProfileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  childIcons: {
    flexDirection: 'row',
    marginRight: 16, // Consistent 16px spacing
  },
  childIconImage: {
    width: 80, // More balanced size
    height: 80, // Square for better proportions
  },
  childProfileText: {
    flex: 1,
  },
  childProfileTitle: {
    fontSize: 13, // Smaller font size to fit better
    fontFamily: 'Poppins_500Medium', // Medium weight for better hierarchy
    color: '#000000',
    marginBottom: 8, // Reduced spacing
    lineHeight: 16, // Reduced line height
  },
  addChildButton: {
    width: 145,
    height: 18,
    borderRadius: 20,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  addChildGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addChildText: {
    fontSize: 13, // Slightly larger for better readability
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
  },
  featureSection: {
    marginBottom: 30,
  },
  featureList: {
    paddingHorizontal: 20,
  },
  featureIconContainer: {
    alignItems: 'center',
    marginRight: 16, // Consistent spacing
    width: 72, // Slightly smaller for better fit
  },
  featureIcon: {
    width: 56, // Slightly smaller for better proportions
    height: 56,
    borderRadius: 16, // Consistent with card border radius
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIconImage: {
    width: 24,
    height: 24,
  },
  featureLabel: {
    fontSize: 11, // Slightly smaller for better fit
    fontFamily: 'Poppins_500Medium', // Medium weight for better readability
    color: '#000000',
    textAlign: 'center',
    lineHeight: 14, // Better line height
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#87CEEB',
  },
  manjujaiBanner: {
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  manjujaiContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  manjujaiImage: {
    marginRight: 15,
  },
  manjujaiIcon: {
    width: 60,
    height: 60,
  },
  manjujaiText: {
    flex: 1,
  },
  manjujaiTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    fontStyle: 'italic',
    color: '#000000',
    marginBottom: 5,
  },
  manjujaiSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
  },
  manjujaiArrow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  manjujaiArrowIcon: {
    width: 19.88042536643359,
    height: 19.88042536643359,
  },
  carouselPlaceholder: {
    height: 150,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  placeholderText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#999999',
  },
  contentSection: {
    marginBottom: 30,
  },
  contentList: {
    paddingHorizontal: 20,
  },
  contentCard: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    height: 100,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardImageEmoji: {
    fontSize: 40,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    marginBottom: 15,
  },
  readMoreButton: {
    backgroundColor: '#87CEEB',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 100,
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

export default HomeScreen;
