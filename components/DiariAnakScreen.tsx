import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  Alert,
  Image,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as ImagePicker from 'expo-image-picker';
import BottomNavbar from './BottomNavbar';
import api, { getImageUrl } from '../services/api';

const { width, height } = Dimensions.get('window');

interface DiariAnakScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

interface StickyNote {
  id: number;
  title: string;
  content: string;
  date: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

const DiariAnakScreen: React.FC<DiariAnakScreenProps> = ({ onBack, onNavigate }) => {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingNote, setEditingNote] = useState<StickyNote | null>(null);
  const [newNote, setNewNote] = useState({ title: '', content: '', image: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<StickyNote | null>(null);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/diary-entries');
      setNotes(response.data.data || []);
    } catch (error: any) {
      console.error('Error loading notes:', error);
      // If authentication error, redirect to welcome
      if (error.response?.status === 401) {
        onBack(); // This will go back to home, which will then redirect to welcome
        return;
      }
      Alert.alert('Error', 'Gagal memuat catatan diary');
    } finally {
      setIsLoading(false);
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3FB2E6" />
        <Text style={styles.loadingText}>Memuat...</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3FB2E6" />
        <Text style={styles.loadingText}>Memuat catatan diary...</Text>
      </View>
    );
  }

  const handleAddNote = async () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      Alert.alert('Error', 'Judul dan konten harus diisi');
      return;
    }

    try {
      setIsSaving(true);
      
      const formData = new FormData();
      formData.append('title', newNote.title);
      formData.append('content', newNote.content);
      
      if (newNote.image) {
        // Convert URI to File object for web compatibility
        const response = await fetch(newNote.image);
        const blob = await response.blob();
        const file = new File([blob], 'diary_image.jpg', { type: 'image/jpeg' });
        formData.append('image', file);
      }

      const response = await api.post('/diary-entries', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setNotes([response.data.data, ...notes]);
      setNewNote({ title: '', content: '', image: '' });
      setShowAddForm(false);
      Alert.alert('Berhasil', 'Catatan berhasil ditambahkan');
    } catch (error: any) {
      console.error('Error adding note:', error);
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        let errorMessage = 'Validation errors:\n';
        Object.keys(errors).forEach(key => {
          errorMessage += `• ${errors[key].join(', ')}\n`;
        });
        Alert.alert('Error', errorMessage);
      } else {
        Alert.alert('Error', 'Gagal menambahkan catatan');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteNote = (note: StickyNote) => {
    setNoteToDelete(note);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setNoteToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!noteToDelete) return;

    try {
      await api.delete(`/diary-entries/${noteToDelete.id}`);
      setNotes(notes.filter(note => note.id !== noteToDelete.id));
      setShowDeleteModal(false);
      setNoteToDelete(null);
    } catch (error) {
      console.error('Error deleting note:', error);
      Alert.alert('Error', 'Gagal menghapus catatan');
    }
  };

  const handleEditNote = (note: StickyNote) => {
    setEditingNote(note);
    setNewNote({
      title: note.title,
      content: note.content,
      image: note.image_url || ''
    });
    setShowAddForm(true);
  };

  const handleUpdateNote = async () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      Alert.alert('Error', 'Judul dan konten harus diisi');
      return;
    }

    if (!editingNote) return;

    try {
      setIsSaving(true);
      
      const formData = new FormData();
      formData.append('title', newNote.title);
      formData.append('content', newNote.content);
      formData.append('_method', 'PUT');
      
      if (newNote.image && newNote.image !== editingNote.image_url) {
        // Convert URI to File object for web compatibility
        const response = await fetch(newNote.image);
        const blob = await response.blob();
        const file = new File([blob], 'diary_image.jpg', { type: 'image/jpeg' });
        formData.append('image', file);
      }

      const response = await api.post(`/diary-entries/${editingNote.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setNotes(notes.map(note => 
        note.id === editingNote.id ? response.data.data : note
      ));
      
      setNewNote({ title: '', content: '', image: '' });
      setEditingNote(null);
      setShowAddForm(false);
      Alert.alert('Berhasil', 'Catatan berhasil diperbarui');
    } catch (error: any) {
      console.error('Error updating note:', error);
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        let errorMessage = 'Validation errors:\n';
        Object.keys(errors).forEach(key => {
          errorMessage += `• ${errors[key].join(', ')}\n`;
        });
        Alert.alert('Error', errorMessage);
      } else {
        Alert.alert('Error', 'Gagal memperbarui catatan');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const pickImage = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
      return;
    }

    // Direct access to gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setNewNote({ ...newNote, image: result.assets[0].uri });
    }
  };

  const removeImage = () => {
    setNewNote({ ...newNote, image: '' });
  };


  const renderStickyNote = (note: StickyNote) => (
    <View key={note.id} style={styles.stickyNote}>
      <View style={styles.noteHeader}>
        <Text style={styles.noteTitle}>{note.title}</Text>
        <View style={styles.noteActions}>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => handleEditNote(note)}
          >
            <Ionicons name="create-outline" size={18} color="#3FB2E6" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => handleDeleteNote(note)}
          >
            <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      </View>
      {note.image_url && (
        <View style={styles.noteImageContainer}>
          <Image source={{ uri: getImageUrl(note.image_url) || '' }} style={styles.noteImage} />
        </View>
      )}
      <Text style={styles.noteContent}>{note.content}</Text>
      <Text style={styles.noteDate}>
        {formatDate(note.date)}
      </Text>
    </View>
  );

  const renderAddForm = () => (
    <View style={styles.addFormContainer}>
      <Text style={styles.addFormTitle}>
        {editingNote ? 'Edit Catatan' : 'Tambah Catatan Baru'}
      </Text>
      <TextInput
        style={styles.titleInput}
        placeholder="Judul catatan..."
        placeholderTextColor="#999999"
        value={newNote.title}
        onChangeText={(text) => setNewNote({ ...newNote, title: text })}
      />
      
      {/* Photo Upload Section */}
      <View style={styles.photoSection}>
        <Text style={styles.photoSectionTitle}>Foto Dokumentasi</Text>
        {newNote.image ? (
          <View style={styles.selectedImageContainer}>
            <Image source={{ uri: getImageUrl(newNote.image) || newNote.image }} style={styles.selectedImage} />
            <TouchableOpacity style={styles.removeImageButton} onPress={removeImage}>
              <Ionicons name="close-circle" size={24} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.photoUploadButton} onPress={pickImage}>
            <Ionicons name="images" size={32} color="#3FB2E6" />
            <Text style={styles.photoUploadText}>Pilih dari Galeri</Text>
            <Text style={styles.photoUploadSubtext}>Dokumentasi momen berharga</Text>
          </TouchableOpacity>
        )}
      </View>

      <TextInput
        style={styles.contentInput}
        placeholder="Tulis catatan Anda di sini..."
        placeholderTextColor="#999999"
        value={newNote.content}
        onChangeText={(text) => setNewNote({ ...newNote, content: text })}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
      <View style={styles.formButtons}>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => {
            setShowAddForm(false);
            setEditingNote(null);
            setNewNote({ title: '', content: '', image: '' });
          }}
        >
          <Text style={styles.cancelButtonText}>Batal</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={editingNote ? handleUpdateNote : handleAddNote}
          disabled={isSaving}
        >
          <Text style={styles.saveButtonText}>
            {isSaving ? 'Menyimpan...' : (editingNote ? 'Update' : 'Simpan')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <View style={styles.backButtonCircle}>
            <Ionicons name="arrow-back" size={20} color="#000000" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Diari Anak</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowAddForm(true)}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Add Form */}
        {showAddForm && renderAddForm()}

        {/* Notes Grid */}
        <View style={styles.notesContainer}>
          <Text style={styles.sectionTitle}>Catatan Perkembangan</Text>
          <View style={styles.notesGrid}>
            {notes.map(renderStickyNote)}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      {onNavigate && <BottomNavbar currentScreen="konten" onNavigate={onNavigate} />}

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Ionicons name="warning" size={24} color="#FF6B6B" />
              <Text style={styles.modalTitle}>Hapus Catatan</Text>
            </View>
            <Text style={styles.modalMessage}>
              Apakah Anda yakin ingin menghapus catatan "{noteToDelete?.title}"? 
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FFF5F5',
  },
  backButton: {
    padding: 5,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B9D',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollView: {
    flex: 1,
  },
  addFormContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addFormTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginBottom: 15,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    marginBottom: 15,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    marginBottom: 20,
    minHeight: 100,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#666666',
  },
  saveButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6B9D',
    marginLeft: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  notesContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginBottom: 20,
  },
  notesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  stickyNote: {
    width: (width - 60) / 2,
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    flex: 1,
    marginRight: 10,
  },
  noteActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    padding: 8,
    borderRadius: 15,
    backgroundColor: 'rgba(63, 178, 230, 0.1)',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  noteContent: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#333333',
    lineHeight: 20,
    marginBottom: 10,
  },
  noteDate: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
  },
  bottomSpacing: {
    height: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#666666',
    marginTop: 16,
  },
  // Photo upload styles
  photoSection: {
    marginBottom: 20,
  },
  photoSectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginBottom: 10,
  },
  photoUploadButton: {
    borderWidth: 2,
    borderColor: '#3FB2E6',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F8FCFF',
  },
  photoUploadText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#3FB2E6',
    marginTop: 8,
    marginBottom: 4,
  },
  photoUploadSubtext: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
  },
  selectedImageContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 4,
  },
  noteImageContainer: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  noteImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    minWidth: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginLeft: 10,
  },
  modalMessage: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    lineHeight: 22,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 10,
    alignItems: 'center',
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
    backgroundColor: '#FF6B6B',
    marginLeft: 10,
    alignItems: 'center',
  },
  modalDeleteButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
});

export default DiariAnakScreen;
