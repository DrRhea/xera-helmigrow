import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import childrenService from '../services/childrenService';
import growthRecordService, { GrowthRecord } from '../services/growthRecordService';
import { whoStandards } from '../data/whoStandards';
import { headCircumferenceStandards, getHeadCircumferenceStatus } from '../data/headCircumferenceStandards';
import { calculateAgeInMonths, formatAge, getCurrentDateString } from '../utils/dateUtils';

interface Child {
  id: number;
  name: string;
  birth_date: string;
  gender: string;
  profile_image?: string;
}

interface NutritionScreenProps {
  onBack: () => void;
  childData: Child;
}

const NutritionScreen: React.FC<NutritionScreenProps> = ({ onBack, childData }) => {
  const [currentWeight, setCurrentWeight] = useState('');
  const [currentHeight, setCurrentHeight] = useState('');
  const [currentHeadCircumference, setCurrentHeadCircumference] = useState('');
  const [growthRecords, setGrowthRecords] = useState<GrowthRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<GrowthRecord | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<GrowthRecord | null>(null);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // Load growth records
  const loadGrowthRecords = async () => {
    try {
      setLoading(true);
      console.log('Loading growth records for child:', childData.id);
      const records = await growthRecordService.getGrowthRecords(childData.id);
      console.log('Loaded growth records:', records);
      setGrowthRecords(records);
    } catch (error) {
      console.error('Error loading growth records:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('NutritionScreen mounted with childData:', childData);
    loadGrowthRecords();
  }, []);

  // Return early if fonts are not loaded - AFTER all hooks
  if (!fontsLoaded) {
    return null;
  }

  // Calculate nutrition status for a specific record
  const calculateNutritionStatus = (weight: number, height: number, headCircumference: number | null, ageInMonths: number) => {
    if (ageInMonths < 0 || ageInMonths > 60) {
      return null;
    }

    const gender = childData.gender === 'Laki-laki' ? 'boys' : 'girls';
    const standards = whoStandards[gender];
    
    // Find the standard for the current age
    const weightStandard = standards.weight.find(s => s.age === ageInMonths);
    const heightStandard = standards.height.find(s => s.age === ageInMonths);
    const headStandard = standards.headCircumference.find(s => s.age === ageInMonths);

    if (!weightStandard || !heightStandard) {
      return null;
    }

    // Calculate Z-scores
    const weightZScore = calculateZScore(weight, weightStandard);
    const heightZScore = calculateZScore(height, heightStandard);
    const headZScore = headCircumference && headStandard ? calculateZScore(headCircumference, headStandard) : null;

    const result: any = {
      weight: {
        value: weight,
        zScore: weightZScore,
        status: getNutritionStatus(weightZScore),
        standard: weightStandard
      },
      height: {
        value: height,
        zScore: heightZScore,
        status: getNutritionStatus(heightZScore),
        standard: heightStandard
      }
    };

    // Add head circumference status if available
    if (headCircumference && headZScore !== null) {
      result.headCircumference = {
        value: headCircumference,
        zScore: headZScore,
        status: getHeadCircumferenceStatus(headZScore, childData.gender as 'Laki-laki' | 'Perempuan'),
        standard: headStandard
      };
    }

    return result;
  };

  const calculateZScore = (value: number, standard: any) => {
    if (value <= standard.minus3SD) return -3;
    if (value <= standard.minus2SD) return -2;
    if (value <= standard.minus1SD) return -1;
    if (value <= standard.median) return 0;
    if (value <= standard.plus1SD) return 1;
    if (value <= standard.plus2SD) return 2;
    if (value <= standard.plus3SD) return 3;
    return 3;
  };

  const getNutritionStatus = (zScore: number) => {
    if (zScore < -3) return { status: 'Sangat Kurang', color: '#FF0000' };
    if (zScore < -2) return { status: 'Kurang', color: '#FF6B6B' };
    if (zScore < -1) return { status: 'Di Bawah Normal', color: '#FFD93D' };
    if (zScore <= 1) return { status: 'Normal', color: '#6BCF7F' };
    if (zScore <= 2) return { status: 'Di Atas Normal', color: '#FFD93D' };
    if (zScore <= 3) return { status: 'Berlebih', color: '#FF6B6B' };
    return { status: 'Sangat Berlebih', color: '#FF0000' };
  };

  const handleSaveRecord = async () => {
    try {
      setLoading(true);

    const weight = parseFloat(currentWeight);
    const height = parseFloat(currentHeight);
      const headCircumference = currentHeadCircumference ? parseFloat(currentHeadCircumference) : undefined;

      if (isNaN(weight) || isNaN(height)) {
        Alert.alert('Error', 'Mohon isi berat dan tinggi badan dengan benar');
      return;
    }

      const recordData = {
        child_id: childData.id,
        weight,
        height,
        head_circumference: headCircumference,
        record_date: getCurrentDateString(),
      };

      console.log('Saving growth record:', recordData);

      if (editingRecord) {
        console.log('Updating existing record:', editingRecord.id);
        await growthRecordService.updateGrowthRecord(editingRecord.id, recordData);
        Alert.alert('Berhasil', 'Data pertumbuhan berhasil diperbarui');
      } else {
        console.log('Creating new record');
        await growthRecordService.createGrowthRecord(recordData);
        Alert.alert('Berhasil', 'Data pertumbuhan berhasil disimpan');
      }

      setShowAddModal(false);
      setEditingRecord(null);
      resetForm();
      loadGrowthRecords();
    } catch (error: any) {
      console.error('Error saving growth record:', error);
      Alert.alert('Error', error.message || 'Gagal menyimpan data');
    } finally {
      setLoading(false);
    }
  };

  const handleEditRecord = (record: GrowthRecord) => {
    setEditingRecord(record);
    setCurrentWeight(record.weight.toString());
    setCurrentHeight(record.height.toString());
    setCurrentHeadCircumference(record.head_circumference?.toString() || '');
    setShowAddModal(true);
  };

  const handleDeleteRecord = (record: GrowthRecord) => {
    setRecordToDelete(record);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setRecordToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!recordToDelete) return;

    try {
      await growthRecordService.deleteGrowthRecord(recordToDelete.id);
      setGrowthRecords(growthRecords.filter(record => record.id !== recordToDelete.id));
      setShowDeleteModal(false);
      setRecordToDelete(null);
      Alert.alert('Berhasil', 'Data pertumbuhan berhasil dihapus');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Gagal menghapus data');
    }
  };

  const resetForm = () => {
    setCurrentWeight('');
    setCurrentHeight('');
    setCurrentHeadCircumference('');
  };

  const openAddModal = () => {
    resetForm();
    setEditingRecord(null);
    setShowAddModal(true);
  };

  const ageInMonths = calculateAgeInMonths(childData.birth_date);

    return (
      <View style={styles.container}>
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
        <Text style={styles.headerTitle}>Status Gizi</Text>
          <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
          <View style={styles.childInfo}>
          <Text style={styles.childName}>{childData.name}</Text>
          <Text style={styles.childAge}>
            {formatAge(ageInMonths)}
            </Text>
          </View>
        </LinearGradient>
        
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Add Data Button */}
        <View style={styles.addDataSection}>
          <TouchableOpacity style={styles.addDataButton} onPress={openAddModal}>
            <Ionicons name="add-circle" size={24} color="#FFFFFF" />
            <Text style={styles.addDataButtonText}>Tambah Data Pertumbuhan</Text>
          </TouchableOpacity>
        </View>

        {/* Growth Records History */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Riwayat Pertumbuhan</Text>
          
          {loading ? (
            <ActivityIndicator size="large" color="#FF6B9D" />
          ) : growthRecords.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="document-outline" size={48} color="#CCCCCC" />
              <Text style={styles.emptyText}>Belum ada data pertumbuhan</Text>
              <Text style={styles.emptySubtext}>Tambahkan data pertumbuhan anak Anda</Text>
      </View>
          ) : (
            <FlatList
              data={growthRecords}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                const ageInMonths = calculateAgeInMonths(item.record_date);
                const nutritionStatus = calculateNutritionStatus(item.weight, item.height, item.head_circumference || null, ageInMonths);

  return (
                  <View style={styles.recordCard}>
                    <View style={styles.recordHeader}>
                      <Text style={styles.recordDate}>
                        {new Date(item.record_date).toLocaleDateString('id-ID')}
                      </Text>
                      <View style={styles.recordActions}>
                        <TouchableOpacity onPress={() => handleEditRecord(item)}>
                          <Ionicons name="create-outline" size={20} color="#FF6B9D" />
        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteRecord(item)}>
                          <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    
                    <View style={styles.recordData}>
                      <View style={styles.recordDataRow}>
                        <Text style={styles.recordDataItem}>Berat: {item.weight} kg</Text>
                        {nutritionStatus && (
                          <Text style={[styles.recordStatus, { color: nutritionStatus.weight.status.color }]}>
                            {nutritionStatus.weight.status.status}
            </Text>
                        )}
          </View>
                      
                      <View style={styles.recordDataRow}>
                        <Text style={styles.recordDataItem}>Tinggi: {item.height} cm</Text>
                        {nutritionStatus && (
                          <Text style={[styles.recordStatus, { color: nutritionStatus.height.status.color }]}>
                            {nutritionStatus.height.status.status}
                          </Text>
                        )}
        </View>

                      {item.head_circumference && (
                        <View style={styles.recordDataRow}>
                          <Text style={styles.recordDataItem}>L.Kepala: {item.head_circumference} cm</Text>
                          {nutritionStatus?.headCircumference && (
                            <Text style={[styles.recordStatus, { color: nutritionStatus.headCircumference.status.color }]}>
                              {nutritionStatus.headCircumference.status.category}
                            </Text>
                          )}
                        </View>
                      )}
                    </View>
                    
                    {item.notes && (
                      <Text style={styles.recordNotes}>{item.notes}</Text>
                    )}
                  </View>
                );
              }}
              scrollEnabled={false}
            />
          )}
         </View>
      </ScrollView>

      {/* Add/Edit Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingRecord ? 'Edit Data Pertumbuhan' : 'Tambah Data Pertumbuhan'}
           </Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={24} color="#666666" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Berat Badan (kg) *</Text>
              <TextInput
                style={styles.textInput}
                value={currentWeight}
                onChangeText={setCurrentWeight}
                placeholder="Masukkan berat badan"
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Tinggi Badan (cm) *</Text>
              <TextInput
                style={styles.textInput}
                value={currentHeight}
                onChangeText={setCurrentHeight}
                placeholder="Masukkan tinggi badan"
                keyboardType="numeric"
              />
            </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Lingkar Kepala (cm)</Text>
                <TextInput
                  style={styles.textInput}
                  value={currentHeadCircumference}
                  onChangeText={setCurrentHeadCircumference}
                  placeholder="Masukkan lingkar kepala"
                  keyboardType="numeric"
                />
          </View>
      </ScrollView>

            <View style={styles.modalFooter}>
          <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={() => setShowAddModal(false)}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.saveButton, loading && styles.saveButtonDisabled]} 
                onPress={handleSaveRecord}
                disabled={loading}
              >
                <Text style={styles.saveButtonText}>
                  {loading ? 'Menyimpan...' : 'Simpan'}
                </Text>
          </TouchableOpacity>
        </View>
               </View>
               </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelDelete}
      >
        <View style={styles.deleteModalOverlay}>
          <View style={styles.deleteModalContainer}>
            <View style={styles.deleteModalHeader}>
              <Ionicons name="warning" size={24} color="#FF6B6B" />
              <Text style={styles.deleteModalTitle}>Hapus Data Pertumbuhan</Text>
            </View>
            <Text style={styles.modalMessage}>
              Apakah Anda yakin ingin menghapus data pertumbuhan ini? 
              Tindakan ini tidak dapat dibatalkan.
           </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalCancelButton}
                onPress={handleCancelDelete}
              >
                <Text style={styles.modalCancelButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalDeleteButton}
                onPress={handleConfirmDelete}
              >
                <Text style={styles.modalDeleteButtonText}>Hapus</Text>
              </TouchableOpacity>
               </View>
               </View>
               </View>
      </Modal>
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
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
  },
  addButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childInfo: {
    alignItems: 'center',
  },
  childName: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  childAge: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  addDataSection: {
    marginBottom: 20,
  },
  addDataButton: {
    backgroundColor: '#FF6B9D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    gap: 8,
  },
  addDataButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#333333',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
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
  historySection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#666666',
    marginTop: 10,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#999999',
    marginTop: 5,
  },
  recordCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  recordDate: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333333',
  },
  recordActions: {
    flexDirection: 'row',
    gap: 15,
  },
  recordData: {
    marginTop: 10,
  },
  recordDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  recordDataItem: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#666666',
  },
  recordStatus: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  recordNotes: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#999999',
    marginTop: 8,
    fontStyle: 'italic',
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
  saveButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  // Delete Confirmation Modal Styles
  deleteModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  deleteModalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  deleteModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  deleteModalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
  },
  modalMessage: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    marginBottom: 20,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  modalCancelButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#666666',
  },
  modalDeleteButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
  },
  modalDeleteButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
});

export default NutritionScreen;