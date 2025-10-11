import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import BookingImunisasiScreen from './BookingImunisasiScreen';

const { width, height } = Dimensions.get('window');

interface ImunisasiScreenProps {
  onBack: () => void;
}

const ImunisasiScreen: React.FC<ImunisasiScreenProps> = ({ onBack }) => {
  const [showBooking, setShowBooking] = useState(false);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleBooking = () => {
    setShowBooking(true);
  };

  const handleBackFromBooking = () => {
    setShowBooking(false);
  };

  const handleSubmitBooking = () => {
    setShowBooking(false);
    // Here you can add logic to process the booking
  };

  if (showBooking) {
    return (
      <BookingImunisasiScreen 
        onBack={handleBackFromBooking}
        onSubmit={handleSubmitBooking}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#FFFFFF', '#F8F0FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGradient}
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Image
              source={require('../assets/icons/back-icon.png')}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Imuninasi</Text>
        </View>

        {/* Boking Vaksin Card */}
        <TouchableOpacity onPress={handleBooking}>
          <LinearGradient
            colors={['#87CEEB', '#B3E8FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.bookingCard}
          >
          <View style={styles.bookingIconContainer}>
            <View style={styles.bookingIconCircle}>
              <Image
                source={require('../assets/icons/imunisasi/suntik-imunisasi.png')}
                style={styles.bookingIcon}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.bookingTextContainer}>
            <Text style={styles.bookingTitle}>Boking Vaksin</Text>
            <Text style={styles.bookingSubtitle}>
              Lakukan Booking Vaksin dengan mudah{'\n'}Bersama HelmiGrowth
            </Text>
          </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Jadwal Vaksin Section */}
        <Text style={styles.sectionTitle}>Jadwal Vaksin</Text>

        {/* Dengue 1 Card */}
        <View style={styles.vaccineCard}>
          <View style={styles.dottedBorder}>
            <Text style={styles.vaccineRecommendation}>Direkomendasikan di 19 September 2025</Text>
            <View style={styles.vaccineDetails}>
              <Text style={styles.vaccineName}>Dengue 1</Text>
              <TouchableOpacity style={styles.vaccineStatusButton}>
                <Text style={styles.vaccineStatusText}>Belum</Text>
                <Ionicons name="chevron-forward" size={16} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Dengue 2 Card */}
        <View style={styles.vaccineCard}>
          <View style={styles.dottedBorder}>
            <Text style={styles.vaccineRecommendation}>Direkomendasikan di 19 Maret 2026</Text>
            <View style={styles.vaccineDetails}>
              <Text style={styles.vaccineName}>Dengue 2</Text>
              <TouchableOpacity style={styles.vaccineStatusButton}>
                <Text style={styles.vaccineStatusText}>Belum</Text>
                <Ionicons name="chevron-forward" size={16} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Panduan Imunisasi Anak Card */}
        <View style={styles.guideCard}>
          <View style={styles.guideIconContainer}>
            <View style={styles.guideIconCircle}>
              <Image
                source={require('../assets/icons/artikel.png')}
                style={styles.guideIcon}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.guideTextContainer}>
            <Text style={styles.guideTitle}>Panduan Imunisasi Anak</Text>
            <Text style={styles.guideSubtitle}>
              Kenali Vaksin apa saja yang anak anda butuhkan beserta dengan rincian biaya nya
            </Text>
          </View>
          <TouchableOpacity style={styles.guideArrowButton}>
            <Image
              source={require('../assets/icons/panah-manjujai.png')}
              style={styles.guideArrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
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
    backgroundColor: '#FFFFFF',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
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
  bookingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  bookingIconContainer: {
    marginRight: 15,
  },
  bookingIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingIcon: {
    width: 30,
    height: 30,
  },
  bookingTextContainer: {
    flex: 1,
  },
  bookingTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  bookingSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  vaccineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dottedBorder: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 15,
  },
  vaccineRecommendation: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    marginBottom: 10,
  },
  vaccineDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vaccineName: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
  },
  vaccineStatusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  vaccineStatusText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FF6B9D',
    marginRight: 5,
  },
  guideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD1DC',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 15,
  },
  guideIconContainer: {
    marginRight: 15,
  },
  guideIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideIcon: {
    width: 24,
    height: 24,
  },
  guideTextContainer: {
    flex: 1,
  },
  guideTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
    marginBottom: 5,
  },
  guideSubtitle: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: '#333333',
    lineHeight: 16,
  },
  guideArrowButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideArrowIcon: {
    width: 20,
    height: 20,
  },
  bottomSpacing: {
    height: 40,
  },
});

export default ImunisasiScreen;
