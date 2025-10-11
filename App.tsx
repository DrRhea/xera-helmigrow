import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './components/SplashScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Selamat Datang di HelmiGrowth!</Text>
      <Text style={styles.subText}>Aplikasi untuk pertumbuhan dan perkembangan</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
