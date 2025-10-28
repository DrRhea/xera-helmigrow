import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

const { width, height } = Dimensions.get('window');

interface BookingImunisasiScreenProps {
  onBack: () => void;
  onSubmit: () => void;
}

const BookingImunisasiScreen: React.FC<BookingImunisasiScreenProps> = ({ onBack, onSubmit }) => {
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [motherName, setMotherName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSubmit = () => {
    if (!childName || !childAge || !motherName || !phoneNumber) {
      Alert.alert('Error', 'Mohon lengkapi semua data');
      return;
    }
    Alert.alert('Berhasil', 'Data booking berhasil dikirim!');
    onSubmit();
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#FFFFFF', '#FFE4E1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGradient}
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
        </View>

        {/* Logo Illustration */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require('../assets/icons/imunisasi/suntik-imunisasi.png')}
            style={styles.mainLogo}
            resizeMode="contain"
          />
        </View>

        {/* Complete Data Section */}
        <Text style={styles.sectionTitle}>Lengkapi Data</Text>

        {/* Data Form Card */}
        <View style={styles.formCard}>
          <View style={styles.dottedBorder}>
            {/* Child Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nama Anak</Text>
              <TextInput
                style={styles.input}
                value={childName}
                onChangeText={setChildName}
                placeholder="Masukan Nama Anak"
                placeholderTextColor="#999"
              />
            </View>

            {/* Child Age */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Umur Anak</Text>
              <TextInput
                style={styles.input}
                value={childAge}
                onChangeText={setChildAge}
                placeholder="Masukan Umur Anak"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>

            {/* Mother Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nama Ibu</Text>
              <TextInput
                style={styles.input}
                value={motherName}
                onChangeText={setMotherName}
                placeholder="Masukan Nama Ibu"
                placeholderTextColor="#999"
              />
            </View>

            {/* Phone Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>No Hp</Text>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Masukan No Hp"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>

        {/* Guide Card */}
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

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <LinearGradient
            colors={['#87CEEB', '#4682B4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitGradient}
          >
            <Text style={styles.submitButtonText}>Kirim</Text>
          </LinearGradient>
        </TouchableOpacity>

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
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  mainLogo: {
    width: 120,
    height: 120,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.1)',
    elevation: 5,
  },
  dottedBorder: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  guideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD1DC',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 30,
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
  submitButton: {
    marginHorizontal: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  submitGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  bottomSpacing: {
    height: 40,
  },
});

export default BookingImunisasiScreen;
