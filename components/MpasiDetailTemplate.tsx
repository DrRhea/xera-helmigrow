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
import { getRecipesByAge, MpasiRecipe } from '../data/mpasiData';

const { width, height } = Dimensions.get('window');

interface MpasiDetailTemplateProps {
  onBack: () => void;
  ageRange: string;
  cardTitle: string;
  cardSubtitle: string;
}

const MpasiDetailTemplate: React.FC<MpasiDetailTemplateProps> = ({ 
  onBack, 
  ageRange, 
  cardTitle, 
  cardSubtitle 
}) => {
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

  // Get data for specified age group
  const ageGroupData = getRecipesByAge(ageRange);
  const currentImage = selectedRecipe ? selectedRecipe.dataImages[0] : ageGroupData?.placeholderImage;
  const scrollableImages = selectedRecipe?.scrollableDataImages || [];
  
  // Debug log
  console.log('Selected Recipe:', selectedRecipe?.title);
  console.log('Scrollable Images:', scrollableImages.length);

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
          <Text style={styles.ratingText}>5</Text>
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
          <Image
            source={require('../assets/icons/back-icon.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail MPASI</Text>
      </View>

      {/* MPASI Card */}
      <View style={styles.mpasiCard}>
        <View style={styles.cardContent}>
          <View style={styles.cardIcon}>
            <Ionicons name="restaurant" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>{cardTitle}</Text>
            <Text style={styles.cardSubtitle}>{cardSubtitle}</Text>
          </View>
        </View>
      </View>

      {/* Recipe Carousel */}
      <View style={styles.carouselContainer}>
        <FlatList
          data={ageGroupData?.recipes || []}
          renderItem={renderRecipeCard}
          keyExtractor={(item) => item.id.toString()}
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
            {/* Scrollable Data Images */}
            {scrollableImages.length > 0 && (
              <View style={styles.scrollableImagesContainer}>
                {scrollableImages.map((image, index) => {
                  console.log('Rendering scrollable image:', index, image);
                  return (
                    <Image
                      key={index}
                      source={image}
                      style={styles.scrollableImage}
                      resizeMode="contain"
                      onError={(error) => console.log('Image load error:', error)}
                    />
                  );
                })}
              </View>
            )}
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
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
  },
  mpasiCard: {
    backgroundColor: '#4A90E2',
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 16,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.1)',
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
  },
  carouselContainer: {
    paddingVertical: 16,
    backgroundColor: '#FFF5F5',
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
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
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
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
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
    paddingBottom: 80,
  },
  mpasiProfileSection: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
  },
  imageContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  mpasiProfileImage: {
    width: '100%',
    height: height * 0.6, // Make image larger, 60% of screen height
  },
  scrollableImagesContainer: {
    marginTop: 10,
    width: '100%',
  },
  scrollableImage: {
    width: '100%',
    height: height * 0.6,
    marginBottom: 10,
    borderRadius: 10,
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
  navIconImage: {
    width: 32,
    height: 32,
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
});

export default MpasiDetailTemplate;
