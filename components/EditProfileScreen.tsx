import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import authService from '../services/authService';
import BottomNavbar from './BottomNavbar';

const { width, height } = Dimensions.get('window');

interface EditProfileScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  profile_image?: string;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ onBack, onNavigate }) => {
  const [userData, setUserData] = useState<UserData>({
    id: 0,
    name: '',
    email: '',
    phone: '',
    profile_image: '',
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const userData = await authService.getCurrentUser();
      
      setUserData({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        profile_image: '',
      });
      
      setFormData({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
      });
    } catch (error: any) {
      Alert.alert('Error', 'Gagal memuat data profil');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    const newFormData = {
      ...formData,
      [field]: value,
    };
    
    setFormData(newFormData);
    
    // Check if there are changes
    const hasChanges = 
      newFormData.name !== userData.name ||
      newFormData.email !== userData.email ||
      newFormData.phone !== userData.phone;
    
    setHasChanges(hasChanges);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      // Validate form
      if (!formData.name.trim()) {
        Alert.alert('Error', 'Nama tidak boleh kosong');
        return;
      }
      
      if (!formData.email.trim()) {
        Alert.alert('Error', 'Email tidak boleh kosong');
        return;
      }
      
      if (!formData.phone.trim()) {
        Alert.alert('Error', 'Nomor telepon tidak boleh kosong');
        return;
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        Alert.alert('Error', 'Format email tidak valid');
        return;
      }
      
      // Validate phone format (Indonesian phone number)
      const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
      if (!phoneRegex.test(formData.phone)) {
        Alert.alert('Error', 'Format nomor telepon tidak valid');
        return;
      }
      
      // Call API to update profile
      const updatedUser = await authService.updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });
      
      // Update user data
      setUserData(prev => ({
        ...prev,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
      }));
      
      setHasChanges(false);
      Alert.alert('Berhasil', 'Profil berhasil diperbarui');
      
    } catch (error: any) {
      
      if (error.response?.data?.errors) {
        const apiErrors = error.response.data.errors;
        let errorMessage = 'Gagal menyimpan perubahan:\n';
        
        if (apiErrors.name) {
          errorMessage += `• Nama: ${apiErrors.name[0]}\n`;
        }
        if (apiErrors.email) {
          errorMessage += `• Email: ${apiErrors.email[0]}\n`;
        }
        if (apiErrors.phone) {
          errorMessage += `• Telepon: ${apiErrors.phone[0]}\n`;
        }
        
        Alert.alert('Error', errorMessage);
      } else {
        Alert.alert('Error', error.message || 'Gagal menyimpan perubahan');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      Alert.alert(
        'Batal Edit',
        'Apakah Anda yakin ingin membatalkan perubahan?',
        [
          { text: 'Tidak', style: 'cancel' },
          { text: 'Ya', onPress: () => {
            setFormData({
              name: userData.name,
              email: userData.email,
              phone: userData.phone,
            });
            setHasChanges(false);
            onBack();
          }}
        ]
      );
    } else {
      onBack();
    }
  };

  const handleChangePassword = () => {
    if (onNavigate) {
      onNavigate('change-password');
    }
  };

  const handleChangeProfilePicture = () => {
    Alert.alert('Ubah Foto Profil', 'Fitur ubah foto profil akan segera tersedia');
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3FB2E6" />
        <Text style={styles.loadingText}>Memuat...</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3FB2E6" />
        <Text style={styles.loadingText}>Memuat data profil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={true}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleCancel}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profil</Text>
          <TouchableOpacity 
            style={[styles.saveButton, !hasChanges && styles.saveButtonDisabled]} 
            onPress={handleSave}
            disabled={!hasChanges || isSaving}
          >
            <Text style={[styles.saveButtonText, !hasChanges && styles.saveButtonTextDisabled]}>
              {isSaving ? 'Menyimpan...' : 'Simpan'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Profile Picture Section */}
        <View style={styles.profilePictureSection}>
          <View style={styles.profilePictureContainer}>
            {userData.profile_image ? (
              <Image
                source={{ uri: userData.profile_image }}
                style={styles.profilePicture}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.profilePlaceholder}>
                <Ionicons name="person" size={40} color="#666666" />
              </View>
            )}
            <TouchableOpacity style={styles.changePictureButton} onPress={handleChangeProfilePicture}>
              <Ionicons name="camera" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.changePictureText}>Ketuk untuk mengubah foto</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Name Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nama Lengkap</Text>
            <TextInput
              style={styles.textInput}
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder="Masukkan nama lengkap"
              placeholderTextColor="#999999"
            />
          </View>

          {/* Email Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="Masukkan email"
              placeholderTextColor="#999999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Phone Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nomor Telepon</Text>
            <TextInput
              style={styles.textInput}
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              placeholder="Masukkan nomor telepon"
              placeholderTextColor="#999999"
              keyboardType="phone-pad"
            />
          </View>

          {/* Change Password Button */}
          <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
            <View style={styles.changePasswordContent}>
              <Ionicons name="lock-closed-outline" size={20} color="#3FB2E6" />
              <Text style={styles.changePasswordText}>Ubah Password</Text>
              <Ionicons name="chevron-forward" size={20} color="#999999" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      {onNavigate && <BottomNavbar currentScreen="profile" onNavigate={onNavigate} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#666666',
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FFF5F5',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
  },
  saveButton: {
    backgroundColor: '#3FB2E6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  saveButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  saveButtonTextDisabled: {
    color: '#999999',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePictureButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#3FB2E6',
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
  formSection: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  changePasswordButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 8,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  changePasswordContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changePasswordText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#000000',
    marginLeft: 12,
  },
  bottomSpacing: {
    height: 80,
  },
});

export default EditProfileScreen;
