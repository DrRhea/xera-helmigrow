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
import { Video, ResizeMode } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import VideoPlayerScreen from './VideoPlayerScreen';
import BottomNavbar from './BottomNavbar';

const { width, height } = Dimensions.get('window');

interface KontenScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

const KontenScreen: React.FC<KontenScreenProps> = ({ onBack, onNavigate }) => {
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

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
      title: 'Tapuak Ambai-Ambai',
      description: 'Tapuak ambai-ambai untuk menstimulasi aspek bahasa (anak belajar kata-kata baru dari nyanyian), sosial emosial (meningkatkan ikatan orang tua dan ekspresi emosi anak)',
      tag: 'Edukasi',
      videoPath: require('../assets/video/video-1.mp4'),
    },
    {
      id: 2,
      title: 'Mencari Mainan',
      description: 'Mencari mainan untuk menstimulasi aspek kognitif (melatih fokus dan pemecahan masalah pada anak), motorik halus (melatih koordinasi tangan dan mata saat mengambil mainan)',
      tag: 'Edukasi',
      videoPath: require('../assets/video/video-2.mp4'),
    },
    {
      id: 3,
      title: 'Ayo Berdiri',
      description: 'Ayo berdiri untuk menstimulasi aspek motorik kasar (meningkatkan kekuatan kaki dan keseimbangan), sosial emosional (meningkatkan rasa percaya diri saat berhasil berdiri)',
      tag: 'Edukasi',
      videoPath: require('../assets/video/video-3.mp4'),
    },
    {
      id: 4,
      title: 'Buku Pertamaku',
      description: 'Buku pertamaku untuk menstimulasi aspek bahasa (meningkatkan kosa kata anak), kognitif (meningkatkan pemahaman terhadap objek gambar)',
      tag: 'Edukasi',
      videoPath: require('../assets/video/video-4.mp4'),
    },
    {
      id: 5,
      title: 'Ciluk Ba',
      description: 'Ciluk ba untuk menstimulasi aspek sosial emosional (mengajarkan konsep keterikatan dan interaksi sosial), kognitif (memahami konsep hilang-muncul)',
      tag: 'Edukasi',
      videoPath: require('../assets/video/video-5.mp4'),
    },
    {
      id: 6,
      title: 'Ayo Tangkap Bola',
      description: 'Ayo tangkap bola untuk menstimulasi motorik kasar (melatih refleks dan keseimbangan anak), kognitif (meningkatkan fokus serta koordinasi mata dan tangan)',
      tag: 'Edukasi',
      videoPath: require('../assets/video/video-6.mp4'),
    },
    {
      id: 7,
      title: 'Nyanyian Sebelum Tidur',
      description: 'Nyanyian sebelum tidur menstimulasi growt hormon (hormon pertumbuhan) dan menurunkan hormon kortisol (stres pada anak) sehingga dapat meningkatkan status gizi anak',
      tag: 'Edukasi',
      videoPath: require('../assets/video/video-7.mp4'),
    },
  ];

  const renderContentCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.contentCard}
      onPress={() => handleVideoPress(item)}
    >
      <View style={styles.cardImageContainer}>
        <View style={styles.videoThumbnail}>
          <Video
            source={item.videoPath}
            style={styles.thumbnailVideo}
            useNativeControls={false}
            resizeMode={ResizeMode.COVER}
            isLooping={false}
            shouldPlay={false}
            isMuted={true}
          />
          <View style={styles.playOverlay}>
            <View style={styles.playButton}>
              <Ionicons name="play" size={24} color="#FFFFFF" />
            </View>
          </View>
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
      {onNavigate && <BottomNavbar currentScreen="konten" onNavigate={onNavigate} />}
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
  videoThumbnail: {
    width: '100%',
    height: '100%',
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnailVideo: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 107, 157, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  bottomSpacing: {
    height: 100,
  },
});

export default KontenScreen;
