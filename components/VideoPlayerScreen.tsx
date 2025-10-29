import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
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
    videoPath: any;
  };
}

const VideoPlayerScreen: React.FC<VideoPlayerScreenProps> = ({ onBack, onHome, videoData }) => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoStatus, setVideoStatus] = useState<AVPlaybackStatus | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [scrubTime, setScrubTime] = useState(0);
  const videoRef = useRef<Video>(null);
  const webVideoRef = useRef<HTMLVideoElement>(null);

  // Function to get video path based on ID
  const getVideoPath = (videoId: number) => {
    // Use require() for all platforms to ensure proper bundling
    switch (videoId) {
      case 1:
        return require('../assets/video/video-1.mp4');
      case 2:
        return require('../assets/video/video-2.mp4');
      case 3:
        return require('../assets/video/video-3.mp4');
      case 4:
        return require('../assets/video/video-4.mp4');
      case 5:
        return require('../assets/video/video-5.mp4');
      case 6:
        return require('../assets/video/video-6.mp4');
      case 7:
        return require('../assets/video/video-7.mp4');
      default:
        return require('../assets/video/video-1.mp4');
    }
  };

  // Default video data if none provided
  const defaultVideoData = {
    id: 1,
    title: 'Tapuak Ambai-Ambai',
    description: 'Tapuak ambai-ambai untuk menstimulasi aspek bahasa (anak belajar kata-kata baru dari nyanyian), sosial emosial (meningkatkan ikatan orang tua dan ekspresi emosi anak)',
    tag: 'Edukasi',
    viewCount: '0x Ditonton',
    videoPath: getVideoPath(1),
  };

  const currentVideo = videoData ? {
    ...videoData,
    videoPath: getVideoPath(videoData.id)
  } : defaultVideoData;

  // Load video when component mounts (no auto-play)
  useEffect(() => {
    if (Platform.OS === 'web') {
      // Web video handling
      const loadWebVideo = () => {
        if (webVideoRef.current) {
          try {
            setIsLoading(true);
            webVideoRef.current.load();
            setIsLoading(false);
          } catch (error) {
            console.log('Error loading web video:', error);
            setIsLoading(false);
          }
        }
      };

      const timer = setTimeout(loadWebVideo, 500);
      return () => clearTimeout(timer);
    } else {
      // Mobile video handling
      const loadVideo = async () => {
        if (videoRef.current) {
          try {
            setIsLoading(true);
            await videoRef.current.loadAsync(currentVideo.videoPath);
            setIsLoading(false);
          } catch (error) {
            console.log('Error loading video:', error);
            setIsLoading(false);
          }
        }
      };

      const timer = setTimeout(loadVideo, 500);
      return () => clearTimeout(timer);
    }
  }, [currentVideo.videoPath]);

  if (!fontsLoaded) {
    return null;
  }

  const handlePlayPause = async () => {
    if (Platform.OS === 'web') {
      // Web video handling
      if (webVideoRef.current && !isLoading) {
        try {
          if (isPlaying) {
            webVideoRef.current.pause();
            setIsPlaying(false);
          } else {
            setIsLoading(true);
            await webVideoRef.current.play();
            setIsPlaying(true);
            setIsLoading(false);
          }
        } catch (error) {
          console.log('Error toggling web video playback:', error);
          setIsLoading(false);
        }
      }
    } else {
      // Mobile video handling
      if (videoRef.current && !isLoading) {
        try {
          if (isPlaying) {
            await videoRef.current.pauseAsync();
            setIsPlaying(false);
          } else {
            setIsLoading(true);
            if (!videoStatus?.isLoaded) {
              await videoRef.current.loadAsync(currentVideo.videoPath);
            }
            await videoRef.current.playAsync();
            setIsPlaying(true);
            setIsLoading(false);
          }
        } catch (error) {
          console.log('Error toggling video playback:', error);
          setIsLoading(false);
        }
      }
    }
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    setVideoStatus(status);
    if (status.isLoaded) {
      setIsLoading(false);
    }
  };

  // Web video event handlers
  const onWebVideoLoad = () => {
    if (webVideoRef.current) {
      setDuration(webVideoRef.current.duration);
      setIsLoading(false);
    }
  };

  const onWebVideoTimeUpdate = () => {
    if (webVideoRef.current) {
      setCurrentTime(webVideoRef.current.currentTime);
    }
  };

  const onWebVideoEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Scrubbing functions
  const handleScrubStart = () => {
    setIsScrubbing(true);
    const currentTimeValue = Platform.OS === 'web' ? currentTime : (videoStatus?.positionMillis || 0) / 1000;
    const validCurrentTime = isFinite(currentTimeValue) && currentTimeValue >= 0 ? currentTimeValue : 0;
    setScrubTime(validCurrentTime);
  };

  const handleScrubMove = (event: any) => {
    if (!isScrubbing) return;
    
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const progressWidth = rect.width;
    const percentage = Math.max(0, Math.min(1, clickX / progressWidth));
    
    // Pastikan duration valid sebelum menghitung newTime
    const validDuration = isFinite(duration) && duration > 0 ? duration : 1;
    const newTime = percentage * validDuration;
    
    setScrubTime(newTime);
  };

  const handleScrubEnd = () => {
    if (!isScrubbing) return;
    
    setIsScrubbing(false);
    
    // Validasi scrubTime untuk memastikan finite number
    const validScrubTime = isFinite(scrubTime) && scrubTime >= 0 ? scrubTime : 0;
    
    if (Platform.OS === 'web') {
      if (webVideoRef.current && webVideoRef.current.duration) {
        // Pastikan scrubTime tidak melebihi duration
        const clampedTime = Math.min(validScrubTime, webVideoRef.current.duration);
        webVideoRef.current.currentTime = clampedTime;
        setCurrentTime(clampedTime);
      }
    } else {
      if (videoRef.current && videoStatus?.isLoaded) {
        videoRef.current.setPositionAsync(validScrubTime * 1000);
        setCurrentTime(validScrubTime);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Video Player Section */}
      <View style={styles.videoPlayerContainer}>
        {Platform.OS === 'web' ? (
          <video
            ref={webVideoRef}
            style={styles.webVideo}
            src={currentVideo.videoPath}
            onLoadedData={onWebVideoLoad}
            onTimeUpdate={onWebVideoTimeUpdate}
            onEnded={onWebVideoEnded}
            controls={false}
            preload="metadata"
          />
        ) : (
          <Video
            ref={videoRef}
            style={styles.video}
            source={currentVideo.videoPath}
            useNativeControls={false}
            resizeMode={ResizeMode.CONTAIN}
            isLooping={false}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          />
        )}
        
        {/* Play/Pause Overlay */}
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause} disabled={isLoading}>
          <View style={styles.playButtonCircle}>
            {isLoading ? (
              <Ionicons 
                name="hourglass" 
                size={24} 
                color="#FFFFFF" 
              />
            ) : (
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={24} 
                color="#FFFFFF" 
              />
            )}
          </View>
        </TouchableOpacity>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View 
            style={styles.progressBar}
            onTouchStart={handleScrubStart}
            onTouchMove={handleScrubMove}
            onTouchEnd={handleScrubEnd}
            onMouseDown={handleScrubStart}
            onMouseMove={handleScrubMove}
            onMouseUp={handleScrubEnd}
            onMouseLeave={handleScrubEnd}
          >
            <View style={[
              styles.progressBarFilled, 
              { width: isScrubbing ? 
                (duration > 0 ? `${(scrubTime / duration) * 100}%` : '0%') :
                Platform.OS === 'web' ? 
                  (duration > 0 ? `${(currentTime / duration) * 100}%` : '0%') :
                  (videoStatus?.isLoaded && videoStatus.durationMillis && videoStatus.positionMillis ? 
                    `${(videoStatus.positionMillis / videoStatus.durationMillis) * 100}%` : '0%')
              }
            ]} />
            <View style={[
              styles.progressBarScrubber,
              { left: isScrubbing ? 
                (duration > 0 ? `${(scrubTime / duration) * 100}%` : '0%') :
                Platform.OS === 'web' ? 
                  (duration > 0 ? `${(currentTime / duration) * 100}%` : '0%') :
                  (videoStatus?.isLoaded && videoStatus.durationMillis && videoStatus.positionMillis ? 
                    `${(videoStatus.positionMillis / videoStatus.durationMillis) * 100}%` : '0%')
              }
            ]} />
          </View>
        </View>

        {/* Time Display */}
        <View style={styles.timeDisplay}>
          <Text style={styles.timeText}>
            {isScrubbing ? (
              <>
                {Math.floor(scrubTime / 60)}:{(Math.floor(scrubTime % 60)).toString().padStart(2, '0')} / {Math.floor(duration / 60)}:{(Math.floor(duration % 60)).toString().padStart(2, '0')}
              </>
            ) : Platform.OS === 'web' ? (
              <>
                {Math.floor(currentTime / 60)}:{(Math.floor(currentTime % 60)).toString().padStart(2, '0')} / {Math.floor(duration / 60)}:{(Math.floor(duration % 60)).toString().padStart(2, '0')}
              </>
            ) : (
              <>
                {videoStatus?.isLoaded && videoStatus.positionMillis ? 
                  `${Math.floor(videoStatus.positionMillis / 1000 / 60)}:${Math.floor((videoStatus.positionMillis / 1000) % 60).toString().padStart(2, '0')}` : 
                  '0:00'
                } / {videoStatus?.isLoaded && videoStatus.durationMillis ? 
                  `${Math.floor(videoStatus.durationMillis / 1000 / 60)}:${Math.floor((videoStatus.durationMillis / 1000) % 60).toString().padStart(2, '0')}` : 
                  '0:00'
                }
              </>
            )}
          </Text>
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

        {/* Video Description */}
        <Text style={styles.videoDescription}>{currentVideo.description}</Text>
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
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  webVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  videoDescription: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    marginBottom: 16,
    lineHeight: 20,
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
