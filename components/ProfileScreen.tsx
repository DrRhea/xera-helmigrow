import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import authService from '../services/authService';

const { width, height } = Dimensions.get('window');

interface ProfileScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack, onLogout }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // Load user data from API
  useEffect(() => {
    const loadUserData = async () => {
      try {
        console.log('👤 Loading user profile...');
        const user = await authService.getCurrentUser();
        console.log('✅ User profile loaded:', user);
        setUserData(user);
      } catch (error: any) {
        console.error('❌ Failed to load user profile:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  // Show loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B9D" />
        <Text style={styles.loadingText}>Memuat profil...</Text>
      </View>
    );
  }

  // Show error state
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={64} color="#FF6B9D" />
        <Text style={styles.errorText}>Gagal memuat profil</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => {
          setError(null);
          setIsLoading(true);
          // Reload user data
          authService.getCurrentUser()
            .then(user => {
              setUserData(user);
              setIsLoading(false);
            })
            .catch(err => {
              setError(err.message);
              setIsLoading(false);
            });
        }}>
          <Text style={styles.retryButtonText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Show profile if no user data
  if (!userData) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="person-circle" size={64} color="#FF6B9D" />
        <Text style={styles.errorText}>Data profil tidak ditemukan</Text>
      </View>
    );
  }

  const handleEditProfile = () => {
    Alert.alert('Edit Profil', 'Fitur edit profil akan segera tersedia');
  };

  const handleSettings = () => {
    Alert.alert('Pengaturan', 'Fitur pengaturan akan segera tersedia');
  };

  const handleHelp = () => {
    Alert.alert('Bantuan', 'Fitur bantuan akan segera tersedia');
  };

  const handleAbout = () => {
    Alert.alert('Tentang', 'HelmiGrow v1.0.0\nAplikasi panduan tumbuh kembang anak');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Apakah Anda yakin ingin keluar?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: onLogout,
        },
      ]
    );
  };

  const menuItems = [
    {
      id: 1,
      icon: 'person-outline',
      title: 'Edit Profil',
      subtitle: 'Ubah informasi pribadi',
      onPress: handleEditProfile,
    },
    {
      id: 2,
      icon: 'settings-outline',
      title: 'Pengaturan',
      subtitle: 'Notifikasi, privasi, dll',
      onPress: handleSettings,
    },
    {
      id: 3,
      icon: 'help-circle-outline',
      title: 'Bantuan',
      subtitle: 'FAQ dan dukungan',
      onPress: handleHelp,
    },
    {
      id: 4,
      icon: 'information-circle-outline',
      title: 'Tentang',
      subtitle: 'Versi dan informasi aplikasi',
      onPress: handleAbout,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Ionicons name="create-outline" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <LinearGradient
          colors={['#3FB2E6', '#B3E8FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.profileCard}
        >
          <View style={styles.profileContent}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={40} color="#FFFFFF" />
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userEmail}>{userData.email}</Text>
              <Text style={styles.userPhone}>{userData.phone}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* User Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Anak</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Artikel Dibaca</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Resep Dicoba</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name={item.icon as any} size={24} color="#3FB2E6" />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LinearGradient
            colors={['#FF6B6B', '#FF8E8E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.logoutGradient}
          >
            <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
            <Text style={styles.logoutText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
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
  editButton: {
    padding: 8,
  },
  profileCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#3FB2E6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: '#666666',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 10,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
  },
  logoutButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 20,
  },
  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#666666',
    marginTop: 16,
  },
  // Error styles
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginTop: 16,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    marginTop: 8,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#FF6B9D',
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  // Avatar placeholder
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
