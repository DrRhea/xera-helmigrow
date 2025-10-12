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
      title: 'Tapuak ambai-ambai untuk menstimulasi aspek bahasa',
      description: 'anak belajar kata-kata baru dari nyanyian), sosial emosial',
      tag: 'Xampel',
      viewCount: '254x Ditonton',
    },
    {
      id: 2,
      title: 'Mencari mainan untuk menstimulasi aspek kognitif',
      description: 'melatih fokus dan pemecahan masalah pada anak',
      tag: 'Xampel',
      viewCount: '254x Ditonton',
    },
    {
      id: 3,
      title: 'Ayo berdiri untuk menstimulasi aspek motorik kasar',
      description: 'meningkatkan kekuatan kaki dan keseimbangan',
      tag: 'Xampel',
      viewCount: '254x Ditonton',
    },
    {
      id: 4,
      title: 'Buku pertamaku untuk menstimulasi aspek bahasa',
      description: 'meningkatkan kosa kata anak), kognitif',
      tag: 'Xampel',
      viewCount: '254x Ditonton',
    },
    {
      id: 5,
      title: 'Ciluk ba untuk menstimulasi aspek sosial emosional',
      description: 'mengajarkan konsep keterikatan dan interaksi sosia',
      tag: 'Xampel',
      viewCount: '254x Ditonton',
    },
    {
      id: 6,
      title: 'Ayo tangkap bola untuk menstimulasi motorik kasar',
      description: 'melatih refleks dan keseimbangan anak',
      tag: 'Xampel',
      viewCount: '254x Ditonton',
    },
    {
      id: 7,
      title: 'Nyanyian sebelum tidur menstimulasi growt hormon',
      description: 'hormon pertumbuhan) dan menurunkan hormon kortisol (stres pada anak',
      tag: 'Xampel',
      viewCount: '254x Ditonton',
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
          <View style={styles.navIcon}>
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
    color: '#FF6B9D',
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
});

export default KontenScreen;
