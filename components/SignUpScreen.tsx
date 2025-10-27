import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import authService from '../services/authService';

const { width, height } = Dimensions.get('window');

interface SignUpScreenProps {
  onSignIn: () => void;
  onBack: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignIn, onBack }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleCreateAccount = async () => {
    if (!username || !email || !phoneNumber || !password || !confirmPassword) {
      Alert.alert('Error', 'Mohon isi semua field');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password dan konfirmasi password tidak sama');
      return;
    }

    setIsLoading(true);
    try {
      await authService.register({
        name: username.trim(),
        email: email.trim(),
        phone: phoneNumber.trim(),
        password: password.trim(),
        password_confirmation: confirmPassword.trim(),
      });
      
      Alert.alert('Success', 'Akun berhasil dibuat!', [
        {
          text: 'OK',
          onPress: onSignIn,
        },
      ]);
    } catch (error: any) {
      console.error('SignUp Error:', error);
      Alert.alert('Error', error.message || 'Pendaftaran gagal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.fullScreenContainer}>
      {/* Background Image - Fixed at bottom */}
      <Image
        source={require('../assets/rumah-gadang-background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>Create your account</Text>

        {/* Profile Picture Placeholder */}
        <View style={styles.profileContainer}>
          <View style={styles.profilePlaceholder}>
            <Ionicons name="person" size={40} color="#666666" />
          </View>
        </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        {/* Username */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nama Lengkap</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Masukkan nama lengkap"
            placeholderTextColor="#999"
          />
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Masukkan email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Phone Number */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>No Hp</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Masukkan nomor HP"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Masukkan password"
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>

        {/* Confirm Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Konfirmasi Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Konfirmasi password"
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>
      </View>

      {/* Sign In Link */}
      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Have account? </Text>
        <TouchableOpacity onPress={onSignIn}>
          <Text style={styles.signInLink}>Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* Create Account Button */}
      <TouchableOpacity 
        style={[styles.createButton, isLoading && styles.disabledButton]} 
        onPress={handleCreateAccount}
        disabled={isLoading}
      >
        <LinearGradient
          colors={['#FF6B9D', '#FFB3D1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.createButtonText}>Create account</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: height * 0.4,
    zIndex: 0,
    opacity: 0.3,
  },
  scrollContainer: {
    flex: 1,
    zIndex: 1,
  },
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
    minHeight: height,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 30,
    zIndex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 40,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profilePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
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
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  signInText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
  },
  signInLink: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#87CEEB',
  },
  createButton: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 40,
  },
  gradientButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default SignUpScreen;
