import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
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
    videoSource?: any;
  };
}

const VideoPlayerScreen: React.FC<VideoPlayerScreenProps> = ({ onBack, onHome, videoData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<Video>(null);

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
    title: 'Tapuak ambai-ambai',
    description: 'untuk menstimulasi aspek bahasa (anak belajar kata-kata baru dari nyanyian), sosial emosial (meningkatkan ikatan orang tua dan ekspresi emosi anak)',
    tag: 'Manjujai',
    viewCount: '254x Ditonton',
    videoSource: require('../assets/konten-manjujai/tapuakambaiambai.mp4'),
  };

  const currentVideo = videoData || defaultVideoData;

  // Use the video source from currentVideo
  const videoSource = currentVideo.videoSource;

  const handlePlayPause = async () => {
    try {
      if (Platform.OS === 'web') {
        // For web platform, just toggle the state and let shouldPlay handle it
        setIsPlaying(!isPlaying);
      } else {
        // For mobile platforms, use the ref methods
        if (videoRef.current) {
          if (isPlaying) {
            await videoRef.current.pauseAsync();
          } else {
            await videoRef.current.playAsync();
          }
          setIsPlaying(!isPlaying);
        }
      }
    } catch (error) {
      console.log('Error playing video:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <View style={styles.backButtonCircle}>
            <Ionicons name="arrow-back" size={20} color="#000000" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Video Player</Text>
      </View>

      {/* Video Player Section */}
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          style={styles.video}
          source={videoSource}
          useNativeControls={Platform.OS === 'web'}
          resizeMode={ResizeMode.CONTAIN}
          isLooping={false}
          shouldPlay={Platform.OS === 'web' ? false : isPlaying}
          onLoadStart={() => {
            console.log('Video loading started');
          }}
          onLoad={() => {
            console.log('Video loaded successfully');
          }}
          onError={(error) => {
            console.log('Video error:', error);
          }}
          onPlaybackStatusUpdate={(status) => {
            console.log('Playback status:', status);
          }}
        />
        
        {/* Custom Play Button - Only show on mobile */}
        {Platform.OS !== 'web' && (
          <TouchableOpacity 
            style={styles.playButton} 
            onPress={handlePlayPause}
          >
            <View style={styles.playButtonCircle}>
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={24} 
                color="#FFFFFF" 
              />
            </View>
          </TouchableOpacity>
        )}
        
      </View>

      {/* Video Information Section */}
      <View style={styles.videoInfoContainer}>
        {/* Category Tag */}
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{currentVideo.tag}</Text>
        </View>

        {/* Video Title */}
        <Text style={styles.videoTitle}>{currentVideo.title}</Text>

        {/* Video Description */}
        <Text style={styles.videoDescription}>{currentVideo.description}</Text>

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
  videoContainer: {
    height: height * 0.4,
    backgroundColor: '#000000',
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
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
  videoDescription: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    marginBottom: 16,
    lineHeight: 20,
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