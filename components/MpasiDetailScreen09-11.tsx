import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { mpasiData, MpasiRecipe } from '../data/mpasiData';

const { width, height } = Dimensions.get('window');

interface MpasiDetailScreen0911Props {
  onBack: () => void;
}

const MpasiDetailScreen0911: React.FC<MpasiDetailScreen0911Props> = ({ onBack }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<MpasiRecipe | null>(null);
  
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Get data for 9-11 bulan age group
  const ageGroupData = mpasiData.find(data => data.ageGroup === '9-11 bulan');
  const currentImage = selectedRecipe ? selectedRecipe.dataImages[0] : ageGroupData?.profileImage;

  const handleRecipePress = (recipe: MpasiRecipe) => {
    setSelectedRecipe(recipe);
  };

  const renderRecipeCard = ({ item }: { item: MpasiRecipe }) => (
    <TouchableOpacity 
      style={styles.recipeCard}
      onPress={() => handleRecipePress(item)}
    >
      <View style={styles.recipeImageContainer}>
        <Image source={item.thumbnail} style={styles.recipeImage} />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <Text style={styles.recipeSubtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.fullScreenContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <View style={styles.backButtonCircle}>
            <Ionicons name="arrow-back" size={20} color="#000000" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail MPASI</Text>
      </View>

      {/* Main Action Button */}
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionButtonContent}>
            <Ionicons name="restaurant" size={24} color="#FFFFFF" />
            <View style={styles.actionButtonText}>
              <Text style={styles.actionButtonTitle}>Kebutuhan MP-ASI</Text>
              <Text style={styles.actionButtonSubtitle}>Usia 09 - 11 Bulan</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Recipe Carousel */}
      <View style={styles.carouselContainer}>
        <FlatList
          data={ageGroupData?.recipes || []}
          renderItem={renderRecipeCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContent}
        />
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* MPASI Profile Section */}
        <View style={styles.mpasiProfileSection}>
          <View style={styles.imageContainer}>
            <Image
              source={currentImage}
              style={styles.mpasiProfileImage}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={onBack}
        >
          <View style={styles.navIcon}>
            <Ionicons name="home" size={24} color="#FF0000" />
          </View>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={onBack}
        >
          <View style={styles.navIcon}>
            <Ionicons name="list" size={24} color="#FF0000" />
          </View>
          <Text style={styles.navLabel}>Konten</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={onBack}
        >
          <View style={styles.navIcon}>
            <Ionicons name="medical" size={24} color="#87CEEB" />
          </View>
          <Text style={styles.navLabel}>Chat Dokter</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={onBack}
        >
          <View style={styles.navIcon}>
            <Ionicons name="card" size={24} color="#FF0000" />
          </View>
          <Text style={styles.navLabel}>Transaksi</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={onBack}
        >
          <View style={styles.navIcon}>
            <Ionicons name="person" size={24} color="#FF0000" />
          </View>
          <Text style={styles.navLabel}>Profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FFF5F5',
  },
  backButton: {
    padding: 5,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
    marginLeft: 16,
  },
  actionButtonContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    marginLeft: 15,
  },
  actionButtonTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  actionButtonSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
  },
  carouselContainer: {
    marginBottom: 20,
  },
  carouselContent: {
    paddingHorizontal: 20,
  },
  recipeCard: {
    width: 160,
    height: 200,
    marginRight: 15,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  recipeImageContainer: {
    position: 'relative',
    height: '70%',
  },
  recipeImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333333',
    marginLeft: 2,
  },
  recipeInfo: {
    padding: 12,
    height: '30%',
    justifyContent: 'center',
  },
  recipeTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginBottom: 2,
  },
  recipeSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  mpasiProfileSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  mpasiProfileImage: {
    width: '100%',
    height: height * 0.6, // Make image larger, 60% of screen height
  },
  bottomSpacing: {
    height: 20,
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
  navLabel: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    textAlign: 'center',
  },
});

export default MpasiDetailScreen0911;