import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

const { width, height } = Dimensions.get('window');

interface VideoPlayerScreenProps {
  onBack: () => void;
  onHome: () => void;
  videoData?: {
    id: number;
    title: string;
    description: string;
    tag: string;
    viewCount: string;
    duration: string;
    currentTime: string;
  };
}

const VideoPlayerScreen: React.FC<VideoPlayerScreenProps> = ({ onBack, onHome, videoData }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Default video data if none provided
  const defaultVideoData = {
    id: 1,
    title: 'Exampel vidio tumbuh kembang anak',
    description: 'Video edukasi untuk stimulasi tumbuh kembang anak',
    tag: 'Xampel',
    viewCount: '254x Ditonton',
    duration: '5:00',
    currentTime: '0:48',
  };

  const currentVideo = videoData || defaultVideoData;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      {/* Video Player Section */}
      <View style={styles.videoPlayerContainer}>
        {/* Video Thumbnail/Background */}
        <View style={styles.videoThumbnail}>
          {/* Play Button */}
          <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
            <View style={styles.playButtonCircle}>
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={24} 
                color="#FFFFFF" 
              />
            </View>
          </TouchableOpacity>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressBarFilled} />
              <View style={styles.progressBarScrubber} />
            </View>
          </View>

          {/* Time Display */}
          <View style={styles.timeDisplay}>
            <Text style={styles.timeText}>
              {currentVideo.currentTime} / {currentVideo.duration}
            </Text>
          </View>
        </View>
      </View>

      {/* Video Information Section */}
      <View style={styles.videoInfoContainer}>
        {/* Category Tag */}
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{currentVideo.tag}</Text>
        </View>

        {/* Video Title */}
        <Text style={styles.videoTitle}>{currentVideo.title}</Text>

        {/* View Count */}
        <View style={styles.viewCountContainer}>
          <Ionicons name="videocam" size={16} color="#FF6B9D" />
          <Text style={styles.viewCountText}>{currentVideo.viewCount}</Text>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={onHome}
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
  videoPlayerContainer: {
    height: height * 0.4, // 40% of screen height
    backgroundColor: '#2C5F5F', // Dark teal background
  },
  videoThumbnail: {
    flex: 1,
    position: 'relative',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },
  playButtonCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    position: 'relative',
  },
  progressBarFilled: {
    height: 4,
    width: '30%', // 30% of video watched
    backgroundColor: '#FF6B9D',
    borderRadius: 2,
  },
  progressBarScrubber: {
    position: 'absolute',
    top: -6,
    left: '30%',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF6B9D',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  timeDisplay: {
    position: 'absolute',
    bottom: 35,
    left: 20,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
  },
  videoInfoContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
  },
  tagContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF6B9D',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  videoTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
    marginBottom: 12,
    lineHeight: 24,
  },
  viewCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewCountText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#FF6B9D',
    marginLeft: 6,
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

export default VideoPlayerScreen;
