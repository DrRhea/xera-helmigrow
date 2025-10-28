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
import VideoPlayerScreen from './VideoPlayerScreen';

const { width, height } = Dimensions.get('window');

interface KontenScreenProps {
  onBack: () => void;
}

const KontenScreen: React.FC<KontenScreenProps> = ({ onBack }) => {
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  // Helper function to get video source
  const getVideoSource = (videoName: string) => {
    // Use local video files from assets (now in .mp4 format)
    try {
      switch(videoName) {
        case 'tapuakambaiambai':
          return require('../assets/konten-manjujai/tapuakambaiambai.mp4');
        case 'cari-mainan':
          return require('../assets/konten-manjujai/cari-mainan.mp4');
        case 'stimulasi-berdiri':
          return require('../assets/konten-manjujai/stimulasi-berdiri.mp4');
        case 'stimulasi-bahasa':
          return require('../assets/konten-manjujai/stimulasi-bahasa.mp4');
        case 'ciluk-ba':
          return require('../assets/konten-manjujai/ciluk-ba.mp4');
        case 'tangkap-bola-motorik':
          return require('../assets/konten-manjujai/tangkap-bola-motorik.mp4');
        case 'nyanyian-tidur':
          return require('../assets/konten-manjujai/nyanyian-tidur.mp4');
        default:
          return require('../assets/konten-manjujai/tapuakambaiambai.mp4');
      }
    } catch (error) {
      console.log('Error loading local video:', error);
      // Fallback to first video
      return require('../assets/konten-manjujai/tapuakambaiambai.mp4');
    }
  };

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleVideoPress = (video: any) => {
    setSelectedVideo(video);
    setShowVideoPlayer(true);
  };

  const handleBackFromVideo = () => {
    setShowVideoPlayer(false);
    setSelectedVideo(null);
  };

  const contentData = [
    {
      id: 1,
      title: 'Tapuak ambai-ambai',
      description: 'untuk menstimulasi aspek bahasa (anak belajar kata-kata baru dari nyanyian), sosial emosial (meningkatkan ikatan orang tua dan ekspresi emosi anak)',
      tag: 'Manjujai',
      viewCount: '254x Ditonton',
      videoSource: getVideoSource('tapuakambaiambai'),
    },
    {
      id: 2,
      title: 'Mencari mainan',
      description: 'untuk menstimulasi aspek kognitif (melatih fokus dan pemecahan masalah pada anak), motorik halus (melatih koordinasi tangan dan mata saat mengambil mainan)',
      tag: 'Manjujai',
      viewCount: '189x Ditonton',
      videoSource: getVideoSource('cari-mainan'),
    },
    {
      id: 3,
      title: 'Ayo berdiri',
      description: 'untuk menstimulasi aspek motorik kasar (meningkatkan kekuatan kaki dan keseimbangan), sosial emosional (meningkatkan rasa percaya diri saat berhasil berdiri)',
      tag: 'Manjujai',
      viewCount: '312x Ditonton',
      videoSource: getVideoSource('stimulasi-berdiri'),
    },
    {
      id: 4,
      title: 'Buku pertamaku',
      description: 'untuk menstimulasi aspek bahasa (meningkatkan kosa kata anak), kognitif (meningkatkan pemahaman terhadap objek gambar)',
      tag: 'Manjujai',
      viewCount: '145x Ditonton',
      videoSource: getVideoSource('stimulasi-bahasa'),
    },
    {
      id: 5,
      title: 'Ciluk ba',
      description: 'untuk menstimulasi aspek sosial emosional (mengajarkan konsep keterikatan dan interaksi sosial), kognitif (memahami konsep hilang-muncul)',
      tag: 'Manjujai',
      viewCount: '278x Ditonton',
      videoSource: getVideoSource('ciluk-ba'),
    },
    {
      id: 6,
      title: 'Ayo tangkap bola',
      description: 'untuk menstimulasi motorik kasar (melatih refleks dan keseimbangan anak), kognitif (meningkatkan fokus serta koordinasi mata dan tangan)',
      tag: 'Manjujai',
      viewCount: '201x Ditonton',
      videoSource: getVideoSource('tangkap-bola-motorik'),
    },
    {
      id: 7,
      title: 'Nyanyian sebelum tidur',
      description: 'menstimulasi growt hormon (hormon pertumbuhan) dan menurunkan hormon kortisol (stres pada anak) sehingga dapat meningkatkan status gizi anak.',
      tag: 'Manjujai',
      viewCount: '423x Ditonton',
      videoSource: getVideoSource('nyanyian-tidur'),
    },
  ];

  const renderContentCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.contentCard}
      onPress={() => handleVideoPress(item)}
    >
      <View style={styles.cardImageContainer}>
        <View style={styles.videoPlaceholder}>
          <Ionicons name="play-circle" size={32} color="#FF6B9D" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <View style={styles.viewCountContainer}>
          <Ionicons name="videocam" size={16} color="#FF6B9D" />
          <Text style={styles.viewCountText}>{item.viewCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (showVideoPlayer) {
    return (
      <VideoPlayerScreen 
        onBack={handleBackFromVideo}
        onHome={onBack}
        videoData={selectedVideo}
      />
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
        <Text style={styles.headerTitle}>Konten Edukasi</Text>
      </View>

      {/* Content List */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={contentData}
          renderItem={renderContentCard}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
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
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  contentCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  tagContainer: {
    backgroundColor: '#FF6B9D',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  tagText: {
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333333',
    marginBottom: 6,
    lineHeight: 18,
  },
  cardDescription: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    marginBottom: 8,
    lineHeight: 16,
  },
  viewCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewCountText: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#333333',
    marginLeft: 4,
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
  navLabel: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    textAlign: 'center',
    marginTop: 2,
  },
});

export default KontenScreen;
