import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { LineChart } from 'react-native-chart-kit';

const { width, height } = Dimensions.get('window');

interface GrowthChartScreenProps {
  onBack: () => void;
}

const GrowthChartScreen: React.FC<GrowthChartScreenProps> = ({ onBack }) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Sample growth data - berat badan sesuai usia
  const chartData = {
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    datasets: [
      {
        data: [3.2, 4.2, 5.1, 5.8, 6.4, 6.9, 7.3, 7.6, 7.9, 8.1, 8.3, 8.5, 8.7],
        color: (opacity = 1) => `rgba(255, 107, 157, ${opacity})`, // Pink color for actual data
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#FF6B9D',
      fill: '#FFFFFF',
    },
    propsForBackgroundLines: {
      strokeDasharray: '5,5',
      stroke: '#E0E0E0',
      strokeWidth: 1,
    },
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pertumbuhan Kembang Anak</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Black Section with Metrics */}
      <View style={styles.metricsSection}>
        <View style={styles.metricsContainer}>
          {/* Weight Card */}
          <View style={styles.metricCard}>
            <View style={styles.weightGradient}>
              <View style={styles.metricIcon}>
                <Ionicons name="scale" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.metricLabel}>Berat</Text>
              <Text style={styles.metricValue}>6</Text>
              <Text style={styles.metricUnit}>Kg</Text>
            </View>
          </View>

          {/* Height Card */}
          <View style={styles.metricCard}>
            <View style={styles.heightGradient}>
              <View style={styles.metricIcon}>
                <Ionicons name="resize" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.metricLabel}>Tinggi</Text>
              <Text style={styles.metricValue}>6</Text>
              <Text style={styles.metricUnit}>Cm</Text>
            </View>
          </View>

          {/* Head Circumference Card */}
          <View style={styles.metricCard}>
            <View style={styles.headGradient}>
              <View style={styles.metricIcon}>
                <Ionicons name="person" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.metricLabel}>L.Kepala</Text>
              <Text style={styles.metricValue}>6</Text>
              <Text style={styles.metricUnit}>Cm</Text>
            </View>
          </View>
        </View>
      </View>

      {/* White Section with Chart */}
      <View style={styles.chartSection}>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Berat Badan Sesuai Usia</Text>
          <Text style={styles.currentData}>6 Kg / 20 Hari</Text>
          
          <View style={styles.chartWrapper}>
            <LineChart
              data={chartData}
              width={width - 40}
              height={250}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              withDots={true}
              withShadow={false}
              withScrollableDot={false}
              withInnerLines={true}
              withOuterLines={true}
              withVerticalLines={true}
              withHorizontalLines={true}
            />
          </View>

          {/* Legend */}
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#FFD700' }]} />
              <Text style={styles.legendText}>Rentang Normal</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#90EE90' }]} />
              <Text style={styles.legendText}>Rentang Optimal</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#FF6B9D' }]} />
              <Text style={styles.legendText}>Data Anak</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem}>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  metricsSection: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricCard: {
    flex: 1,
    marginHorizontal: 5,
  },
  weightGradient: {
    backgroundColor: '#4A90E2',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  heightGradient: {
    backgroundColor: '#FF6B9D',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  headGradient: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  metricIcon: {
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  metricUnit: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
  },
  chartSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
    marginBottom: 10,
  },
  currentData: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#666666',
    marginBottom: 20,
  },
  chartWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chart: {
    borderRadius: 16,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
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

export default GrowthChartScreen;
