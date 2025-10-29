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
  ActivityIndicator,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import childrenService from '../services/childrenService';
import api from '../services/api';

const { width, height } = Dimensions.get('window');

interface AddChildScreenProps {
  onBack: () => void;
  onSave: () => void;
}

const AddChildScreen: React.FC<AddChildScreenProps> = ({ onBack, onSave }) => {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'Laki-laki' | 'Perempuan' | null>(null);
  const [birthWeight, setBirthWeight] = useState('');
  const [birthHeight, setBirthHeight] = useState('');
  const [headCircumference, setHeadCircumference] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [allergies, setAllergies] = useState<string[]>([]);
  const [medicalHistory, setMedicalHistory] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageBase64, setProfileImageBase64] = useState<string | null>(null);
  const [childPhotos, setChildPhotos] = useState<string[]>([]);
  const [childPhotosBase64, setChildPhotosBase64] = useState<string[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk error messages
  const [errors, setErrors] = useState<{
    fullName?: string;
    birthDate?: string;
    gender?: string;
    birthWeight?: string;
    birthHeight?: string;
    headCircumference?: string;
  }>({});

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Fungsi untuk clear error
  const clearError = (field: keyof typeof errors) => {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  // Fungsi untuk set error
  const setError = (field: keyof typeof errors, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  };

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
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri);
      
      // Convert to base64 for database storage
      try {
        const base64 = await convertImageToBase64(imageUri);
        setProfileImageBase64(base64);
      } catch (error) {
        Alert.alert('Error', 'Gagal memproses foto. Silakan coba lagi.');
      }
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
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri);
      
      // Convert to base64 for database storage
      try {
        const base64 = await convertImageToBase64(imageUri);
        setProfileImageBase64(base64);
      } catch (error) {
        Alert.alert('Error', 'Gagal memproses foto. Silakan coba lagi.');
      }
    }
  };

  const convertImageToBase64 = async (uri: string): Promise<string> => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: 'base64' as any,
      });
      return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
      throw error;
    }
  };

  const showImagePicker = () => {
    // Langsung buka galeri tanpa alert pilihan
    pickImage();
  };

  const pickChildPhotos = async () => {
    // Request permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
      return;
    }

    // Launch image picker with multiple selection
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      allowsMultipleSelection: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newPhotos: string[] = [];
      const newPhotosBase64: string[] = [];
      
      for (const asset of result.assets) {
        newPhotos.push(asset.uri);
        try {
          const base64 = await convertImageToBase64(asset.uri);
          newPhotosBase64.push(base64);
        } catch (error) {
          // Error converting image to base64
        }
      }
      
      setChildPhotos([...childPhotos, ...newPhotos]);
      setChildPhotosBase64([...childPhotosBase64, ...newPhotosBase64]);
    }
  };

  const removeChildPhoto = (index: number) => {
    const newPhotos = childPhotos.filter((_, i) => i !== index);
    const newPhotosBase64 = childPhotosBase64.filter((_, i) => i !== index);
    setChildPhotos(newPhotos);
    setChildPhotosBase64(newPhotosBase64);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      // Format date as YYYY-MM-DD for Laravel
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setBirthDate(formattedDate);
    }
  };

  const showDatePickerModal = () => {
    if (Platform.OS === 'web') {
      // For web, create a more visible date input
      const input = document.createElement('input');
      input.type = 'date';
      input.max = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
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
          // Format date as YYYY-MM-DD for Laravel
          const formattedDate = date.toISOString().split('T')[0];
          setBirthDate(formattedDate);
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

  const handleSave = async () => {
    // Clear previous errors
    setErrors({});
    
    let hasErrors = false;

    // Validasi field kosong
    if (!fullName.trim()) {
      setError('fullName', 'Mohon masukkan nama lengkap');
      hasErrors = true;
    } else if (fullName.trim().length < 2) {
      setError('fullName', 'Nama lengkap minimal 2 karakter');
      hasErrors = true;
    } else if (/^\d+$/.test(fullName.trim())) {
      setError('fullName', 'Nama lengkap tidak boleh hanya berisi angka');
      hasErrors = true;
    }
    
    if (!birthDate) {
      setError('birthDate', 'Mohon pilih tanggal lahir');
      hasErrors = true;
    } else {
      // Validasi tanggal lahir tidak boleh di masa depan
      const birthDateObj = new Date(birthDate);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      if (birthDateObj >= tomorrow) {
        setError('birthDate', 'Tanggal lahir tidak boleh di masa depan');
        hasErrors = true;
      }
    }
    
    if (!gender) {
      setError('gender', 'Mohon pilih jenis kelamin');
      hasErrors = true;
    }
    
    if (!birthWeight.trim()) {
      setError('birthWeight', 'Mohon masukkan berat badan');
      hasErrors = true;
    } else {
      const weight = parseFloat(birthWeight);
      if (isNaN(weight) || weight < 0.1 || weight > 50) {
        setError('birthWeight', 'Berat badan harus antara 0.1 - 50 kg');
        hasErrors = true;
      }
    }
    
    if (!birthHeight.trim()) {
      setError('birthHeight', 'Mohon masukkan tinggi badan');
      hasErrors = true;
    } else {
      const height = parseFloat(birthHeight);
      if (isNaN(height) || height <= 0 || height > 200) {
        setError('birthHeight', 'Tinggi badan harus antara 1 - 200 cm');
        hasErrors = true;
      }
    }
    
    if (!headCircumference.trim()) {
      setError('headCircumference', 'Mohon masukkan lingkar kepala');
      hasErrors = true;
    } else {
      const headCirc = parseFloat(headCircumference);
      if (isNaN(headCirc) || headCirc <= 0 || headCirc > 50) {
        setError('headCircumference', 'Lingkar kepala harus antara 1 - 50 cm');
        hasErrors = true;
      }
    }
    
    
    if (hasErrors) {
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      
      // Add basic data
      formData.append('name', fullName.trim());
      formData.append('birth_date', birthDate);
      formData.append('gender', gender || '');
      formData.append('weight', parseFloat(birthWeight).toString());
      formData.append('height', parseFloat(birthHeight).toString());
      formData.append('head_circumference', parseFloat(headCircumference).toString());
      
      if (bloodType.trim()) {
        formData.append('blood_type', bloodType.trim());
      }
      
      if (allergies.length > 0) {
        formData.append('allergies', JSON.stringify(allergies));
      }
      
      if (medicalHistory.length > 0) {
        formData.append('medical_history', JSON.stringify(medicalHistory));
      }
      
      // Handle profile image
      if (profileImage) {
        const response = await fetch(profileImage);
        const blob = await response.blob();
        const file = new File([blob], 'profile_image.jpg', { type: 'image/jpeg' });
        formData.append('profile_image', file);
      }
      
      // Handle photos array
      if (childPhotos.length > 0) {
        for (let i = 0; i < childPhotos.length; i++) {
          const response = await fetch(childPhotos[i]);
          const blob = await response.blob();
          const file = new File([blob], `photo_${i}.jpg`, { type: 'image/jpeg' });
          formData.append(`photos[${i}]`, file);
        }
      }


      const response = await api.post('/children', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newChild = response.data.data;
      
      // Data berhasil disimpan, langsung kembali ke HomeScreen
      onSave();
    } catch (error: any) {
      // Show detailed error message
      let errorMessage = error.message || 'Gagal menyimpan data anak';
      if (error.response?.data?.errors) {
        const validationErrors = Object.keys(error.response.data.errors)
          .map(field => `${field}: ${error.response.data.errors[field].join(', ')}`)
          .join('\n');
        errorMessage = `Validation errors:\n${validationErrors}`;
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
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

        {/* Profile Picture Section */}
        <View style={styles.profilePictureSection}>
          <View style={styles.profilePictureContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profilePicture} />
            ) : (
              <View style={styles.profilePlaceholder}>
                <Ionicons name="person" size={40} color="#666666" />
              </View>
            )}
            <TouchableOpacity style={styles.changePictureButton} onPress={showImagePicker}>
              <Ionicons name="camera" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.changePictureText}>Ketuk untuk mengubah foto</Text>
        </View>

        {/* Birth Data Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data kelahiran</Text>

          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <TextInput
              style={[styles.input, errors.fullName && styles.inputError]}
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                clearError('fullName');
              }}
              placeholder="Masukan Nama Lengkap"
              placeholderTextColor="#999"
            />
            {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
          </View>

          {/* Birth Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tanggal Lahir</Text>
            <TouchableOpacity 
              style={[styles.input, styles.dateInput, errors.birthDate && styles.inputError]} 
              onPress={showDatePickerModal}
            >
              <Text style={[styles.inputText, !birthDate && styles.placeholderText]}>
                {birthDate ? new Date(birthDate).toLocaleDateString('id-ID') : 'Masukan Tanggal Lahir'}
              </Text>
              <Ionicons name="calendar-outline" size={20} color="#999" />
            </TouchableOpacity>
            {errors.birthDate && <Text style={styles.errorText}>{errors.birthDate}</Text>}
          </View>

          {/* Gender */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Jenis Kelamin</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity 
                style={styles.radioOption} 
                onPress={() => {
                  setGender('Laki-laki');
                  clearError('gender');
                }}
              >
                <View style={[styles.radioButton, gender === 'Laki-laki' && styles.radioSelected]}>
                  {gender === 'Laki-laki' && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioLabel}>Laki-Laki</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.radioOption} 
                onPress={() => {
                  setGender('Perempuan');
                  clearError('gender');
                }}
              >
                <View style={[styles.radioButton, gender === 'Perempuan' && styles.radioSelected]}>
                  {gender === 'Perempuan' && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioLabel}>Perempuan</Text>
              </TouchableOpacity>
            </View>
            {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
          </View>

          {/* Photo Upload */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Foto Si Kecil</Text>
            <TouchableOpacity style={styles.uploadArea} onPress={pickChildPhotos}>
              <View style={styles.uploadIconContainer}>
                <Ionicons name="images" size={28} color="#87CEEB" />
                <View style={styles.plusIconContainer}>
                  <Ionicons name="add" size={16} color="#FFFFFF" />
                </View>
              </View>
              <Text style={styles.uploadText}>Unggah Foto (Bisa Multiple)</Text>
              <Text style={styles.uploadSubtext}>Tap untuk memilih foto</Text>
            </TouchableOpacity>
            
            {/* Display uploaded photos */}
            {childPhotos.length > 0 && (
              <View style={styles.photosContainer}>
                {childPhotos.map((photo, index) => (
                  <View key={index} style={styles.photoItem}>
                    <Image source={{ uri: photo }} style={styles.photoPreview} />
                    <TouchableOpacity 
                      style={styles.removePhotoButton}
                      onPress={() => removeChildPhoto(index)}
                    >
                      <Ionicons name="close-circle" size={20} color="#FF6B6B" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Birth Weight */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Berat Badan Saat Lahir (Kg)</Text>
            <TextInput
              style={[styles.input, errors.birthWeight && styles.inputError]}
              value={birthWeight}
              onChangeText={(text) => {
                setBirthWeight(text);
                clearError('birthWeight');
              }}
              placeholder="Masukan Berat badan"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
            />
            {errors.birthWeight && <Text style={styles.errorText}>{errors.birthWeight}</Text>}
          </View>

          {/* Birth Height */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tinggi Badan Saat Lahir (Cm)</Text>
            <TextInput
              style={[styles.input, errors.birthHeight && styles.inputError]}
              value={birthHeight}
              onChangeText={(text) => {
                setBirthHeight(text);
                clearError('birthHeight');
              }}
              placeholder="Masukan Tinggi badan"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
            />
            {errors.birthHeight && <Text style={styles.errorText}>{errors.birthHeight}</Text>}
          </View>

          {/* Head Circumference */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Lingkar Kepala Saat Lahir (Cm)</Text>
            <TextInput
              style={[styles.input, errors.headCircumference && styles.inputError]}
              value={headCircumference}
              onChangeText={(text) => {
                setHeadCircumference(text);
                clearError('headCircumference');
              }}
              placeholder="Masukan Lingkar Kepala"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
            />
            {errors.headCircumference && <Text style={styles.errorText}>{errors.headCircumference}</Text>}
          </View>

          {/* Blood Type */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Golongan Darah (Opsional)</Text>
            <TextInput
              style={styles.input}
              value={bloodType}
              onChangeText={setBloodType}
              placeholder="Masukan Golongan Darah"
              placeholderTextColor="#999"
            />
          </View>

        </View>

        {/* Save Button */}
        <TouchableOpacity 
          style={[styles.saveButton, isLoading && styles.disabledButton]} 
          onPress={handleSave}
          disabled={isLoading}
        >
          <LinearGradient
            colors={['#87CEEB', '#4682B4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveGradient}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.saveButtonText}>Simpan</Text>
            )}
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
          maximumDate={new Date(new Date().setDate(new Date().getDate() + 1))}
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
  profilePictureSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  profilePictureContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F0F0',
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
  changePictureButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  changePictureText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
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
  uploadSubtext: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: '#87CEEB',
    marginTop: 2,
  },
  uploadIconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIconContainer: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#87CEEB',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
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
  disabledButton: {
    opacity: 0.6,
  },
  // Error styles
  inputError: {
    borderColor: '#FF6B6B',
    borderWidth: 2,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    marginTop: 4,
    marginLeft: 4,
  },
  // Multiple photos styles
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 10,
  },
  photoItem: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  photoPreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removePhotoButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 2,
  },
});

export default AddChildScreen;
