import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import NutritionScreen from './NutritionScreen';
import BottomNavbar from './BottomNavbar';
import { getImageUrl } from '../services/api';
import childrenService from '../services/childrenService';

const { width, height } = Dimensions.get('window');

interface ChildProfileScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
  onChildUpdated?: (updatedChild: any) => void; // Callback untuk update parent
  childData: {
    id: number;
    name: string;
    birth_date: string; // Ubah dari birthDate ke birth_date
    gender: string;
    blood_type?: string;
    allergies?: string[];
    medical_history?: string[];
    profile_image?: string;
    photos?: string[];
  };
}

const ChildProfileScreen: React.FC<ChildProfileScreenProps> = ({ onBack, onNavigate, onChildUpdated, childData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showNutrition, setShowNutrition] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const carouselRef = useRef<FlatList>(null);
  const [editedData, setEditedData] = useState({
    name: childData.name,
    birth_date: childData.birth_date,
    gender: childData.gender,
    blood_type: childData.blood_type || '',
    allergies: childData.allergies || [],
    medical_history: childData.medical_history || [],
  });

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSaveEdit = async () => {
    try {
      setIsLoading(true);
      
      // Prepare data for API
      const updateData = {
        name: editedData.name,
        birth_date: editedData.birth_date,
        gender: editedData.gender as 'Laki-laki' | 'Perempuan',
        blood_type: editedData.blood_type || undefined,
        allergies: editedData.allergies || [],
        medical_history: editedData.medical_history || [],
      };

      // Call API to update child data
      const updatedChild = await childrenService.updateChild(childData.id, updateData);
      
      Alert.alert('Berhasil', 'Data anak berhasil diperbarui');
      setShowEditModal(false);
      
      // Update the childData in parent component
      if (onChildUpdated) {
        onChildUpdated(updatedChild);
      }
      
    } catch (error: any) {
      console.error('Error updating child:', error);
      Alert.alert('Error', error.message || 'Gagal memperbarui data anak');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedData({
      name: childData.name,
      birth_date: childData.birth_date,
      gender: childData.gender,
      blood_type: childData.blood_type || '',
      allergies: childData.allergies || [],
      medical_history: childData.medical_history || [],
    });
    setShowEditModal(false);
  };

  if (showNutrition) {
    return (
      <NutritionScreen 
        onBack={() => setShowNutrition(false)}
        childData={{
          id: childData.id,
          name: childData.name,
          birth_date: childData.birth_date, // Gunakan birth_date yang benar
          gender: childData.gender,
        }}
      />
    );
  }

  // Data carousel gambar anak dari database
  const childImages = childData.photos && childData.photos.length > 0 
    ? childData.photos.map((photo: string, index: number) => ({
        id: index + 1,
        image: photo.startsWith('data:') || photo.startsWith('http') || photo.startsWith('file://')
          ? photo 
          : getImageUrl(photo) || photo,
        isFromDatabase: true,
      }))
    : [
        {
          id: 1,
          image: require('../assets/icons/ikon-bayi.png'),
          isFromDatabase: false,
        },
        {
          id: 2,
          image: require('../assets/icons/ikon-bayi.png'),
          isFromDatabase: false,
        },
        {
          id: 3,
          image: require('../assets/icons/ikon-bayi.png'),
          isFromDatabase: false,
        },
      ];


  const renderCarouselItem = ({ item }: { item: any }) => (
    <View style={styles.carouselItem}>
      <Image
        source={item.isFromDatabase ? { uri: item.image } : item.image}
        style={styles.childImage}
        resizeMode="cover"
        onError={(error) => {
          // Image load error - fallback to default
        }}
      />
    </View>
  );

  const renderCarouselDots = () => {
    // Only show dots if there are multiple images
    if (childImages.length <= 1) return null;
    
    return (
      <View style={styles.carouselDots}>
        {childImages.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              index === currentImageIndex ? styles.activeDot : styles.inactiveDot,
            ]}
            onPress={() => {
              // Scroll to specific image
              carouselRef.current?.scrollToIndex({
                index: index,
                animated: true,
              });
              setCurrentImageIndex(index);
            }}
          />
        ))}
      </View>
    );
  };

  const featureCards = [
    {
      id: 1,
      title: 'Jadwal',
      subtitle: 'Imunisasi Anak',
      icon: 'calendar',
      color: '#4A90E2',
      onPress: () => {
        if (onNavigate) {
          onNavigate('imunisasi');
        }
      },
    },
    {
      id: 2,
      title: 'Pertumbuhan',
      subtitle: 'Anak',
      icon: 'trending-up',
      color: '#FF6B9D',
      onPress: () => {
        if (onNavigate) {
          onNavigate('growth-chart');
        }
      },
    },
    {
      id: 3,
      title: 'Diary',
      subtitle: 'Plan Anak',
      icon: 'book',
      color: '#4CAF50',
      onPress: () => {
        if (onNavigate) {
          onNavigate('diari');
        }
      },
    },
    {
      id: 4,
      title: 'Status Gizi',
      subtitle: 'Anak',
      icon: 'nutrition',
      color: '#FF9800',
      onPress: () => {
        setShowNutrition(true);
      },
    },
  ];

  const renderFeatureCard = ({ item }: { item: any }) => (
    <TouchableOpacity style={[styles.featureCard, { backgroundColor: item.color }]} onPress={item.onPress}>
      <View style={styles.featureCardContent}>
        <Ionicons name={item.icon} size={32} color="#FFFFFF" />
        <Text style={styles.featureCardTitle}>{item.title}</Text>
        <Text style={styles.featureCardSubtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with Pink Gradient */}
      <LinearGradient
        colors={['#FF6B9D', '#FFB3D1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Profil Anak</Text>
          </View>
          
          <TouchableOpacity style={styles.editButton} onPress={() => setShowEditModal(true)}>
            <Ionicons name="create-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.childInfo}>
          <Text style={styles.childName}>{childData.name}</Text>
          <Text style={styles.childDescription}>Profil lengkap anak Anda</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Child Image Carousel */}
        <View style={styles.carouselContainer}>
          <View style={styles.carouselCard}>
            <FlatList
              ref={carouselRef}
              data={childImages}
              renderItem={renderCarouselItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(event) => {
                const index = Math.round(event.nativeEvent.contentOffset.x / (width - 72));
                setCurrentImageIndex(index);
              }}
              onScroll={(event) => {
                const index = Math.round(event.nativeEvent.contentOffset.x / (width - 72));
                if (index >= 0 && index < childImages.length) {
                  setCurrentImageIndex(index);
                }
              }}
              scrollEventThrottle={16}
              style={styles.carousel}
            />
            {renderCarouselDots()}
          </View>
        </View>

        {/* Feature Cards */}
        <View style={styles.featureCardsContainer}>
          <Text style={styles.sectionTitle}>Fitur Utama</Text>
          <FlatList
            data={featureCards}
            renderItem={renderFeatureCard}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featureCardsList}
          />
        </View>

        {/* Perkembangan Card */}
        <View style={styles.perkembanganContainer}>
          <Text style={styles.sectionTitle}>Informasi Perkembangan</Text>
          <View style={styles.perkembanganCard}>
            <View style={styles.perkembanganContent}>
              <View style={styles.perkembanganImageContainer}>
                <Image
                  source={require('../assets/icons/ikon-bayi.png')}
                  style={styles.perkembanganImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.perkembanganTextContainer}>
                <Text style={styles.perkembanganTitle}>Perkembangan Anak</Text>
                <Text style={styles.perkembanganSubtitle}>Stimulasi dan panduan perkembangan berdasarkan usia anak</Text>
                <TouchableOpacity style={styles.moreInfoButton}>
                  <Text style={styles.moreInfoText}>Lihat Detail</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Data Anak</Text>
              <TouchableOpacity onPress={handleCancelEdit}>
                <Ionicons name="close" size={24} color="#666666" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nama Anak</Text>
                <TextInput
                  style={styles.textInput}
                  value={editedData.name}
                  onChangeText={(text) => setEditedData({...editedData, name: text})}
                  placeholder="Masukkan nama anak"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Tanggal Lahir</Text>
                <TextInput
                  style={styles.textInput}
                  value={editedData.birth_date}
                  onChangeText={(text) => setEditedData({...editedData, birth_date: text})}
                  placeholder="YYYY-MM-DD"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Jenis Kelamin</Text>
                <View style={styles.genderContainer}>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      editedData.gender === 'Laki-laki' && styles.genderButtonActive
                    ]}
                    onPress={() => setEditedData({...editedData, gender: 'Laki-laki'})}
                  >
                    <Text style={[
                      styles.genderButtonText,
                      editedData.gender === 'Laki-laki' && styles.genderButtonTextActive
                    ]}>Laki-laki</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      editedData.gender === 'Perempuan' && styles.genderButtonActive
                    ]}
                    onPress={() => setEditedData({...editedData, gender: 'Perempuan'})}
                  >
                    <Text style={[
                      styles.genderButtonText,
                      editedData.gender === 'Perempuan' && styles.genderButtonTextActive
                    ]}>Perempuan</Text>
                  </TouchableOpacity>
                </View>
              </View>


              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Golongan Darah</Text>
                <TextInput
                  style={styles.textInput}
                  value={editedData.blood_type}
                  onChangeText={(text) => setEditedData({...editedData, blood_type: text})}
                  placeholder="A, B, AB, O"
                />
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={handleCancelEdit}
                disabled={isLoading}
              >
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.saveButton, isLoading && styles.saveButtonDisabled]} 
                onPress={handleSaveEdit}
                disabled={isLoading}
              >
                <Text style={styles.saveButtonText}>
                  {isLoading ? 'Menyimpan...' : 'Simpan'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      {onNavigate && <BottomNavbar currentScreen="home" onNavigate={onNavigate} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 0,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: -5,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
  },
  editButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childInfo: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  childName: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  childDescription: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  carouselContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  carouselCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  carousel: {
    height: 180,
  },
  carouselItem: {
    width: width - 72, // Width minus padding
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#4A90E2',
  },
  inactiveDot: {
    backgroundColor: '#E0E0E0',
  },
  featureCardsContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333333',
    marginBottom: 15,
  },
  featureCardsList: {
    paddingRight: 20,
  },
  featureCard: {
    width: 110,
    height: 110,
    borderRadius: 16,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureCardContent: {
    alignItems: 'center',
  },
  featureCardTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
    marginTop: 6,
    marginBottom: 2,
  },
  featureCardSubtitle: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  perkembanganContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  perkembanganCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  perkembanganContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  perkembanganImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
  },
  perkembanganImage: {
    width: '100%',
    height: '100%',
  },
  perkembanganTextContainer: {
    flex: 1,
  },
  perkembanganTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: '#4A90E2',
    marginBottom: 6,
  },
  perkembanganSubtitle: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    marginBottom: 12,
    lineHeight: 18,
  },
  moreInfoButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
    alignSelf: 'flex-start',
  },
  moreInfoText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 100,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    minHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#333333',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    backgroundColor: '#F8F8F8',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  genderButtonActive: {
    backgroundColor: '#FF6B9D',
    borderColor: '#FF6B9D',
  },
  genderButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#666666',
  },
  genderButtonTextActive: {
    color: '#FFFFFF',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#666666',
  },
  saveButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#FF6B9D',
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  saveButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
});

export default ChildProfileScreen;

