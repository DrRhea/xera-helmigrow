import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
// import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { artikelData, ArtikelData } from '../data/artikelData';
import BottomNavbar from './BottomNavbar';

const { width, height } = Dimensions.get('window');

interface ArtikelScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

const ArtikelScreen: React.FC<ArtikelScreenProps> = ({ onBack, onNavigate }) => {
  const [showArticleContent, setShowArticleContent] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArtikelData | null>(null);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleReadArticle = (article: ArtikelData) => {
    setSelectedArticle(article);
    setShowArticleContent(true);
  };

  // Menggunakan data dari file artikelData.ts

  const renderArtikelCard = (item: any) => (
    <TouchableOpacity key={item.id} style={styles.artikelCard} onPress={() => handleReadArticle(item)}>
      <LinearGradient
        colors={['#FFFFFF', '#FFF5F5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        {/* Content */}
        <View style={styles.cardContent}>
          <Text style={styles.artikelTitle}>{item.title}</Text>
        </View>

        {/* Read More Button */}
        <TouchableOpacity 
          style={styles.readMoreButton}
          onPress={() => handleReadArticle(item)}
        >
          <LinearGradient
            colors={['#FF6B9D', '#F267A0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.readMoreGradient}
          >
            <Text style={styles.readMoreText}>Baca Selengkapnya</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );

  // Tampilkan konten artikel jika showArticleContent true
  if (showArticleContent) {
    return (
      <View style={styles.container}>
        {/* Header untuk konten artikel */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => setShowArticleContent(false)}>
            <View style={styles.backButtonCircle}>
              <Ionicons name="arrow-back" size={20} color="#000000" />
            </View>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{selectedArticle?.title || 'Artikel'}</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Konten Artikel */}
        <ScrollView style={styles.articleContentContainer}>
          <View style={styles.articleContent}>
            {/* Article Header */}
            <View style={styles.articleHeader}>
              <Text style={styles.articleTitle}>{selectedArticle?.title}</Text>
              <View style={styles.articleMeta}>
                <Text style={styles.articleAuthor}>Oleh: {selectedArticle?.author}</Text>
              </View>
            </View>
            
            {/* Article Content */}
            <Text style={styles.articleText}>{selectedArticle?.content}</Text>
          </View>
        </ScrollView>
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
        <Text style={styles.headerTitle}>Artikel Edukasi</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#FF6B9D" />
        </TouchableOpacity>
      </View>

      {/* Banner Section */}
      <LinearGradient
        colors={['#FF6B9D', '#F267A0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <View style={styles.bannerIcon}>
            <Ionicons name="library" size={32} color="#FFFFFF" />
          </View>
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>Artikel Terbaru</Text>
            <Text style={styles.bannerSubtitle}>Tips & panduan untuk tumbuh kembang anak</Text>
          </View>
        </View>
      </LinearGradient>


      {/* Artikel List */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {artikelData.map(renderArtikelCard)}
        
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      {onNavigate && <BottomNavbar currentScreen="konten" onNavigate={onNavigate} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FFF5F5',
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
    flex: 1,
    textAlign: 'center',
  },
  searchButton: {
    padding: 8,
  },
  banner: {
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerIcon: {
    marginRight: 15,
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  artikelCard: {
    marginBottom: 16,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardGradient: {
    padding: 16,
  },
  cardContent: {
    marginBottom: 16,
  },
  artikelTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginBottom: 12,
    lineHeight: 22,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
  },
  readMoreGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  readMoreText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    marginRight: 6,
  },
  bottomSpacing: {
    height: 100,
  },
  articleContentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  articleContent: {
    paddingVertical: 20,
  },
  articleText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    lineHeight: 24,
  },
  articleHeader: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  articleTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
    marginBottom: 10,
    lineHeight: 28,
  },
  articleMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articleAuthor: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#FF6B9D',
  },
});

export default ArtikelScreen;
