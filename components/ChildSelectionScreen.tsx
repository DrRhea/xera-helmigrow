import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Child } from '../services/childrenService';

const { width, height } = Dimensions.get('window');

interface ChildSelectionScreenProps {
  onBack: () => void;
  children: Child[];
  onSelectChild: (child: Child) => void;
}

const ChildSelectionScreen: React.FC<ChildSelectionScreenProps> = ({ onBack, children, onSelectChild }) => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#87CEEB', '#4682B4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Pilih Anak</Text>
          <Text style={styles.headerSubtitle}>Kuesioner Tumbuh Kembang</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Instruction */}
        <View style={styles.instructionContainer}>
          <View style={styles.instructionIcon}>
            <Ionicons name="clipboard-outline" size={32} color="#87CEEB" />
          </View>
          <Text style={styles.instructionTitle}>Pilih Anak untuk Kuesioner</Text>
          <Text style={styles.instructionText}>
            Pilih anak yang akan mengikuti kuesioner tumbuh kembang berdasarkan usianya
          </Text>
        </View>

        {/* Children List */}
        <View style={styles.childrenList}>
          {children.map((child) => {
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
                style={styles.childCard}
                onPress={() => onSelectChild(child)}
              >
                <View style={styles.childCardContent}>
                  <View style={styles.childAvatarContainer}>
                    <Image
                      source={require('../assets/icons/ikon-bayi.png')}
                      style={styles.childAvatar}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.childInfo}>
                    <Text style={styles.childName}>{child.name}</Text>
                    <Text style={styles.childAge}>{ageText}</Text>
                    <Text style={styles.childGender}>{child.gender}</Text>
                  </View>
                  <View style={styles.selectIcon}>
                    <Ionicons name="chevron-forward" size={20} color="#87CEEB" />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  instructionContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginBottom: 10,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  instructionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  childrenList: {
    paddingHorizontal: 20,
  },
  childCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  childCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  childAvatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  childAvatar: {
    width: 40,
    height: 40,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    marginBottom: 4,
  },
  childAge: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#87CEEB',
    marginBottom: 2,
  },
  childGender: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: '#666',
  },
  selectIcon: {
    marginLeft: 10,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default ChildSelectionScreen;
