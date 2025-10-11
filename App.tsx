import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import SplashScreen from './components/SplashScreen';
import WelcomeScreen from './components/WelcomeScreen';
import SignUpScreen from './components/SignUpScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';

type Screen = 'welcome' | 'signup' | 'signin' | 'home';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  const handleSplashFinish = () => {
    setIsLoading(false);
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

  const handleLogout = () => {
    setCurrentScreen('welcome');
  };

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'signup':
        return <SignUpScreen onSignIn={handleSignIn} onBack={handleBackToWelcome} />;
      case 'signin':
        return <LoginScreen onCreateAccount={handleCreateAccount} onBack={handleBackToWelcome} onLoginSuccess={handleLoginSuccess} />;
      case 'home':
        return <HomeScreen onLogout={handleLogout} />;
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
