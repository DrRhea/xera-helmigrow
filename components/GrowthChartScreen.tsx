import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { BarChart, LineChart } from 'react-native-chart-kit';
import childrenService from '../services/childrenService';
import growthRecordService, { GrowthRecord } from '../services/growthRecordService';
import { whoStandards } from '../data/whoStandards';
import { developmentMilestones, getDevelopmentMilestonesForAge, getAllMilestonesUpToAge, DevelopmentMilestone } from '../data/developmentMilestones';
import { calculateAgeInMonths, formatAge } from '../utils/dateUtils';

const { width, height } = Dimensions.get('window');

interface Child {
  id: number;
  name: string;
  birth_date: string;
  gender: 'Laki-laki' | 'Perempuan';
  profile_image?: string;
}

interface GrowthChartScreenProps {
  onBack: () => void;
  childData?: Child;
}

type ChartType = 'weight' | 'height' | 'head';

const GrowthChartScreen: React.FC<GrowthChartScreenProps> = ({ onBack }) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [growthRecords, setGrowthRecords] = useState<GrowthRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showChildSelection, setShowChildSelection] = useState(false);
  const [ageInMonths, setAgeInMonths] = useState(0);
  const [showDevelopment, setShowDevelopment] = useState(false);

  // Load growth records for selected child
  const loadGrowthRecords = async (childId: number) => {
    try {
      const records = await growthRecordService.getGrowthRecords(childId);
      setGrowthRecords(records);
    } catch (error) {
      console.error('Error loading growth records:', error);
    }
  };

  // Load children data
  useEffect(() => {
    const loadChildren = async () => {
      try {
        setLoading(true);
        const childrenData = await childrenService.getChildren();
        setChildren(childrenData);
        if (childrenData.length > 0) {
          setShowChildSelection(true);
        }
      } catch (error) {
        console.error('Error loading children:', error);
        Alert.alert('Error', 'Gagal memuat data anak');
      } finally {
        setLoading(false);
      }
    };

    loadChildren();
  }, []);

  // Return early if fonts are not loaded
  if (!fontsLoaded) {
    return null;
  }

  // Generate historical chart data for weight growth over months
  const generateHistoricalChartData = () => {
    if (!selectedChild) return { labels: [], datasets: [] };

    const standards = selectedChild.gender === 'Laki-laki' ? whoStandards.boys : whoStandards.girls;
    const currentAge = ageInMonths;

    // Only show data from 0 to current age (no future data)
    const labels = [];
    const childWeightData = [];
    const childHeightData = [];
    const childHeadData = [];
    const medianWeightData = [];
    const medianHeightData = [];
    const medianHeadData = [];

    for (let age = 0; age <= currentAge; age++) {
      labels.push(`${age} bulan`);
      
      // Get WHO standards for this age
      const weightData = standards.weight.find(data => data.age === age);
      const heightData = standards.height.find(data => data.age === age);
      const headData = standards.headCircumference.find(data => data.age === age);

      // Find growth record for this age
      const recordForAge = growthRecords.find(record => {
        const recordAge = calculateAgeInMonths(record.record_date);
        return recordAge === age;
      });

      // Add child's actual data if available
      if (recordForAge) {
        childWeightData.push(recordForAge.weight || 0);
        childHeightData.push(recordForAge.height || 0);
        childHeadData.push(recordForAge.head_circumference || 0);
      } else {
        childWeightData.push(0);
        childHeightData.push(0);
        childHeadData.push(0);
      }

      // Add WHO median data
      medianWeightData.push(weightData?.median || 0);
      medianHeightData.push(heightData?.median || 0);
      medianHeadData.push(headData?.median || 0);
    }

    return {
      labels,
      datasets: [
        {
          data: childWeightData,
          color: (opacity = 1) => `rgba(255, 107, 157, ${opacity})`,
          strokeWidth: 4,
        },
        {
          data: childHeightData,
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          strokeWidth: 4,
        },
        {
          data: childHeadData,
          color: (opacity = 1) => `rgba(255, 193, 7, ${opacity})`,
          strokeWidth: 4,
        },
        {
          data: medianWeightData,
          color: (opacity = 1) => `rgba(200, 200, 200, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
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

  const getChartTitle = (chartType: ChartType) => {
    switch (chartType) {
      case 'weight': return 'Berat Badan Sesuai Usia';
      case 'height': return 'Tinggi Badan Sesuai Usia';
      case 'head': return 'Lingkar Kepala Sesuai Usia';
      default: return 'Pertumbuhan Anak';
    }
  };

  const handleChildSelection = async (child: Child) => {
    setSelectedChild(child);
    const age = calculateAgeInMonths(child.birth_date);
    setAgeInMonths(age);
    setShowChildSelection(false);
    await loadGrowthRecords(child.id);
  };

  const getCurrentValue = (chartType: ChartType) => {
    if (!selectedChild || growthRecords.length === 0) return '-';
    
    // Get the most recent growth record
    const latestRecord = growthRecords.sort((a, b) => 
      new Date(b.record_date).getTime() - new Date(a.record_date).getTime()
    )[0];
    
    if (!latestRecord) return '-';
    
    switch (chartType) {
      case 'weight': return latestRecord.weight ? `${Number(latestRecord.weight).toFixed(1)} kg` : '-';
      case 'height': return latestRecord.height ? `${Number(latestRecord.height).toFixed(1)} cm` : '-';
      case 'head': return latestRecord.head_circumference ? `${Number(latestRecord.head_circumference).toFixed(1)} cm` : '-';
      default: return '-';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B9D" />
        <Text style={styles.loadingText}>Memuat data anak...</Text>
      </View>
    );
  }

  if (children.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pertumbuhan Kembang Anak</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>Belum ada data anak</Text>
          <Text style={styles.noDataSubtext}>Silakan tambah data anak terlebih dahulu</Text>
        </View>
      </View>
    );
  }

  if (showChildSelection) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pilih Anak</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.childSelectionContainer}>
          <Text style={styles.selectionTitle}>Pilih anak yang ingin dilihat datanya:</Text>
          <ScrollView style={styles.childrenList}>
            {children.map((child) => (
              <TouchableOpacity
                key={child.id}
                style={styles.childSelectionCard}
                onPress={() => handleChildSelection(child)}
              >
                <View style={styles.childInfo}>
                  <Text style={styles.childName}>{child.name}</Text>
                  <Text style={styles.childDetails}>
                    {child.gender} • {calculateAgeInMonths(child.birth_date)} bulan
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666666" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pertumbuhan Kembang Anak</Text>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => setShowChildSelection(true)}
        >
          <Ionicons name="swap-horizontal" size={20} color="#666666" />
        </TouchableOpacity>
      </View>

      {/* Child Info */}
      <View style={styles.childInfoSection}>
        <Text style={styles.childName}>{selectedChild?.name}</Text>
        <Text style={styles.childDetails}>
          {selectedChild?.gender} • {ageInMonths} bulan
        </Text>
      </View>

      {/* Chart Section */}
      <ScrollView style={styles.chartSection} showsVerticalScrollIndicator={false}>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Pertumbuhan Anak dari Bulan ke Bulan</Text>
          <Text style={styles.currentData}>
            {selectedChild ? `${selectedChild.name} (${ageInMonths} bulan)` : 'Belum ada data'}
          </Text>
          
          <View style={styles.chartWrapper}>
            {generateHistoricalChartData().labels.length > 0 ? (
              <LineChart
                data={generateHistoricalChartData()}
                width={width - 40}
                height={300}
                chartConfig={chartConfig}
                style={styles.chart}
                withDots={true}
                withShadow={false}
                withScrollableDot={false}
                withInnerLines={true}
                withOuterLines={true}
                withVerticalLines={true}
                withHorizontalLines={true}
                bezier={true}
              />
            ) : (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>Belum ada data pertumbuhan</Text>
                <Text style={styles.noDataSubtext}>Data akan muncul setelah menambah pengukuran</Text>
              </View>
            )}
          </View>

          {/* Data Summary */}
          <View style={styles.dataSummary}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Berat Badan</Text>
              <Text style={styles.summaryValue}>{getCurrentValue('weight')}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Tinggi Badan</Text>
              <Text style={styles.summaryValue}>{getCurrentValue('height')}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Lingkar Kepala</Text>
              <Text style={styles.summaryValue}>{getCurrentValue('head')}</Text>
            </View>
          </View>

          {/* Legend */}
          <View style={styles.legendContainer}>
            <Text style={styles.legendTitle}>Keterangan:</Text>
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#FF6B9D' }]} />
                <Text style={styles.legendText}>Berat Badan Anak</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]} />
                <Text style={styles.legendText}>Tinggi Badan Anak</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#FFC107' }]} />
                <Text style={styles.legendText}>Lingkar Kepala Anak</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#C8C8C8' }]} />
                <Text style={styles.legendText}>Median WHO (Berat)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Development Milestones Section */}
        {showDevelopment && (
          <View style={styles.developmentSection}>
            <Text style={styles.sectionTitle}>Perkembangan Anak</Text>
            <Text style={styles.sectionSubtitle}>
              Milestone perkembangan untuk usia {formatAge(ageInMonths)}
            </Text>
            
            {(() => {
              const milestones = getDevelopmentMilestonesForAge(ageInMonths);
              if (!milestones) {
                return (
                  <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>Belum ada milestone untuk usia ini</Text>
                  </View>
                );
              }

              return (
                <View style={styles.milestonesContainer}>
                  {milestones.physical.length > 0 && (
                    <View style={styles.milestoneCategory}>
                      <Text style={styles.categoryTitle}>Perkembangan Fisik</Text>
                      {milestones.physical.map((milestone, index) => (
                        <View key={index} style={styles.milestoneItem}>
                          <View style={styles.milestoneIcon}>
                            <Ionicons 
                              name={milestone.achieved ? "checkmark-circle" : "ellipse-outline"} 
                              size={20} 
                              color={milestone.achieved ? "#4CAF50" : "#CCCCCC"} 
                            />
                          </View>
                          <View style={styles.milestoneContent}>
                            <Text style={styles.milestoneTitle}>{milestone.milestone}</Text>
                            <Text style={styles.milestoneDescription}>{milestone.description}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}

                  {milestones.cognitive.length > 0 && (
                    <View style={styles.milestoneCategory}>
                      <Text style={styles.categoryTitle}>Perkembangan Kognitif</Text>
                      {milestones.cognitive.map((milestone, index) => (
                        <View key={index} style={styles.milestoneItem}>
                          <View style={styles.milestoneIcon}>
                            <Ionicons 
                              name={milestone.achieved ? "checkmark-circle" : "ellipse-outline"} 
                              size={20} 
                              color={milestone.achieved ? "#4CAF50" : "#CCCCCC"} 
                            />
                          </View>
                          <View style={styles.milestoneContent}>
                            <Text style={styles.milestoneTitle}>{milestone.milestone}</Text>
                            <Text style={styles.milestoneDescription}>{milestone.description}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}

                  {milestones.social.length > 0 && (
                    <View style={styles.milestoneCategory}>
                      <Text style={styles.categoryTitle}>Perkembangan Sosial</Text>
                      {milestones.social.map((milestone, index) => (
                        <View key={index} style={styles.milestoneItem}>
                          <View style={styles.milestoneIcon}>
                            <Ionicons 
                              name={milestone.achieved ? "checkmark-circle" : "ellipse-outline"} 
                              size={20} 
                              color={milestone.achieved ? "#4CAF50" : "#CCCCCC"} 
                            />
                          </View>
                          <View style={styles.milestoneContent}>
                            <Text style={styles.milestoneTitle}>{milestone.milestone}</Text>
                            <Text style={styles.milestoneDescription}>{milestone.description}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}

                  {milestones.language.length > 0 && (
                    <View style={styles.milestoneCategory}>
                      <Text style={styles.categoryTitle}>Perkembangan Bahasa</Text>
                      {milestones.language.map((milestone, index) => (
                        <View key={index} style={styles.milestoneItem}>
                          <View style={styles.milestoneIcon}>
                            <Ionicons 
                              name={milestone.achieved ? "checkmark-circle" : "ellipse-outline"} 
                              size={20} 
                              color={milestone.achieved ? "#4CAF50" : "#CCCCCC"} 
                            />
                          </View>
                          <View style={styles.milestoneContent}>
                            <Text style={styles.milestoneTitle}>{milestone.milestone}</Text>
                            <Text style={styles.milestoneDescription}>{milestone.description}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              );
            })()}
          </View>
        )}
      </ScrollView>

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#666666',
    marginTop: 16,
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
  changeChildButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  childSelectionContainer: {
    flex: 1,
    padding: 20,
  },
  selectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
  childrenList: {
    flex: 1,
  },
  childSelectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
    marginBottom: 4,
  },
  childDetails: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
  },
  childInfoSection: {
    backgroundColor: '#F8F9FA',
    padding: 20,
    alignItems: 'center',
  },
  chartsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  legendContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  legendTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginBottom: 12,
  },
  dataSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
  },
  childSelection: {
    backgroundColor: '#F8F9FA',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  childButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedChildButton: {
    backgroundColor: '#FF6B9D',
    borderColor: '#FF6B9D',
  },
  childButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#666666',
  },
  selectedChildButtonText: {
    color: '#FFFFFF',
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
  activeMetricCard: {
    borderWidth: 3,
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
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
    paddingBottom: 100, // Add padding to avoid bottom navbar
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
  noDataContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingHorizontal: 20,
  },
  noDataText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#666666',
    textAlign: 'center',
    marginBottom: 8,
  },
  noDataSubtext: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#999999',
    textAlign: 'center',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
  // Development Milestones Styles
  headerButton: {
    padding: 8,
  },
  developmentSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#333333',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    marginBottom: 20,
  },
  milestonesContainer: {
    gap: 20,
  },
  milestoneCategory: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333333',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingVertical: 8,
  },
  milestoneIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333333',
    marginBottom: 4,
  },
  milestoneDescription: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    lineHeight: 16,
  },
});

export default GrowthChartScreen;