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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

const { width, height } = Dimensions.get('window');

interface LoginScreenProps {
  onCreateAccount: () => void;
  onBack: () => void;
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onCreateAccount, onBack, onLoginSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const handleLogin = () => {
    // Langsung masuk ke halaman Home tanpa validasi
    onLoginSuccess();
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.fullScreenContainer}>
      {/* Background Image - Rumah Gadang */}
      <Image
        source={require('../assets/rumah-gadang-background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo-helmigrowth.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Welcome Text */}
        <Text style={styles.welcomeText}>Welcome!</Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          {/* Phone Number */}
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="No Hp"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />

          {/* Password */}
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <LinearGradient
              colors={['#FF6B9D', '#FFB3D1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Create Account Button */}
          <TouchableOpacity style={styles.createAccountButton} onPress={onCreateAccount}>
            <Text style={styles.createAccountButtonText}>Create account</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    opacity: 0.2,
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
    paddingBottom: 40,
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: width * 0.25,
    height: width * 0.25,
  },
  welcomeText: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 50,
  },
  inputContainer: {
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  createAccountButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FF6B9D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createAccountButtonText: {
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
});

export default LoginScreen;
