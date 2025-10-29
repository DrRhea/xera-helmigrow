import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';

export interface BottomNavItem {
  id: number;
  iconImage: any;
  label: string;
  active: boolean;
}

interface BottomNavbarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const BottomNavbar: React.FC<BottomNavbarProps> = ({ currentScreen, onNavigate }) => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const getActiveScreen = (screen: string) => {
    if (screen === 'diari') {
      return 'konten'; // Diari Anak adalah bagian dari Konten
    }
    return screen;
  };

  const activeScreen = getActiveScreen(currentScreen);

  const bottomNavItems: BottomNavItem[] = [
    { id: 1, iconImage: require('../assets/icon navigasi/icon-home.png'), label: 'Home', active: activeScreen === 'home' },
    { id: 2, iconImage: require('../assets/icon navigasi/icon-konten.png'), label: 'Konten', active: activeScreen === 'konten' },
    { id: 3, iconImage: require('../assets/icon navigasi/icon-chat-dokter.png'), label: 'Chat Dokter', active: activeScreen === 'chat' },
    { id: 4, iconImage: require('../assets/icon navigasi/icon-transaksi.png'), label: 'Transaksi', active: activeScreen === 'product' },
    { id: 5, iconImage: require('../assets/icon navigasi/icon-profil.png'), label: 'Profil', active: activeScreen === 'profile' },
  ];

  const handleNavigation = (item: BottomNavItem) => {
    switch (item.id) {
      case 1: // Home
        onNavigate('home');
        break;
      case 2: // Konten
        onNavigate('konten');
        break;
      case 3: // Chat Dokter
        onNavigate('chat');
        break;
      case 4: // Transaksi
        onNavigate('product');
        break;
      case 5: // Profil
        onNavigate('profile');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.bottomNavigation}>
      {bottomNavItems.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          style={styles.navItem}
          onPress={() => handleNavigation(item)}
          activeOpacity={0.7}
        >
          <View style={styles.navIcon}>
            <Image
              source={item.iconImage}
              style={[
                styles.navIconImage,
                item.id === 3 ? styles.chatDoctorIcon : null,
                item.active ? styles.activeIcon : styles.inactiveIcon
              ]}
              resizeMode="contain"
            />
          </View>
          <Text style={[
            styles.navLabel,
            item.active ? styles.activeLabel : styles.inactiveLabel
          ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFF5F5',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
    boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    marginBottom: 4,
  },
  navIconImage: {
    width: 32,
    height: 32,
  },
  chatDoctorIcon: {
    width: 40,
    height: 40,
  },
  activeIcon: {
    opacity: 1,
  },
  inactiveIcon: {
    opacity: 0.6,
  },
  navLabel: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginTop: 2,
  },
  activeLabel: {
    color: '#3FB2E6',
    fontWeight: '600',
  },
  inactiveLabel: {
    color: '#666666',
  },
});

export default BottomNavbar;
