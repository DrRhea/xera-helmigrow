import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

const { width, height } = Dimensions.get('window');

interface ProductInfoScreenProps {
  onBack: () => void;
}

const ProductInfoScreen: React.FC<ProductInfoScreenProps> = ({ onBack }) => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Data produk
  const productsData = [
    {
      id: 1,
      name: 'ROTI TEPUNG KOMPOSIT',
      shelfLife: 'Masa simpan : 7 hari - suhu ruang',
      image: require('../assets/icons/ikon-bayi.png'), // Placeholder, bisa diganti dengan gambar produk
      tag: 'Produk',
    },
    {
      id: 2,
      name: 'Vla Dadih',
      shelfLife: 'Masa Simpan : 1 hari - suhu ruang, 3 hari - suhu lemari pendingin',
      image: require('../assets/icons/ikon-bayi.png'), // Placeholder
      tag: 'Produk',
    },
    {
      id: 3,
      name: 'Healthy Cookies',
      shelfLife: 'Masa simpan: 1 bulan - suhu ruang',
      image: require('../assets/icons/ikon-bayi.png'), // Placeholder
      tag: 'Produk',
    },
    {
      id: 4,
      name: 'Puding Dadih',
      shelfLife: 'Masa simpan : 1 hari - suhu ruang, 3 hari - suhu lemari pendingin',
      image: require('../assets/icons/ikon-bayi.png'), // Placeholder
      tag: 'Produk',
    },
    {
      id: 5,
      name: 'Puding Telang',
      shelfLife: 'Masa simpan: 1 hari - suhu ruang, 3 hari - suhu lemari pendingin',
      image: require('../assets/icons/ikon-bayi.png'), // Placeholder
      tag: 'Produk',
    },
    {
      id: 6,
      name: 'Crust Pie Buah',
      shelfLife: 'Masa simpan: 1 hari - suhu ruang, 3 hari - suhu lemari pendingin',
      image: require('../assets/icons/ikon-bayi.png'), // Placeholder
      tag: 'Produk',
    },
    {
      id: 7,
      name: 'Salad Buah Vla Dadih',
      shelfLife: 'Masa simpan: 1 hari - suhu ruang, 3 hari - suhu lemari pendingin',
      image: require('../assets/icons/ikon-bayi.png'), // Placeholder
      tag: 'Produk',
    },
    {
      id: 8,
      name: 'Tepung Dadih Susu Sapi',
      shelfLife: 'Masa simpan: 1 bulan',
      image: require('../assets/icons/ikon-bayi.png'), // Placeholder
      tag: 'Produk',
    },
  ];

  const renderProductCard = ({ item }: { item: any }) => (
    <View style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <View style={styles.productTag}>
          <Text style={styles.productTagText}>{item.tag}</Text>
        </View>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productShelfLife}>{item.shelfLife}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <View style={styles.backButtonCircle}>
            <Ionicons name="arrow-back" size={20} color="#000000" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Info Produk</Text>
      </View>

      {/* Products List */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={productsData}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.productsList}
        />
        
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={onBack}
        >
          <View style={styles.navIcon}>
            <Image
              source={require('../assets/icon navigasi/icon-home.png')}
              style={styles.navIconImage}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIcon}>
            <Image
              source={require('../assets/icon navigasi/icon-konten.png')}
              style={styles.navIconImage}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIcon}>
            <Image
              source={require('../assets/icon navigasi/icon-chat-dokter.png')}
              style={styles.chatDoctorIcon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={[styles.navIcon, styles.activeNavIcon]}>
            <Image
              source={require('../assets/icon navigasi/icon-transaksi.png')}
              style={styles.navIconImage}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIcon}>
            <Image
              source={require('../assets/icon navigasi/icon-profil.png')}
              style={styles.navIconImage}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  productsList: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
    position: 'relative',
    backgroundColor: '#E0E0E0',
  },
  productTag: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#FF6B9D',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  productTagText: {
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginBottom: 6,
    lineHeight: 18,
  },
  productShelfLife: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    lineHeight: 16,
  },
  bottomSpacing: {
    height: 100,
  },
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
  activeNavIcon: {
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    padding: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductInfoScreen;
