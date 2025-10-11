import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import SplashScreen from './components/SplashScreen';
import WelcomeScreen from './components/WelcomeScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  const handleSignUp = () => {
    Alert.alert('Sign Up', 'Sign Up functionality will be implemented soon!');
  };

  const handleSignIn = () => {
    Alert.alert('Sign In', 'Sign In functionality will be implemented soon!');
  };

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <View style={styles.container}>
      <WelcomeScreen onSignUp={handleSignUp} onSignIn={handleSignIn} />
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
