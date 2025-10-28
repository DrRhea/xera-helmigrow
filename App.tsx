import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import SplashScreen from './components/SplashScreen';
import WelcomeScreen from './components/WelcomeScreen';
import SignUpScreen from './components/SignUpScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import KontenScreen from './components/KontenScreen';
import ChatDoctorScreen from './components/ChatDoctorScreen';
import ProfileScreen from './components/ProfileScreen';
import ProductInfoScreen from './components/ProductInfoScreen';
import DiariAnakScreen from './components/DiariAnakScreen';
import EditProfileScreen from './components/EditProfileScreen';
import authService from './services/authService';

type Screen = 'welcome' | 'signup' | 'signin' | 'home' | 'konten' | 'chat' | 'profile' | 'product' | 'diari' | 'edit-profile';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  // Effect untuk menangani perubahan screen
  useEffect(() => {
    // Screen changed
  }, [currentScreen]);

  const handleSplashFinish = async () => {
    try {
      // Cek apakah user sudah login
      const isLoggedIn = await authService.isLoggedIn();
      
      if (isLoggedIn) {
        // Jika sudah login, langsung ke home
        setCurrentScreen('home');
      } else {
        // Jika belum login, ke welcome screen
        setCurrentScreen('welcome');
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      // Jika ada error, default ke welcome screen
      setCurrentScreen('welcome');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    setCurrentScreen('signup');
  };

  const handleSignIn = () => {
    setCurrentScreen('signin');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
  };

  const handleCreateAccount = () => {
    setCurrentScreen('signup');
  };

  const handleLoginSuccess = () => {
    setCurrentScreen('home');
  };

  const handleRegisterSuccess = () => {
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setCurrentScreen('welcome');
  };

  const handleNavigation = (screen: string) => {
    switch (screen) {
      case 'home':
        setCurrentScreen('home');
        break;
      case 'konten':
        setCurrentScreen('konten');
        break;
      case 'chat':
        setCurrentScreen('chat');
        break;
      case 'transaksi':
        setCurrentScreen('product');
        break;
      case 'product':
        setCurrentScreen('product');
        break;
      case 'profile':
        setCurrentScreen('profile');
        break;
      case 'diari':
        setCurrentScreen('diari');
        break;
      case 'edit-profile':
        setCurrentScreen('edit-profile');
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'signup':
        return <SignUpScreen onSignIn={handleSignIn} onBack={handleBackToWelcome} onRegisterSuccess={handleRegisterSuccess} />;
      case 'signin':
        return <LoginScreen onCreateAccount={handleCreateAccount} onBack={handleBackToWelcome} onLoginSuccess={handleLoginSuccess} />;
      case 'home':
        return <HomeScreen onLogout={handleLogout} onNavigate={handleNavigation} />;
      case 'konten':
        return <KontenScreen onBack={() => setCurrentScreen('home')} onNavigate={handleNavigation} />;
      case 'chat':
        return <ChatDoctorScreen onBack={() => setCurrentScreen('home')} onNavigate={handleNavigation} />;
      case 'profile':
        return <ProfileScreen onBack={() => setCurrentScreen('home')} onLogout={handleLogout} onNavigate={handleNavigation} />;
      case 'product':
        return <ProductInfoScreen onBack={() => setCurrentScreen('home')} onNavigate={handleNavigation} />;
      case 'diari':
        return <DiariAnakScreen onBack={() => setCurrentScreen('home')} onNavigate={handleNavigation} />;
      case 'edit-profile':
        return <EditProfileScreen onBack={() => setCurrentScreen('profile')} onNavigate={handleNavigation} />;
      default:
        return <WelcomeScreen onSignUp={handleSignUp} onSignIn={handleSignIn} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderCurrentScreen()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
