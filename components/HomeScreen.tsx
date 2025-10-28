import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
  Pressable,
  Alert,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AddChildScreen from './AddChildScreen';
import ImunisasiScreen from './ImunisasiScreen';
import ResepMpasiScreen from './ResepMpasiScreen';
import ChatDoctorScreen from './ChatDoctorScreen';
import KontenScreen from './KontenScreen';
import ChildProfileScreen from './ChildProfileScreen';
import GrowthChartScreen from './GrowthChartScreen';
import ProductInfoScreen from './ProductInfoScreen';
import DiariAnakScreen from './DiariAnakScreen';
import VideoPlayerScreen from './VideoPlayerScreen';
import ArtikelScreen from './ArtikelScreen';
import ProfileScreen from './ProfileScreen';
import GrowthQuestionnaireScreen from './GrowthQuestionnaireScreen';
import ChildSelectionScreen from './ChildSelectionScreen';
import BottomNavbar from './BottomNavbar';
// import NutritionScreen from './NutritionScreen';
import childrenService, { Child } from '../services/childrenService';
import authService from '../services/authService';
import { productsData, ProductData } from '../data/productsData';

const { width, height } = Dimensions.get('window');

interface HomeScreenProps {
  onLogout: () => void;
  onNavigate?: (screen: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onLogout, onNavigate }) => {
  const [showAddChild, setShowAddChild] = useState(false);
  const [showImunisasi, setShowImunisasi] = useState(false);
  const [showResepMpasi, setShowResepMpasi] = useState(false);
  const [showChatDoctor, setShowChatDoctor] = useState(false);
  const [showKonten, setShowKonten] = useState(false);
  const [showChildProfile, setShowChildProfile] = useState(false);
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const [showGrowthChart, setShowGrowthChart] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [showGrowthQuestionnaire, setShowGrowthQuestionnaire] = useState(false);
  const [showChildSelection, setShowChildSelection] = useState(false);
  const [showProductInfo, setShowProductInfo] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  // const [showNutrition, setShowNutrition] = useState(false);

  // State untuk data anak dari API
  const [childrenData, setChildrenData] = useState<Child[]>([]);
  const [isLoadingChildren, setIsLoadingChildren] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingChildId, setDeletingChildId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [childToDelete, setChildToDelete] = useState<{id: number, name: string} | null>(null);

  // State untuk data user
  const [userData, setUserData] = useState<any>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // State untuk carousel dots
  const [currentPage, setCurrentPage] = useState(0);
  const [featureScrollRef, setFeatureScrollRef] = useState<any>(null);

  const hasChildren = childrenData.length > 0;

  // Function to get time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return 'Selamat pagi';
    } else if (hour >= 12 && hour < 15) {
      return 'Selamat siang';
    } else if (hour >= 15 && hour < 18) {
      return 'Selamat sore';
    } else {
      return 'Selamat malam';
    }
  };

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // Load data from API
  useEffect(() => {
    loadUserData();
    loadChildren();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoadingUser(true);
      const user = await authService.getCurrentUser();
      setUserData(user);
    } catch (err: any) {
      console.error('Failed to load user data:', err);
      // If authentication error, redirect to welcome
      if (err.response?.status === 401) {
        onLogout();
        return;
      }
      // Don't set error for user data, just use default
    } finally {
      setIsLoadingUser(false);
    }
  };

  const loadChildren = async () => {
    try {
      setIsLoadingChildren(true);
      setError(null);
      
      const children = await childrenService.getChildren();
      setChildrenData(children);
    } catch (err: any) {
      console.error('Failed to load children:', err);
      // If authentication error, redirect to welcome
      if (err.response?.status === 401) {
        onLogout();
        return;
      }
      setError(err.message || 'Gagal memuat data anak');
    } finally {
      setIsLoadingChildren(false);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  const handleDeleteChild = (childId: number, childName: string) => {
    setChildToDelete({ id: childId, name: childName });
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setChildToDelete(null);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    if (childToDelete) {
      performDelete(childToDelete.id, childToDelete.name);
    }
    setChildToDelete(null);
  };

  const performDelete = async (childId: number, childName: string) => {
    try {
      setDeletingChildId(childId);
      
      await childrenService.deleteChild(childId);
      
      await loadChildren();
      
      Alert.alert('Berhasil', 'Profil anak berhasil dihapus');
    } catch (error: any) {
      let errorMessage = 'Gagal menghapus profil anak';
      if (error.response?.status === 401) {
        errorMessage = 'Sesi Anda telah berakhir. Silakan login kembali.';
      } else if (error.response?.status === 404) {
        errorMessage = 'Data anak tidak ditemukan.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Terjadi kesalahan server. Silakan coba lagi.';
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setDeletingChildId(null);
    }
  };

  const handleAddChild = () => {
    setShowAddChild(true);
  };

  const handleBackFromAddChild = () => {
    setShowAddChild(false);
  };

  const handleSaveChild = async () => {
    setShowAddChild(false);
    // Reload children data after adding new child
    await loadChildren();
  };

  const handleImunisasi = () => {
    setShowImunisasi(true);
  };

  const handleBackFromImunisasi = () => {
    setShowImunisasi(false);
  };

  const handleResepMpasi = () => {
    setShowResepMpasi(true);
  };

  const handleBackFromResepMpasi = () => {
    setShowResepMpasi(false);
  };

  const handleChatDoctor = () => {
    setShowChatDoctor(true);
  };

  const handleBackFromChatDoctor = () => {
    setShowChatDoctor(false);
  };

  const handleKonten = () => {
    setShowKonten(true);
  };

  const handleBackFromKonten = () => {
    setShowKonten(false);
  };

  const handleChildProfile = (child: any) => {
    setSelectedChild(child);
    setShowChildProfile(true);
  };

  const handleBackFromChildProfile = () => {
    setShowChildProfile(false);
    setSelectedChild(null);
  };

  const handleGrowthChart = () => {
    setShowGrowthChart(true);
  };

  const handleBackFromGrowthChart = () => {
    setShowGrowthChart(false);
  };

  const handleManjujaiVideo = () => {
    setShowVideoPlayer(true);
  };

  const handleBackFromVideoPlayer = () => {
    setShowVideoPlayer(false);
  };

  const handleArtikel = () => {
    if (onNavigate) {
      onNavigate('konten');
    }
  };

  const handleProductInfo = () => {
    if (onNavigate) {
      onNavigate('product');
    }
  };

  const handleDiariAnak = () => {
    if (onNavigate) {
      onNavigate('diari');
    }
  };

  const handleProfile = () => {
    if (onNavigate) {
      onNavigate('profile');
    }
  };

  const handleProductDetail = (product: ProductData) => {
    setSelectedProduct(product);
    setShowProductInfo(true);
  };

  const handleBackFromProductInfo = () => {
    setShowProductInfo(false);
    setSelectedProduct(null);
  };

  const handleBackFromGrowthQuestionnaire = () => {
    setShowGrowthQuestionnaire(false);
    setSelectedChild(null);
  };

  const handleTumbuhKembang = () => {
    if (childrenData.length === 0) {
      // Tidak ada anak, tidak bisa melakukan kuesioner
      return;
    } else if (childrenData.length === 1) {
      // Hanya 1 anak, langsung buka kuesioner
      setSelectedChild(childrenData[0]);
      setShowGrowthQuestionnaire(true);
    } else {
      // Lebih dari 1 anak, tampilkan pilihan anak
      setShowChildSelection(true);
    }
  };

  const handleBackFromChildSelection = () => {
    setShowChildSelection(false);
  };

  // Handler untuk scroll feature icons
  const handleFeatureScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageWidth = 88; // Width of each feature icon (72 + 16 margin)
    const currentPageIndex = Math.round(contentOffsetX / pageWidth);
    setCurrentPage(currentPageIndex);
  };

  // Handler untuk klik dots
  const handleDotPress = (pageIndex: number) => {
    if (featureScrollRef) {
      const pageWidth = 88; // Width of each feature icon (72 + 16 margin)
      featureScrollRef.scrollTo({
        x: pageIndex * pageWidth,
        animated: true,
      });
    }
  };


  // const handleNutrition = () => {
  //   if (childrenData.length === 0) {
  //     // Tidak ada anak, tidak bisa melihat status gizi
  //     return;
  //   } else if (childrenData.length === 1) {
  //     // Hanya 1 anak, langsung buka status gizi
  //     setSelectedChild(childrenData[0]);
  //     setShowNutrition(true);
  //   } else {
  //     // Lebih dari 1 anak, tampilkan pilihan anak
  //     setShowChildSelection(true);
  //   }
  // };

  // const handleBackFromNutrition = () => {
  //   setShowNutrition(false);
  //   setSelectedChild(null);
  // };

  if (showAddChild) {
    return (
      <AddChildScreen 
        onBack={handleBackFromAddChild}
        onSave={handleSaveChild}
      />
    );
  }

  if (showImunisasi) {
    return (
      <ImunisasiScreen 
        onBack={handleBackFromImunisasi}
      />
    );
  }

  if (showResepMpasi) {
    return (
      <ResepMpasiScreen 
        onBack={handleBackFromResepMpasi}
      />
    );
  }

  if (showChatDoctor) {
    return (
      <ChatDoctorScreen 
        onBack={handleBackFromChatDoctor}
      />
    );
  }

  if (showKonten) {
    return (
      <KontenScreen 
        onBack={handleBackFromKonten}
      />
    );
  }

  if (showChildProfile && selectedChild) {
    return (
      <ChildProfileScreen 
        onBack={handleBackFromChildProfile} 
        childData={selectedChild} 
      />
    );
  }

  if (showGrowthChart) {
    return (
      <GrowthChartScreen 
        onBack={handleBackFromGrowthChart}
      />
    );
  }

  if (showVideoPlayer) {
    return (
      <VideoPlayerScreen 
        onBack={handleBackFromVideoPlayer}
        onHome={handleBackFromVideoPlayer}
        videoData={{
          id: 1,
          title: 'Video Edukasi Manjujai',
          description: 'Video edukasi Manjujai oleh Elfifa Nia',
          tag: 'Manjujai',
          viewCount: '254x Ditonton',
          duration: '5:00',
          currentTime: '0:00',
        }}
      />
    );
  }

  if (showGrowthQuestionnaire && selectedChild) {
    return (
      <GrowthQuestionnaireScreen 
        onBack={handleBackFromGrowthQuestionnaire}
        childData={selectedChild}
      />
    );
  }

  // if (showNutrition && selectedChild) {
  //   return (
  //     <NutritionScreen 
  //       onBack={handleBackFromNutrition}
  //       childData={selectedChild}
  //     />
  //   );
  // }

  if (showChildSelection) {
    return (
      <ChildSelectionScreen 
        onBack={handleBackFromChildSelection}
        children={childrenData}
        onSelectChild={(child) => {
          setSelectedChild(child);
          setShowChildSelection(false);
          setShowGrowthQuestionnaire(true);
        }}
        // onSelectChildForNutrition={(child) => {
        //   setSelectedChild(child);
        //   setShowChildSelection(false);
        //   setShowNutrition(true);
        // }}
      />
    );
  }

  if (showProductInfo && selectedProduct) {
    return (
      <ProductInfoScreen 
        onBack={handleBackFromProductInfo}
        onNavigate={onNavigate}
        initialProduct={selectedProduct}
      />
    );
  }

  const featureIcons = [
    { id: 1, icon: require('../assets/icons/jadwal-imunisasi.png'), label: 'Jadwal Imuninasi' },
    { id: 2, icon: require('../assets/icons/resep-mpasi.png'), label: 'Resep MPASI' },
    { id: 3, icon: require('../assets/icons/grafik-tumbuhi.png'), label: 'Grafik Tumbuhi' },
    { id: 4, icon: require('../assets/icons/tahap-kembang.png'), label: 'Tahap Kembang' },
    { id: 5, icon: require('../assets/icons/artikel.png'), label: 'Artikel' },
    { id: 6, icon: require('../assets/icons/info-produk.png'), label: 'Info Produk' },
    { id: 7, icon: require('../assets/icons/diari-anak.png'), label: 'Diari Anak' },
        // { id: 8, icon: require('../assets/icons/nutrition.png'), label: 'Status Gizi' },
  ];

  // Menampilkan semua produk, bukan hanya 2 produk
  const allProducts = productsData;

  const renderFeatureIcon = ({ item }: { item: any }) => (
    <Pressable 
      style={({ pressed }) => [
        styles.featureIconContainer,
        pressed && { opacity: 0.7 }
      ]}
      onPress={() => {
        if (item.id === 1) { // Jadwal Imuninasi
          handleImunisasi();
        } else if (item.id === 2) { // Resep MPASI
          handleResepMpasi();
        } else if (item.id === 3) { // Grafik Tumbuhi
          handleGrowthChart();
        } else if (item.id === 4) { // Tahap Kembang
          handleTumbuhKembang();
        } else if (item.id === 6) { // Info Produk
          handleProductInfo();
        } else if (item.id === 7) { // Diari Anak
          handleDiariAnak();
        } else if (item.id === 5) { // Artikel
          handleArtikel();
        }
        // } else if (item.id === 8) { // Status Gizi
        //   handleNutrition();
        // Add other navigation handlers here for other icons
      }}
    >
      <View style={styles.featureIcon}>
        <Image
          source={item.icon}
          style={styles.featureIconImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.featureLabel}>{item.label}</Text>
    </Pressable>
  );

  const renderContentCard = ({ item }: { item: ProductData }) => (
    <View style={styles.contentCard}>
      <View style={styles.cardImage}>
        <Image
          source={item.image}
          style={styles.cardImagePhoto}
          resizeMode="cover"
        />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDescription}>
          {getProductDescription(item.name)}
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.readMoreButton}
        onPress={() => handleProductDetail(item)}
      >
        <Text style={styles.readMoreText}>Selengkapnya</Text>
      </TouchableOpacity>
    </View>
  );

  const getProductDescription = (productName: string) => {
    switch (productName) {
      case 'Dadiah':
        return 'Makanan Pencegah Stunting';
      case 'ROTI TEPUNG KOMPOSIT':
        return 'Produk Pangan Bergizi';
      case 'Vla Dadih':
        return 'Vla Sehat dan Bergizi';
      case 'Healthy Cookies':
        return 'Kue Sehat untuk Anak';
      case 'Puding Dadih':
        return 'Puding Bergizi dan Lezat';
      case 'Puding Telang':
        return 'Puding dengan Bunga Telang';
      case 'Crust Pie Buah':
        return 'Pie Buah dengan Crust Sehat';
      case 'Salad Buah Vla Dadih':
        return 'Salad Buah dengan Vla Dadih';
      case 'Tepung Dadih Susu Sapi':
        return 'Tepung Dadih dari Susu Sapi';
      default:
        return 'Produk Pangan Bergizi';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require('../assets/logo-helmigrowth-horizontal.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.userButton} onPress={handleProfile}>
              <Ionicons name="person" size={24} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications" size={24} color="#000000" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>1</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Greeting */}
        <Text style={styles.greeting}>
          {isLoadingUser 
            ? 'Hai...' 
            : userData 
              ? `${getTimeBasedGreeting()} ${userData.name}` 
              : 'Hai'
          }
        </Text>

        {/* Child Profile Section */}
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Profil Anak</Text>
        </View>

        {isLoadingChildren ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#87CEEB" />
            <Text style={styles.loadingText}>Memuat data anak...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={loadChildren}>
              <Text style={styles.retryButtonText}>Coba Lagi</Text>
            </TouchableOpacity>
          </View>
        ) : hasChildren ? (
          <View style={styles.childrenListContainer}>
            <View style={styles.childrenList}>
              {childrenData.map((child) => {
                // Calculate age from birth_date
                const birthDate = new Date(child.birth_date);
                const today = new Date();
                const ageInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + 
                                   (today.getMonth() - birthDate.getMonth());
                const years = Math.floor(ageInMonths / 12);
                const months = ageInMonths % 12;
                const ageText = years > 0 ? `${years} Tahun ${months} Bulan` : `${months} Bulan`;

                return (
                  <TouchableOpacity 
                    key={child.id} 
                    style={styles.childListItem}
                    onPress={() => handleChildProfile(child)}
                  >
                    <View style={styles.childListItemContent}>
                      <View style={styles.childAvatarContainer}>
                        {child.profile_image ? (
                          <Image
                            source={{ 
                              uri: child.profile_image.startsWith('data:') 
                                ? child.profile_image 
                                : child.profile_image 
                            }}
                            style={styles.childAvatar}
                            resizeMode="cover"
                          />
                        ) : (
                          <Image
                            source={require('../assets/icons/ikon-bayi.png')}
                            style={styles.childAvatar}
                            resizeMode="contain"
                          />
                        )}
                      </View>
                      <View style={styles.childInfo}>
                        <Text style={styles.childName}>{child.name}</Text>
                        <Text style={styles.childAge}>{ageText}</Text>
                      </View>
                    </View>
                    <View style={styles.childListItemActions}>
                      <TouchableOpacity 
                        style={[
                          styles.deleteChildButton,
                          deletingChildId === child.id && styles.deleteChildButtonLoading
                        ]}
                        onPress={(e) => {
                          e.stopPropagation(); // Prevent triggering parent onPress
                          handleDeleteChild(child.id, child.name);
                        }}
                        disabled={deletingChildId === child.id}
                        activeOpacity={0.7}
                      >
                        {deletingChildId === child.id ? (
                          <ActivityIndicator size="small" color="#FF6B6B" />
                        ) : (
                          <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
                        )}
                      </TouchableOpacity>
                      <Ionicons name="chevron-forward" size={20} color="#666666" />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            <TouchableOpacity style={styles.addChildButton} onPress={handleAddChild}>
              <LinearGradient
                colors={['#F15797', '#FFFDED']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.addChildGradient}
              >
                <Ionicons name="add" size={20} color="#000000" />
                <Text 
                  style={styles.addChildText} 
                  numberOfLines={1} 
                  adjustsFontSizeToFit={true}
                  minimumFontScale={0.8}
                >
                  Tambah Anak
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <LinearGradient
            colors={['#3FB2E6', '#B3E8FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.childProfileCard}
          >
            <View style={styles.childProfileContent}>
              <View style={styles.childIcons}>
                <Image
                  source={require('../assets/icons/ikon-bayi.png')}
                  style={styles.childIconImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.childProfileText}>
                <Text style={styles.childProfileTitle}>Mom Dad belum Punya Profil Anak</Text>
                <TouchableOpacity style={styles.addChildButton} onPress={handleAddChild}>
                  <LinearGradient
                    colors={['#F15797', '#FFFDED']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.addChildGradient}
                  >
                    <Text 
                      style={styles.addChildText} 
                      numberOfLines={1} 
                      adjustsFontSizeToFit={true}
                      minimumFontScale={0.8}
                    >
                      + Tambahkan Anak
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        )}

        {/* Feature Icons */}
        <View style={styles.featureSection}>
          <FlatList
            ref={(ref) => setFeatureScrollRef(ref)}
            data={featureIcons}
            renderItem={renderFeatureIcon}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featureList}
            scrollEnabled={true}
            nestedScrollEnabled={false}
            onScroll={handleFeatureScroll}
            scrollEventThrottle={16}
            pagingEnabled={false}
            decelerationRate="fast"
          />
          <View style={styles.carouselDots}>
            {featureIcons.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dot,
                  currentPage === index && styles.activeDot
                ]}
                onPress={() => handleDotPress(index)}
                activeOpacity={0.7}
              />
            ))}
          </View>
        </View>

        {/* Manjujai Banner */}
        <TouchableOpacity onPress={handleManjujaiVideo}>
          <LinearGradient
            colors={['#F267A0', '#FEF8EB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.manjujaiBanner}
          >
            <View style={styles.manjujaiContent}>
              <View style={styles.manjujaiImage}>
                <Image
                  source={require('../assets/icons/manjujai.png')}
                  style={styles.manjujaiIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.manjujaiText}>
                <Text style={styles.manjujaiTitle}>Manjujai</Text>
                <Text style={styles.manjujaiSubtitle}>Video & Edukasi Manjujai</Text>
              </View>
              <TouchableOpacity style={styles.manjujaiArrow}>
                <Image
                  source={require('../assets/icons/panah-manjujai.png')}
                  style={styles.manjujaiArrowIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Content Carousel */}
        <View style={styles.carouselPlaceholder}>
          <View style={styles.carouselContent}>
            <Image
              source={require('../assets/rumah-gadang-background.png')}
              style={styles.carouselImage}
              resizeMode="cover"
            />
            <View style={styles.carouselOverlay}>
              <Text style={styles.carouselTitle}>Selamat Datang di HelmiGrow</Text>
              <Text style={styles.carouselSubtitle}>Panduan Lengkap Tumbuh Kembang Anak</Text>
            </View>
          </View>
        </View>

        {/* Content Cards */}
        <View style={styles.contentSection}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Info Produk</Text>
          </View>
          <FlatList
            data={allProducts}
            renderItem={renderContentCard}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentList}
          />
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      {onNavigate && <BottomNavbar currentScreen="home" onNavigate={onNavigate} />}

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={styles.modalIconContainer}>
                <Ionicons name="trash-outline" size={32} color="#FF6B6B" />
              </View>
              <Text style={styles.modalTitle}>Hapus Profil Anak</Text>
              <Text style={styles.modalMessage}>
                Apakah Anda yakin ingin menghapus profil {childToDelete?.name}? Tindakan ini tidak dapat dibatalkan.
              </Text>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={handleCancelDelete}
                activeOpacity={0.8}
              >
                <Text style={styles.modalCancelText}>Batal</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={handleConfirmDelete}
                activeOpacity={0.8}
                disabled={deletingChildId === childToDelete?.id}
              >
                <LinearGradient
                  colors={['#FF6B6B', '#FF8E8E']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.modalConfirmGradient}
                >
                  {deletingChildId === childToDelete?.id ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.modalConfirmText}>Hapus</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 120,
    height: 40,
    marginRight: 10,
  },
  userButton: {
    padding: 8,
    marginRight: 8,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  greeting: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitleText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
  },
  childProfileCard: {
    width: width * 0.9, // 90% of screen width for better responsiveness
    minHeight: 100, // Minimum height for better content spacing
    borderRadius: 16, // Slightly larger for modern look
    padding: 16, // Reduced padding for better content fit
    marginBottom: 24, // Consistent spacing
    alignSelf: 'center',
  },
  childProfileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  childIcons: {
    flexDirection: 'row',
    marginRight: 16, // Consistent 16px spacing
  },
  childIconImage: {
    width: 80, // More balanced size
    height: 80, // Square for better proportions
  },
  childProfileText: {
    flex: 1,
  },
  childProfileTitle: {
    fontSize: 13, // Smaller font size to fit better
    fontFamily: 'Poppins_500Medium', // Medium weight for better hierarchy
    color: '#000000',
    marginBottom: 8, // Reduced spacing
    lineHeight: 16, // Reduced line height
  },
  childrenContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  childrenListContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  childrenList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    marginBottom: 12,
  },
  childListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  childListItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  childListItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deleteChildButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 36,
    minHeight: 36,
  },
  deleteChildButtonLoading: {
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    opacity: 0.7,
  },
  childCardContainer: {
    flex: 1,
    marginBottom: 15,
  },
  childCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    minWidth: 120,
  },
  childAvatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  childAvatar: {
    width: 40,
    height: 40,
  },
  childInfo: {
    alignItems: 'flex-start',
    flex: 1,
  },
  childName: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginBottom: 4,
  },
  childAge: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
  },
  addChildButton: {
    height: 40,
    borderRadius: 20,
    alignSelf: 'center',
    overflow: 'hidden',
    minWidth: 160,
  },
  addChildGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  addChildText: {
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
  },
  featureSection: {
    marginBottom: 30,
  },
  featureList: {
    paddingHorizontal: 20,
  },
  featureIconContainer: {
    alignItems: 'center',
    marginRight: 16, // Consistent spacing
    width: 72, // Slightly smaller for better fit
    paddingVertical: 8, // Add padding for better touch area
    paddingHorizontal: 4, // Add padding for better touch area
  },
  featureIcon: {
    width: 56, // Slightly smaller for better proportions
    height: 56,
    borderRadius: 16, // Consistent with card border radius
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIconImage: {
    width: 24,
    height: 24,
  },
  featureLabel: {
    fontSize: 11, // Slightly smaller for better fit
    fontFamily: 'Poppins_500Medium', // Medium weight for better readability
    color: '#000000',
    textAlign: 'center',
    lineHeight: 14, // Better line height
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
    padding: 4, // Menambah area touchable
  },
  activeDot: {
    backgroundColor: '#87CEEB',
    transform: [{ scale: 1.2 }], // Sedikit lebih besar untuk active dot
  },
  manjujaiBanner: {
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  manjujaiContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  manjujaiImage: {
    marginRight: 15,
  },
  manjujaiIcon: {
    width: 60,
    height: 60,
  },
  manjujaiText: {
    flex: 1,
  },
  manjujaiTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    fontStyle: 'italic',
    color: '#000000',
    marginBottom: 5,
  },
  manjujaiSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
  },
  manjujaiArrow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  manjujaiArrowIcon: {
    width: 19.88042536643359,
    height: 19.88042536643359,
  },
  carouselPlaceholder: {
    height: 150,
    marginHorizontal: 20,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
  },
  carouselContent: {
    flex: 1,
    position: 'relative',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  carouselOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  carouselTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  carouselSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  contentSection: {
    marginBottom: 30,
  },
  contentList: {
    paddingHorizontal: 20,
  },
  contentCard: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.1)',
    elevation: 5,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardImage: {
    height: 100,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  cardImagePhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  cardImageEmoji: {
    fontSize: 40,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    marginBottom: 0,
  },
  readMoreButton: {
    backgroundColor: '#87CEEB',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginTop: 'auto',
  },
  readMoreText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 100,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#666',
    marginTop: 10,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: '#87CEEB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#666666',
  },
  modalConfirmButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalConfirmGradient: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalConfirmText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
});

export default HomeScreen;
