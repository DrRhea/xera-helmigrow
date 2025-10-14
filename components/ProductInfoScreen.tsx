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
import { productsData, ProductData } from '../data/productsData';

const { width, height } = Dimensions.get('window');

interface ProductInfoScreenProps {
  onBack: () => void;
}

const ProductInfoScreen: React.FC<ProductInfoScreenProps> = ({ onBack }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Menggunakan data dari file productsData.ts
  
  const handleProductPress = (product: ProductData) => {
    setSelectedProduct(product);
  };

  const handleBackFromDetail = () => {
    setSelectedProduct(null);
  };

  const renderProductCard = ({ item }: { item: ProductData }) => (
    <TouchableOpacity style={styles.productCard} onPress={() => handleProductPress(item)}>
      <View style={styles.productImageContainer}>
        <Image source={item.image} style={styles.productImage} resizeMode="cover" />
      </View>
      <View style={styles.productInfo}>
        <View style={styles.productTag}>
          <Text style={styles.productTagText}>{item.tag}</Text>
        </View>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productShelfLife}>Masa simpan: {item.shelfLife}</Text>
      </View>
    </TouchableOpacity>
  );

  // Render detail produk
  if (selectedProduct) {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackFromDetail}>
            <View style={styles.backButtonCircle}>
              <Ionicons name="arrow-back" size={20} color="#000000" />
            </View>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detail Produk</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Foto Produk */}
          <View style={styles.productDetailImageContainer}>
            <Image source={selectedProduct.image} style={styles.productDetailImage} resizeMode="cover" />
          </View>

          {/* Nama Produk */}
          <View style={styles.productDetailInfo}>
            <Text style={styles.productDetailName}>{selectedProduct.name}</Text>
            <Text style={styles.productDetailShelfLife}>Masa simpan: {selectedProduct.shelfLife}</Text>
          </View>

          {/* Komposisi */}
          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>KOMPOSISI</Text>
            {selectedProduct.composition.map((ingredient, index) => (
              <Text key={index} style={styles.detailItem}>• {ingredient}</Text>
            ))}
          </View>

          {/* Nilai Gizi */}
          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>NILAI GIZI</Text>
            <Text style={styles.detailSubTitle}>Takaran Saji {selectedProduct.nutrition.servingSize}</Text>
            <Text style={styles.detailSubTitle}>{selectedProduct.nutrition.servingsPerPackage}</Text>
            <Text style={styles.detailSubTitle}>Jumlah per sajian</Text>
            <Text style={styles.detailItem}>Energi total: {selectedProduct.nutrition.perServing.totalEnergy}</Text>
            <Text style={styles.detailItem}>Energi dari lemak: {selectedProduct.nutrition.perServing.energyFromFat}</Text>
            <Text style={styles.detailItem}>Lemak total: {selectedProduct.nutrition.perServing.totalFat}</Text>
            <Text style={styles.detailItem}>Protein: {selectedProduct.nutrition.perServing.protein}</Text>
            <Text style={styles.detailItem}>Karbohidrat: {selectedProduct.nutrition.perServing.carbohydrate}</Text>
          </View>

          {/* Harga */}
          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>HARGA JUAL</Text>
            <Text style={styles.detailPrice}>{selectedProduct.price}</Text>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNavigation}>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={handleBackFromDetail}
          >
            <View style={styles.navIcon}>
              <Image
                source={require('../assets/icon navigasi/icon-home.png')}
                style={styles.navIconImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.navLabel}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={handleBackFromDetail}
          >
            <View style={styles.navIcon}>
              <Image
                source={require('../assets/icon navigasi/icon-konten.png')}
                style={styles.navIconImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.navLabel}>Konten</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={handleBackFromDetail}
          >
            <View style={styles.navIcon}>
              <Image
                source={require('../assets/icon navigasi/icon-chat-dokter.png')}
                style={styles.chatDoctorIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.navLabel}>Chat Dokter</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={handleBackFromDetail}
          >
            <View style={styles.navIcon}>
              <Image
                source={require('../assets/icon navigasi/icon-profil.png')}
                style={styles.navIconImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.navLabel}>Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={handleBackFromDetail}
          >
            <View style={styles.navIcon}>
              <Image
                source={require('../assets/icon navigasi/icon-transaksi.png')}
                style={styles.navIconImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.navLabel}>Transaksi</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

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
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIcon}>
            <Image
              source={require('../assets/icon navigasi/icon-konten.png')}
              style={styles.navIconImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.navLabel}>Konten</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIcon}>
            <Image
              source={require('../assets/icon navigasi/icon-chat-dokter.png')}
              style={styles.chatDoctorIcon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.navLabel}>Chat Dokter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIcon}>
            <Image
              source={require('../assets/icon navigasi/icon-transaksi.png')}
              style={styles.navIconImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.navLabel}>Transaksi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIcon}>
            <Image
              source={require('../assets/icon navigasi/icon-profil.png')}
              style={styles.navIconImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.navLabel}>Profil</Text>
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
  productImage: {
    width: '100%',
    height: '100%',
  },
  productTag: {
    backgroundColor: '#FF6B9D',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  productTagText: {
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 5,
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
  navLabel: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    textAlign: 'center',
  },
  chatDoctorIcon: {
    width: 40,
    height: 40,
  },
  navLabel: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    textAlign: 'center',
    marginTop: 2,
  },
  // Detail Product Styles
  productDetailImageContainer: {
    height: 250,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  productDetailImage: {
    width: '100%',
    height: '100%',
  },
  productDetailInfo: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  productDetailName: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
    marginBottom: 8,
  },
  productDetailShelfLife: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
  },
  detailSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  detailSectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
    marginBottom: 15,
  },
  detailSubTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333333',
    marginBottom: 8,
  },
  detailItem: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    marginBottom: 5,
    lineHeight: 20,
  },
  detailPrice: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#FF6B9D',
  },
});

export default ProductInfoScreen;
