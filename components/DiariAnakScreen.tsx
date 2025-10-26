import React, { useState } from 'react';
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
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');

interface DiariAnakScreenProps {
  onBack: () => void;
}

interface StickyNote {
  id: string;
  title: string;
  content: string;
  date: string;
  color: string;
  image?: string;
}

const DiariAnakScreen: React.FC<DiariAnakScreenProps> = ({ onBack }) => {
  const [notes, setNotes] = useState<StickyNote[]>([
    {
      id: '1',
      title: 'Pertama kali berjalan',
      content: 'Hari ini anak sudah bisa berjalan sendiri tanpa bantuan! Sangat bangga melihat perkembangannya.',
      date: '13 Oktober 2025',
      color: '#FFE5B4'
    }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', image: '' });

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleAddNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note: StickyNote = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        date: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        color: '#E5F3FF',
        image: newNote.image
      };
      setNotes([note, ...notes]);
      setNewNote({ title: '', content: '', image: '' });
      setShowAddForm(false);
    } else {
      Alert.alert('Error', 'Judul dan konten harus diisi');
    }
  };

  const handleDeleteNote = (id: string) => {
    Alert.alert(
      'Hapus Catatan',
      'Apakah Anda yakin ingin menghapus catatan ini?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive', onPress: () => setNotes(notes.filter(note => note.id !== id)) }
      ]
    );
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

  const handleDeleteAllNotes = () => {
    Alert.alert(
      'Hapus Semua Catatan',
      'Apakah Anda yakin ingin menghapus semua catatan diary? Tindakan ini tidak dapat dibatalkan.',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Hapus Semua', 
          style: 'destructive', 
          onPress: () => setNotes([]) 
        }
      ]
    );
  };

  const renderStickyNote = (note: StickyNote) => (
    <View key={note.id} style={[styles.stickyNote, { backgroundColor: note.color }]}>
      <View style={styles.noteHeader}>
        <Text style={styles.noteTitle}>{note.title}</Text>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDeleteNote(note.id)}
        >
          <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
      {note.image && (
        <View style={styles.noteImageContainer}>
          <Image source={{ uri: note.image }} style={styles.noteImage} />
        </View>
      )}
      <Text style={styles.noteContent}>{note.content}</Text>
      <Text style={styles.noteDate}>{note.date}</Text>
    </View>
  );

  const renderAddForm = () => (
    <View style={styles.addFormContainer}>
      <Text style={styles.addFormTitle}>Tambah Catatan Baru</Text>
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
            <Image source={{ uri: newNote.image }} style={styles.selectedImage} />
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
            setNewNote({ title: '', content: '', image: '' });
          }}
        >
          <Text style={styles.cancelButtonText}>Batal</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleAddNote}
        >
          <Text style={styles.saveButtonText}>Simpan</Text>
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
          {notes.length > 0 && (
            <TouchableOpacity 
              style={styles.deleteAllButton}
              onPress={handleDeleteAllNotes}
            >
              <Ionicons name="trash" size={20} color="#FF6B6B" />
            </TouchableOpacity>
          )}
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
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={onBack}
        >
          <View style={styles.navIcon}>
            <Ionicons name="home" size={24} color="#000000" />
          </View>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={onBack}
        >
          <View style={styles.navIcon}>
            <Ionicons name="book" size={24} color="#000000" />
          </View>
          <Text style={styles.navLabel}>Konten</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={onBack}
        >
          <View style={styles.navIcon}>
            <Ionicons name="chatbubbles" size={24} color="#000000" />
          </View>
          <Text style={styles.navLabel}>Chat Dokter</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={onBack}
        >
          <View style={styles.navIcon}>
            <Ionicons name="person" size={24} color="#000000" />
          </View>
          <Text style={styles.navLabel}>Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={onBack}
        >
          <View style={styles.navIcon}>
            <Ionicons name="card" size={24} color="#000000" />
          </View>
          <Text style={styles.navLabel}>Transaksi</Text>
        </TouchableOpacity>
      </View>
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
  deleteAllButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FF6B6B',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  navLabel: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    textAlign: 'center',
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
});

export default DiariAnakScreen;
