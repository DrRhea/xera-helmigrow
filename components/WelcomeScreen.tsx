import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

const { width } = Dimensions.get('window');

interface WelcomeScreenProps {
  onSignUp: () => void;
  onSignIn: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSignUp, onSignIn }) => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo-helmigrowth.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>


      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={onSignUp}>
          <LinearGradient
            colors={['#FF6B9D', '#FFB3D1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.signUpText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton} onPress={onSignIn}>
          <LinearGradient
            colors={['#FF6B9D', '#87CEEB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.signInGradient}
          >
            <View style={styles.signInButtonInner}>
              <Text style={styles.signInText}>Sign in</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 80,
  },
  logo: {
    width: width * 0.25,
    height: width * 0.25,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  signUpButton: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  signUpText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  signInButton: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
  },
  signInGradient: {
    padding: 2,
    borderRadius: 25,
  },
  signInButtonInner: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    color: '#FF6B9D',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
});

export default WelcomeScreen;
