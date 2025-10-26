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
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

const { width, height } = Dimensions.get('window');

interface AddChildScreenProps {
  onBack: () => void;
  onSave: () => void;
}

const AddChildScreen: React.FC<AddChildScreenProps> = ({ onBack, onSave }) => {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [birthWeight, setBirthWeight] = useState('');
  const [birthHeight, setBirthHeight] = useState('');
  const [headCircumference, setHeadCircumference] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const pickImage = async () => {
    // Request permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    // Request permission
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera is required!');
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const showImagePicker = () => {
    // Langsung buka galeri tanpa alert pilihan
    pickImage();
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      setBirthDate(selectedDate.toLocaleDateString('id-ID'));
    }
  };

  const showDatePickerModal = () => {
    if (Platform.OS === 'web') {
      // For web, create a more visible date input
      const input = document.createElement('input');
      input.type = 'date';
      input.max = new Date().toISOString().split('T')[0];
      input.style.position = 'fixed';
      input.style.top = '50%';
      input.style.left = '50%';
      input.style.transform = 'translate(-50%, -50%)';
      input.style.zIndex = '9999';
      input.style.fontSize = '16px';
      input.style.fontFamily = 'Poppins, sans-serif';
      input.style.padding = '15px 20px';
      input.style.border = '2px solid #87CEEB';
      input.style.borderRadius = '25px';
      input.style.backgroundColor = '#F5F5F5';
      input.style.color = '#000000';
      input.style.boxShadow = '0 8px 25px rgba(135, 206, 235, 0.3)';
      input.style.minWidth = '280px';
      input.style.outline = 'none';
      input.style.transition = 'all 0.3s ease';
      input.style.transform = 'translate(-50%, -50%) scale(0.9)';
      input.style.opacity = '0';
      
      // Add backdrop with app theme
      const backdrop = document.createElement('div');
      backdrop.style.position = 'fixed';
      backdrop.style.top = '0';
      backdrop.style.left = '0';
      backdrop.style.width = '100%';
      backdrop.style.height = '100%';
      backdrop.style.background = 'linear-gradient(135deg, rgba(255, 250, 236, 0.9), rgba(242, 103, 160, 0.8))';
      backdrop.style.zIndex = '9998';
      backdrop.style.backdropFilter = 'blur(5px)';
      
      document.body.appendChild(backdrop);
      document.body.appendChild(input);
      
      const cleanup = () => {
        if (document.body.contains(input)) document.body.removeChild(input);
        if (document.body.contains(backdrop)) document.body.removeChild(backdrop);
      };
      
      input.onchange = (e: any) => {
        if (e.target.value) {
          const date = new Date(e.target.value);
          setSelectedDate(date);
          setBirthDate(date.toLocaleDateString('id-ID'));
        }
        cleanup();
      };
      
      backdrop.onclick = cleanup;
      
      // Animate in and show calendar
      setTimeout(() => {
        input.style.transform = 'translate(-50%, -50%) scale(1)';
        input.style.opacity = '1';
        input.focus();
        // Try to show picker, fallback to click if not supported
        if (input.showPicker) {
          input.showPicker();
        } else {
          input.click();
        }
      }, 50);
    } else {
      setShowDatePicker(true);
    }
  };

  const handleSave = () => {
    // Validasi field kosong
    if (!fullName.trim()) {
      Alert.alert('Error', 'Mohon masukkan nama lengkap');
      return;
    }
    if (!birthDate) {
      Alert.alert('Error', 'Mohon pilih tanggal lahir');
      return;
    }
    if (!gender) {
      Alert.alert('Error', 'Mohon pilih jenis kelamin');
      return;
    }
    if (!birthWeight.trim()) {
      Alert.alert('Error', 'Mohon masukkan berat badan');
      return;
    }
    if (!birthHeight.trim()) {
      Alert.alert('Error', 'Mohon masukkan tinggi badan');
      return;
    }
    if (!headCircumference.trim()) {
      Alert.alert('Error', 'Mohon masukkan lingkar kepala');
      return;
    }

    // Validasi format numerik
    const weight = parseFloat(birthWeight);
    const height = parseFloat(birthHeight);
    const headCirc = parseFloat(headCircumference);

    if (isNaN(weight) || weight <= 0 || weight > 10) {
      Alert.alert('Error', 'Berat badan harus antara 0.1 - 10 kg');
      return;
    }
    if (isNaN(height) || height <= 0 || height > 100) {
      Alert.alert('Error', 'Tinggi badan harus antara 1 - 100 cm');
      return;
    }
    if (isNaN(headCirc) || headCirc <= 0 || headCirc > 50) {
      Alert.alert('Error', 'Lingkar kepala harus antara 1 - 50 cm');
      return;
    }

    Alert.alert('Berhasil', 'Data anak berhasil disimpan!');
    onSave();
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#FFFAEC', '#F267A0']}
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
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tambahkan Akun Anak</Text>
        </View>

        {/* Profile Picture Placeholder */}
        <View style={styles.profileContainer}>
          <TouchableOpacity style={styles.profilePlaceholder} onPress={showImagePicker}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Ionicons name="person" size={60} color="#666666" />
            )}
          </TouchableOpacity>
        </View>

        {/* Birth Data Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data kelahiran</Text>

          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Masukan Nama Lengkap"
              placeholderTextColor="#999"
            />
          </View>

          {/* Birth Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tanggal Lahir</Text>
            <TouchableOpacity style={[styles.input, styles.dateInput]} onPress={showDatePickerModal}>
              <Text style={[styles.inputText, !birthDate && styles.placeholderText]}>
                {birthDate || 'Masukan Tanggal Lahir'}
              </Text>
              <Ionicons name="calendar-outline" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Gender */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Jenis Kelamin</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity 
                style={styles.radioOption} 
                onPress={() => setGender('male')}
              >
                <View style={[styles.radioButton, gender === 'male' && styles.radioSelected]}>
                  {gender === 'male' && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioLabel}>Laki-Laki</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.radioOption} 
                onPress={() => setGender('female')}
              >
                <View style={[styles.radioButton, gender === 'female' && styles.radioSelected]}>
                  {gender === 'female' && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioLabel}>Perempuan</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Photo Upload */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Foto Si Kecil</Text>
            <TouchableOpacity style={styles.uploadArea} onPress={showImagePicker}>
              <Ionicons name="add" size={24} color="#000000" />
              <Text style={styles.uploadText}>Unggah Foto</Text>
            </TouchableOpacity>
          </View>

          {/* Birth Weight */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Berat Badan Saat Lahir (Kg)</Text>
            <TextInput
              style={styles.input}
              value={birthWeight}
              onChangeText={setBirthWeight}
              placeholder="Masukan Berat badan"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
            />
          </View>

          {/* Birth Height */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tinggi Badan Saat Lahir (Cm)</Text>
            <TextInput
              style={styles.input}
              value={birthHeight}
              onChangeText={setBirthHeight}
              placeholder="Masukan Tinggi badan"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
            />
          </View>

          {/* Head Circumference */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Lingkar Kepala Saat Lahir (Cm)</Text>
            <TextInput
              style={styles.input}
              value={headCircumference}
              onChangeText={setHeadCircumference}
              placeholder="Masukan Lingkar Kepala"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <LinearGradient
            colors={['#87CEEB', '#4682B4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveGradient}
          >
            <Text style={styles.saveButtonText}>Simpan</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Date Picker Modal - Only for mobile */}
      {showDatePicker && Platform.OS !== 'web' && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
          maximumDate={new Date()}
        />
      )}
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
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
    marginBottom: 20,
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
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    flex: 1,
  },
  placeholderText: {
    color: '#999',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#87CEEB',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#87CEEB',
  },
  radioLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
  },
  uploadArea: {
    width: '100%',
    height: 100,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  uploadText: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#000000',
    marginTop: 8,
  },
  saveButton: {
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 25,
    overflow: 'hidden',
  },
  saveGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  bottomSpacing: {
    height: 40,
  },
});

export default AddChildScreen;
