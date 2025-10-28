import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import NutritionScreen from './NutritionScreen';

const { width, height } = Dimensions.get('window');

interface ChildProfileScreenProps {
  onBack: () => void;
  childData: {
    id: number;
    name: string;
    birth_date: string; // Ubah dari birthDate ke birth_date
    gender: string;
    weight?: number;
    height?: number;
    head_circumference?: number;
    blood_type?: string;
    allergies?: string[];
    medical_history?: string[];
    parent_name?: string;
    parent_phone?: string;
    emergency_contact?: string;
    address?: string;
    notes?: string;
    profile_image?: string;
  };
}

const ChildProfileScreen: React.FC<ChildProfileScreenProps> = ({ onBack, childData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showNutrition, setShowNutrition] = useState(false);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  if (showNutrition) {
    return (
      <NutritionScreen 
        onBack={() => setShowNutrition(false)}
        childData={{
          id: childData.id,
          name: childData.name,
          birth_date: childData.birth_date, // Gunakan birth_date yang benar
          gender: childData.gender,
        }}
      />
    );
  }

  // Data carousel gambar anak
  const childImages = [
    {
      id: 1,
      image: require('../assets/icons/ikon-bayi.png'), // Placeholder, bisa diganti dengan foto asli
    },
    {
      id: 2,
      image: require('../assets/icons/ikon-bayi.png'), // Placeholder, bisa diganti dengan foto asli
    },
    {
      id: 3,
      image: require('../assets/icons/ikon-bayi.png'), // Placeholder, bisa diganti dengan foto asli
    },
  ];

  const renderCarouselItem = ({ item }: { item: any }) => (
    <View style={styles.carouselItem}>
      <Image
        source={item.image}
        style={styles.childImage}
        resizeMode="cover"
      />
    </View>
  );

  const renderCarouselDots = () => (
    <View style={styles.carouselDots}>
      {childImages.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === currentImageIndex ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );

  const featureCards = [
    {
      id: 1,
      title: 'Jadwal',
      subtitle: 'Imunisasi Anak',
      icon: 'calendar',
      color: '#4A90E2',
      onPress: () => {
        // Navigate to immunization schedule
      },
    },
    {
      id: 2,
      title: 'Pertumbuhan',
      subtitle: 'Anak',
      icon: 'trending-up',
      color: '#FF6B9D',
      onPress: () => {
        // Navigate to growth chart
      },
    },
    {
      id: 3,
      title: 'Diary',
      subtitle: 'Plan Anak',
      icon: 'book',
      color: '#4CAF50',
      onPress: () => {
        // Navigate to diary plan
      },
    },
    {
      id: 4,
      title: 'Status Gizi',
      subtitle: 'Anak',
      icon: 'nutrition',
      color: '#FF9800',
      onPress: () => {
        setShowNutrition(true);
      },
    },
  ];

  const renderFeatureCard = ({ item }: { item: any }) => (
    <TouchableOpacity style={[styles.featureCard, { backgroundColor: item.color }]} onPress={item.onPress}>
      <View style={styles.featureCardContent}>
        <Ionicons name={item.icon} size={32} color="#FFFFFF" />
        <Text style={styles.featureCardTitle}>{item.title}</Text>
        <Text style={styles.featureCardSubtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with Pink Gradient */}
      <LinearGradient
        colors={['#FF6B9D', '#FFB3D1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Profil Anak</Text>
          </View>
          
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.childInfo}>
          <Text style={styles.childName}>{childData.name}</Text>
          <Text style={styles.childDescription}>Profil lengkap anak Anda</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Child Image Carousel */}
        <View style={styles.carouselContainer}>
          <View style={styles.carouselCard}>
            <FlatList
              data={childImages}
              renderItem={renderCarouselItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(event) => {
                const index = Math.round(event.nativeEvent.contentOffset.x / width);
                setCurrentImageIndex(index);
              }}
              style={styles.carousel}
            />
            {renderCarouselDots()}
          </View>
        </View>

        {/* Feature Cards */}
        <View style={styles.featureCardsContainer}>
          <Text style={styles.sectionTitle}>Fitur Utama</Text>
          <FlatList
            data={featureCards}
            renderItem={renderFeatureCard}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featureCardsList}
          />
        </View>

        {/* Perkembangan Card */}
        <View style={styles.perkembanganContainer}>
          <Text style={styles.sectionTitle}>Informasi Perkembangan</Text>
          <View style={styles.perkembanganCard}>
            <View style={styles.perkembanganContent}>
              <View style={styles.perkembanganImageContainer}>
                <Image
                  source={require('../assets/icons/ikon-bayi.png')}
                  style={styles.perkembanganImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.perkembanganTextContainer}>
                <Text style={styles.perkembanganTitle}>Perkembangan Anak</Text>
                <Text style={styles.perkembanganSubtitle}>Stimulasi dan panduan perkembangan berdasarkan usia anak</Text>
                <TouchableOpacity style={styles.moreInfoButton}>
                  <Text style={styles.moreInfoText}>Lihat Detail</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 0,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: -5,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
  },
  profileButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childInfo: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  childName: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  childDescription: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  carouselContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  carouselCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  carousel: {
    height: 180,
  },
  carouselItem: {
    width: width - 72, // Width minus padding
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#4A90E2',
  },
  inactiveDot: {
    backgroundColor: '#E0E0E0',
  },
  featureCardsContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333333',
    marginBottom: 15,
  },
  featureCardsList: {
    paddingRight: 20,
  },
  featureCard: {
    width: 110,
    height: 110,
    borderRadius: 16,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureCardContent: {
    alignItems: 'center',
  },
  featureCardTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
    marginTop: 6,
    marginBottom: 2,
  },
  featureCardSubtitle: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  perkembanganContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  perkembanganCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  perkembanganContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  perkembanganImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
  },
  perkembanganImage: {
    width: '100%',
    height: '100%',
  },
  perkembanganTextContainer: {
    flex: 1,
  },
  perkembanganTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: '#4A90E2',
    marginBottom: 6,
  },
  perkembanganSubtitle: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    marginBottom: 12,
    lineHeight: 18,
  },
  moreInfoButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
    alignSelf: 'flex-start',
  },
  moreInfoText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 100,
  },
});

export default ChildProfileScreen;
