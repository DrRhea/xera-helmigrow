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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import BottomNavbar from './BottomNavbar';
import { doctorQAData, quickQuestions, DoctorQA } from '../data/doctorQA';

const { width, height } = Dimensions.get('window');

interface ChatDoctorScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

const ChatDoctorScreen: React.FC<ChatDoctorScreenProps> = ({ onBack, onNavigate }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Halo! Saya Dr. Helmi, asisten dokter virtual Anda. Ada yang bisa saya bantu terkait kesehatan dan tumbuh kembang anak?',
      sender: 'doctor',
      timestamp: new Date().toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
    },
  ]);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleQuickQuestion = (question: string) => {
    // Add user question
    const userMessage = {
      id: messages.length + 1,
      text: question,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
    };
    
    // Find matching answer
    const qaItem = doctorQAData.find(item => 
      item.question.toLowerCase().includes(question.toLowerCase()) ||
      question.toLowerCase().includes(item.question.toLowerCase().split(' ')[0])
    );
    
    const doctorAnswer = qaItem ? qaItem.answer : 
      'Maaf, saya belum memiliki informasi yang cukup untuk menjawab pertanyaan tersebut. Silakan pilih pertanyaan lain atau konsultasi langsung dengan dokter anak terdekat.';
    
    const doctorMessage = {
      id: messages.length + 2,
      text: doctorAnswer,
      sender: 'doctor',
      timestamp: new Date().toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
    };
    
    setMessages([...messages, userMessage, doctorMessage]);
    setShowQuickQuestions(false);
  };

  const handleNewQuestion = () => {
    setShowQuickQuestions(true);
  };

  const renderMessage = (msg: any) => (
    <View key={msg.id} style={styles.messageContainer}>
      {msg.sender === 'doctor' ? (
        <View style={styles.doctorMessage}>
          <View style={styles.doctorAvatar}>
            <Image
              source={require('../assets/logo-helmigrowth.png')}
              style={styles.avatarImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.doctorMessageBubble}>
            <Text style={styles.doctorName}>Dr. Helmi</Text>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.userMessage}>
          <View style={styles.userMessageBubble}>
            <Text style={styles.userMessageText}>{msg.text}</Text>
          </View>
        </View>
      )}
    </View>
  );

  const renderQuickQuestion = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.quickQuestionButton}
      onPress={() => handleQuickQuestion(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.quickQuestionText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <View style={styles.backButtonCircle}>
            <Ionicons name="arrow-back" size={20} color="#000000" />
          </View>
        </TouchableOpacity>
        <View style={styles.doctorInfo}>
          <View style={styles.doctorAvatar}>
            <Image
              source={require('../assets/logo-helmigrowth.png')}
              style={styles.avatarImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.doctorName}>Dr. Helmi</Text>
        </View>
      </View>

      {/* Chat Messages */}
      <ScrollView 
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(renderMessage)}
        
        {/* Quick Questions */}
        {showQuickQuestions && (
          <View style={styles.quickQuestionsContainer}>
            <Text style={styles.quickQuestionsTitle}>Pilih pertanyaan yang ingin Anda tanyakan:</Text>
            <FlatList
              data={quickQuestions}
              renderItem={renderQuickQuestion}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={styles.quickQuestionsList}
            />
          </View>
        )}
        
        {/* New Question Button */}
        {!showQuickQuestions && (
          <View style={styles.newQuestionContainer}>
            <TouchableOpacity 
              style={styles.newQuestionButton}
              onPress={handleNewQuestion}
              activeOpacity={0.7}
            >
              <Ionicons name="add-circle-outline" size={20} color="#FF6B9D" />
              <Text style={styles.newQuestionText}>Tanya Hal Lain</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      {onNavigate && <BottomNavbar currentScreen="chat" onNavigate={onNavigate} />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
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
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  doctorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF6B9D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarImage: {
    width: 30,
    height: 30,
  },
  doctorName: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FF6B9D',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  chatContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 100, // Extra padding untuk bottom navbar
  },
  messageContainer: {
    marginBottom: 16,
  },
  doctorMessage: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  doctorMessageBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginLeft: 12,
    maxWidth: width * 0.7,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  userMessage: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  userMessageBubble: {
    backgroundColor: '#FF6B9D',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: width * 0.7,
  },
  messageText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    lineHeight: 20,
  },
  userMessageText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
    lineHeight: 20,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B9D',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  // Quick Questions Styles
  quickQuestionsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  quickQuestionsTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333333',
    marginBottom: 15,
    textAlign: 'center',
  },
  quickQuestionsList: {
    gap: 10,
  },
  quickQuestionButton: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  quickQuestionText: {
    fontSize: 13,
    fontFamily: 'Poppins_500Medium',
    color: '#495057',
    textAlign: 'center',
    lineHeight: 18,
  },
  // New Question Button Styles
  newQuestionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  newQuestionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#FF6B9D',
  },
  newQuestionText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FF6B9D',
    marginLeft: 8,
  },
});

export default ChatDoctorScreen;
