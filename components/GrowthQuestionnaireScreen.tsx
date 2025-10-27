import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import questionnaireService, { QuestionnaireSubmission } from '../services/questionnaireService';

const { width, height } = Dimensions.get('window');

interface Question {
  id: number;
  question: string;
  category: 'Gerak kasar' | 'Sosialisasi dan kemandirian' | 'Bicara dan bahasa' | 'Gerak halus';
  hasImage: boolean;
  imagePath?: string;
}

interface GrowthQuestionnaireScreenProps {
  onBack: () => void;
  childData: {
    id: number;
    name: string;
    birth_date: string;
    gender: string;
  };
}

const GrowthQuestionnaireScreen: React.FC<GrowthQuestionnaireScreenProps> = ({ onBack, childData }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: boolean | null }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // Calculate child's age in months
  const calculateAgeInMonths = () => {
    const birthDate = new Date(childData.birth_date);
    const today = new Date();
    const ageInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + 
                       (today.getMonth() - birthDate.getMonth());
    
    // Batasi usia maksimal 60 bulan (5 tahun) untuk bayi
    return Math.min(ageInMonths, 60);
  };

  // Format usia untuk display
  const getAgeDisplay = () => {
    const ageInMonths = calculateAgeInMonths();
    const ageYears = Math.floor(ageInMonths / 12);
    const ageMonths = ageInMonths % 12;
    
    if (ageInMonths > 60) {
      return `${ageYears} Tahun ${ageMonths} Bulan (Di atas batas usia assessment)`;
    } else if (ageYears > 0) {
      return `${ageYears} Tahun ${ageMonths} Bulan`;
    } else {
      return `${ageMonths} Bulan`;
    }
  };

  // Load questions based on child's age
  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setIsLoading(true);
      const ageInMonths = calculateAgeInMonths();
      
      // Validasi usia maksimal 60 bulan
      if (ageInMonths > 60) {
        Alert.alert(
          'Usia Tidak Sesuai', 
          'Sistem kuesioner tumbuh kembang ini khusus untuk bayi dan balita hingga usia 5 tahun (60 bulan). Silakan konsultasi dengan dokter untuk anak di atas 5 tahun.',
          [{ text: 'OK', onPress: () => onBack() }]
        );
        return;
      }
      
      // Determine which questionnaire to load based on age
      let questionnaireData: Question[] = [];
      
      if (ageInMonths >= 0 && ageInMonths <= 3) {
        questionnaireData = getQuestionsFor0To3Months();
      } else if (ageInMonths >= 4 && ageInMonths <= 6) {
        questionnaireData = getQuestionsFor4To6Months();
      } else if (ageInMonths >= 7 && ageInMonths <= 9) {
        questionnaireData = getQuestionsFor7To9Months();
      } else if (ageInMonths >= 10 && ageInMonths <= 12) {
        questionnaireData = getQuestionsFor10To12Months();
      } else if (ageInMonths >= 13 && ageInMonths <= 18) {
        questionnaireData = getQuestionsFor13To18Months();
      } else if (ageInMonths >= 19 && ageInMonths <= 24) {
        questionnaireData = getQuestionsFor19To24Months();
      } else if (ageInMonths >= 25 && ageInMonths <= 36) {
        questionnaireData = getQuestionsFor25To36Months();
      } else if (ageInMonths >= 37 && ageInMonths <= 48) {
        questionnaireData = getQuestionsFor37To48Months();
      } else if (ageInMonths >= 49 && ageInMonths <= 60) {
        questionnaireData = getQuestionsFor49To60Months();
      } else {
        questionnaireData = getQuestionsFor0To3Months(); // Default fallback
      }
      
      setQuestions(questionnaireData);
      
      // Initialize answers
      const initialAnswers: { [key: number]: boolean | null } = {};
      questionnaireData.forEach(q => {
        initialAnswers[q.id] = null;
      });
      setAnswers(initialAnswers);
      
    } catch (error) {
      console.error('Failed to load questions:', error);
      Alert.alert('Error', 'Gagal memuat kuesioner');
    } finally {
      setIsLoading(false);
    }
  };

  // Questions for 0-3 months (based on the image)
  const getQuestionsFor0To3Months = (): Question[] => [
    {
      id: 1,
      question: "Apakah bayi Anda dapat menggerakkan lengan dan tungkai dengan mudah?",
      category: "Gerak kasar",
      hasImage: false
    },
    {
      id: 2,
      question: "Apakah bayi Anda dapat melihat dan menatap wajah Anda?",
      category: "Sosialisasi dan kemandirian",
      hasImage: false
    },
    {
      id: 3,
      question: "Apakah bayi Anda dapat tersenyum kembali ketika Anda tersenyum?",
      category: "Sosialisasi dan kemandirian",
      hasImage: false
    },
    {
      id: 4,
      question: "Apakah bayi Anda dapat mengeluarkan suara-suara lain (mengoceh) selain menangis?",
      category: "Bicara dan bahasa",
      hasImage: false
    },
    {
      id: 5,
      question: "Apakah bayi Anda dapat tertawa keras?",
      category: "Bicara dan bahasa",
      hasImage: false
    },
    {
      id: 6,
      question: "Apakah bayi Anda dapat menggerakkan kepalanya dari satu sisi ke sisi yang lain?",
      category: "Gerak halus",
      hasImage: true,
      imagePath: "head_movement"
    },
    {
      id: 7,
      question: "Apakah bayi Anda dapat menggerakkan kepalanya ke tengah ketika berbaring?",
      category: "Gerak halus",
      hasImage: true,
      imagePath: "head_center"
    },
    {
      id: 8,
      question: "Apakah bayi Anda dapat mengangkat kepalanya ketika berbaring tengkurap?",
      category: "Gerak kasar",
      hasImage: true,
      imagePath: "head_lift_basic"
    },
    {
      id: 9,
      question: "Apakah bayi Anda dapat mengangkat kepalanya membentuk sudut 45° ketika berbaring tengkurap?",
      category: "Gerak kasar",
      hasImage: true,
      imagePath: "head_lift_45"
    },
    {
      id: 10,
      question: "Apakah bayi Anda dapat mengangkat kepalanya dengan tegak ketika berbaring tengkurap?",
      category: "Gerak kasar",
      hasImage: true,
      imagePath: "head_lift_upright"
    }
  ];

  // Questions for 4-6 months
  const getQuestionsFor4To6Months = (): Question[] => [
    {
      id: 1,
      question: "Bayi diposisikan terlentang. Ambil gulungan wool merah, letakkan di atas wajah di depan mata bayi. Gerakkan wool dari samping kiri ke kanan kepala. Apakah ia dapat mengikuti gerakan Anda sepenuhnya dari satu ke sisi yang lain?",
      category: "Gerak halus",
      hasImage: true,
      imagePath: "follow_red_wool"
    },
    {
      id: 2,
      question: "Pada posisi bayi terlentang, pegang kedua tangannya lalu tarik perlahan ke posisi duduk. Dapatkah bayi mempertahankan lehernya secara kaku? Jawab 'Tidak' bila kepala bayi jatuh kembali seperti gambar.",
      category: "Gerak kasar",
      hasImage: true,
      imagePath: "neck_control"
    },
    {
      id: 3,
      question: "Ketika bayi tengkurap di alas yang datar, apakah ia dapat mengangkat kedua lengannya sebagai penyangga seperti pada gambar?",
      category: "Gerak kasar",
      hasImage: true,
      imagePath: "prone_arm_support"
    },
    {
      id: 4,
      question: "Bayi dipangku orang tua atau pengasuh. Dapatkah bayi mempertahankan posisi kepala dalam keadaan tegak dan stabil? Jawab 'Tidak' bila kepala bayi cenderung jatuh ke kanan, kiri, atau ke dadanya.",
      category: "Gerak kasar",
      hasImage: false
    },
    {
      id: 5,
      question: "Bayi dipangku orang tua atau pengasuh. Sentuhkan pensil di punggung tangan atau ujung jari bayi (jangan meletakkan di atas telapak tangan bayi). Apakah bayi dapat menggenggam pensil itu selama beberapa detik?",
      category: "Gerak halus",
      hasImage: true,
      imagePath: "grasp_pencil"
    },
    {
      id: 6,
      question: "Bayi dipangku orang tua atau pengasuh. Dapatkah bayi mengarahkan matanya pada benda kecil sebesar kacang, kismis atau uang logam? Jawab 'Tidak' jika ia tidak dapat mengarahkan matanya.",
      category: "Gerak halus",
      hasImage: false
    },
    {
      id: 7,
      question: "Bayi dipangku orang tua atau pengasuh. Dapatkah bayi meraih mainan yang diletakkan agak jauh namun masih berada dalam jangkauan tangannya?",
      category: "Gerak halus",
      hasImage: false
    },
    {
      id: 8,
      question: "Tanyakan kepada orang tua atau pengasuh, pernahkah bayi berbalik paling sedikit 2 kali, dari terlentang ke tengkurap atau sebaliknya?",
      category: "Gerak kasar",
      hasImage: false
    },
    {
      id: 9,
      question: "Tanyakan kepada orang tua atau pengasuh, pernahkah bayi mengeluarkan suara gembira bernada tinggi atau memekik tetapi bukan menangis?",
      category: "Bicara dan bahasa",
      hasImage: false
    },
    {
      id: 10,
      question: "Tanyakan kepada orang tua atau pengasuh, pernahkah orang tua atau pengasuh melihat bayi tersenyum ketika melihat mainan yang lucu, gambar, atau binatang peliharaan pada saat ia bermain sendiri?",
      category: "Sosialisasi dan kemandirian",
      hasImage: false
    }
  ];

  // Questions for 7-9 months
  const getQuestionsFor7To9Months = (): Question[] => [
    {
      id: 1,
      question: "Bayi dipangku orang tua atau pengasuh. Taruh kismis di atas meja. Dapatkah bayi memungut dengan tangannya benda-benda kecil (kismis, kacang-kacangan, potongan biskuit) dengan gerakan miring atau menggerapai seperti gambar?",
      category: "Gerak halus",
      hasImage: true,
      imagePath: "pickup_small_objects"
    },
    {
      id: 2,
      question: "Bayi dipangku orang tua atau pengasuh. Taruh 2 kubus di atas meja, buat agar bayi dapat memungut dan memegang kubus pada masing-masing tangannya. Dapatkah ia melakukannya?",
      category: "Gerak halus",
      hasImage: false
    },
    {
      id: 3,
      question: "Bayi dipangku orang tua atau pengasuh. Tarik perhatian bayi dengan memperlihatkan gulungan wool merah, kemudian jatuhkan ke lantai. Apakah bayi mencoba mencari benda tersebut, misalnya mencari di bawah meja atau di belakang kursi?",
      category: "Gerak halus",
      hasImage: false
    },
    {
      id: 4,
      question: "Bayi dipangku orang tua atau pengasuh. Letakkan suatu mainan yang diinginkan bayi di luar jangkauannya, apakah ia mencoba mendapatkan mainan dengan mengulurkan lengan atau badannya?",
      category: "Sosialisasi dan kemandirian",
      hasImage: false
    },
    {
      id: 5,
      question: "Tanyakan kepada orang tua atau pengasuh, apakah bayi menengok ke belakang seperti mendengar kedatangan seseorang pada saat bayi sedang bermain sendiri dan seseorang diam-diam datang berdiri di belakangnya? Suara keras tidak ikut dihitung. Jawab 'Ya' hanya jika melihat reaksinya terhadap suara yang perlahan atau bisikan.",
      category: "Bicara dan bahasa",
      hasImage: false
    },
    {
      id: 6,
      question: "Tanyakan kepada orang tua atau pengasuh, apakah anak dapat mengatakan 2 suku kata yang sama, misalnya: 'Ma-ma', 'Da-da' atau 'Pa-pa'? Jawab 'Ya' bila ia dapat mengeluarkan salah satu suara tersebut.",
      category: "Bicara dan bahasa",
      hasImage: false
    },
    {
      id: 7,
      question: "Tanyakan kepada orang tua atau pengasuh, apakah bayi dapat makan kue kering sendiri?",
      category: "Sosialisasi dan kemandirian",
      hasImage: false
    },
    {
      id: 8,
      question: "Tanyakan kepada orang tua atau pengasuh apakah pernah melihat bayi memindahkan mainan atau kue kering dari satu tangan ke tangan yang lain? Benda-benda panjang seperti sendok atau kerincingan bertangkai tidak ikut dinilai.",
      category: "Gerak halus",
      hasImage: false
    },
    {
      id: 9,
      question: "Tanpa disangga oleh bantal, kursi atau dinding, dapatkah bayi duduk sendiri selama 60 detik?",
      category: "Gerak kasar",
      hasImage: true,
      imagePath: "sit_alone"
    },
    {
      id: 10,
      question: "Jika Anda mengangkat bayi melalui ketiaknya ke posisi berdiri, dapatkah ia menyangga sebagian berat badan dengan kedua kakinya? Jawab 'Ya' bila ia mencoba berdiri dan sebagian berat badannya ditopang oleh kakinya.",
      category: "Gerak kasar",
      hasImage: false
    }
  ];

  // Questions for 10-12 months
  const getQuestionsFor10To12Months = (): Question[] => [
    {
      id: 1,
      question: "Bayi dipangku orang tua atau pengasuh. Letakkan pensil di telapak tangan anak. Coba ambil pensil tersebut dengan perlahan-lahan. Apakah anak menggenggam pensil dengan erat dan Anda merasa kesulitan mendapatkan pensil itu kembali?",
      category: "Gerak halus",
      hasImage: false
    },
    {
      id: 2,
      question: "Bayi dipangku orang tua atau pengasuh. Letakkan kismis di atas meja. Dapatkah anak memungut dengan tangannya benda-benda kecil seperti kacang-kacangan, potongan biskuit dengan gerakan miring atau menggerapai seperti gambar?",
      category: "Gerak halus",
      hasImage: true,
      imagePath: "pickup_small_objects_12m"
    },
    {
      id: 3,
      question: "Bayi dipangku orang tua atau pengasuh. Berikan 2 kubus kepada bayi. Tanpa bantuan, apakah anak dapat mempertemukan 2 kubus kecil yang ia pegang?",
      category: "Gerak halus",
      hasImage: false
    },
    {
      id: 4,
      question: "Sebut 2-3 kata yang dapat ditiru oleh anak (tidak perlu kata-kata yang lengkap). Apakah ia mencoba meniru kata-kata tadi?",
      category: "Bicara dan bahasa",
      hasImage: false
    },
    {
      id: 5,
      question: "Tanyakan kepada ibu atau pengasuh, apakah anak dapat mengangkat badannya ke posisi berdiri tanpa bantuan?",
      category: "Gerak kasar",
      hasImage: false
    },
    {
      id: 6,
      question: "Tanyakan kepada ibu atau pengasuh, apakah anak dapat duduk sendiri tanpa bantuan dari posisi tidur atau tengkurap?",
      category: "Gerak kasar",
      hasImage: false
    },
    {
      id: 7,
      question: "Tanyakan kepada ibu atau pengasuh, apakah anak dapat memahami makna kata 'jangan'?",
      category: "Bicara dan bahasa",
      hasImage: false
    },
    {
      id: 8,
      question: "Tanyakan kepada ibu atau pengasuh, apakah anak akan mencari atau terlihat mengharapkan muncul kembali jika ibu atau pengasuh bersembunyi di belakang sesuatu atau di pojok, kemudian muncul dan menghilang secara berulang-ulang di hadapan anak?",
      category: "Sosialisasi dan kemandirian",
      hasImage: false
    },
    {
      id: 9,
      question: "Tanyakan kepada ibu atau pengasuh, apakah anak dapat membedakan ibu atau pengasuh dengan orang yang belum ia kenal? Ia akan menunjukkan sikap malu-malu atau ragu-ragu pada saat permulaan bertemu dengan orang yang belum dikenalnya.",
      category: "Sosialisasi dan kemandirian",
      hasImage: false
    },
    {
      id: 10,
      question: "Berdirikan anak. Apakah anak dapat berdiri dengan berpegangan pada kursi atau meja selama 30 detik atau lebih?",
      category: "Gerak kasar",
      hasImage: false
    }
  ];
  // Questions for 13-18 months
  const getQuestionsFor13To18Months = (): Question[] => [
    {
      id: 1,
      question: "Bayi dipangku orang tua atau pengasuh. Berikan 2 kubus kepada anak. Tanpa bantuan, apakah anak dapat mempertemukan 2 kubus kecil yang ia pegang?",
      category: "Gerak halus",
      hasImage: false
    },
    {
      id: 2,
      question: "Bayi dipangku orang tua atau pengasuh. Berikan sebuah kubus dan cangkir. Apakah anak dapat memasukkan 1 kubus ke dalam cangkir?",
      category: "Gerak halus",
      hasImage: false
    },
    {
      id: 3,
      question: "Tanyakan kepada orang tua atau pengasuh, apakah anak dapat berjalan dengan berpegangan?",
      category: "Gerak kasar",
      hasImage: false
    },
    {
      id: 4,
      question: "Tanyakan kepada orang tua atau pengasuh, apakah anak dapat mengatakan 'papa' ketika ia memanggil atau melihat ayahnya, atau mengatakan 'mama' jika memanggil atau melihat ibunya? Jawab 'Ya' bila anak mengatakan salah satu di antaranya.",
      category: "Bicara dan bahasa",
      hasImage: false
    },
    {
      id: 5,
      question: "Tanyakan kepada orang tua atau pengasuh, apakah anak dapat mengucapkan 1 kata yang bermakna selain 'mama', 'papa', atau nama panggilan orang?",
      category: "Bicara dan bahasa",
      hasImage: false
    },
    {
      id: 6,
      question: "Tanyakan kepada orang tua atau pengasuh, apakah anak dapat bertepuk tangan atau melambai-lambai tanpa bantuan? Jawab 'Tidak' bila ia membutuhkan bantuan.",
      category: "Sosialisasi dan kemandirian",
      hasImage: false
    },
    {
      id: 7,
      question: "Tanyakan kepada orang tua atau pengasuh, apakah anak dapat menunjukkan apa yang diinginkannya tanpa menangis atau merengek? Jawab 'Ya' bila ia menunjuk, menarik atau mengeluarkan suara yang menyenangkan.",
      category: "Sosialisasi dan kemandirian",
      hasImage: false
    },
    {
      id: 8,
      question: "Coba dirikan anak. Apakah anak dapat berdiri sendiri tanpa berpegangan selama 30 detik atau lebih?",
      category: "Gerak kasar",
      hasImage: false
    },
    {
      id: 9,
      question: "Letakkan kubus di lantai, tanpa berpegangan atau menyentuh lantai, apakah anak dapat membungkuk untuk memungut kubus di lantai dan kemudian berdiri kembali?",
      category: "Gerak kasar",
      hasImage: false
    },
    {
      id: 10,
      question: "Apakah anak dapat berjalan di sepanjang ruangan tanpa jatuh atau terhuyung-huyung?",
      category: "Gerak kasar",
      hasImage: false
    }
  ];

  // Questions for 19-24 months
  const getQuestionsFor19To24Months = (): Question[] => [
    {
      id: 1,
      question: "Bayi dipangku orang tua atau pengasuh. Berikan anak sebuah pensil dan kertas. Apakah anak dapat mencoret-coret kertas tanpa bantuan atau petunjuk?",
      category: "Gerak halus",
      hasImage: false
    },
    {
      id: 2,
      question: "Tanyakan kepada orang tua atau pengasuh, apakah anak dapat menyebutkan sedikitnya 3 kata yang bermakna?",
      category: "Bicara dan bahasa",
      hasImage: false
    },
    {
      id: 3,
      question: "Tanyakan kepada orang tua atau pengasuh, apakah anak dapat menunjukkan apa yang diinginkannya tanpa menangis atau merengek?",
      category: "Sosialisasi dan kemandirian",
      hasImage: false
    },
    {
      id: 4,
      question: "Tanyakan kepada orang tua atau pengasuh, apakah anak dapat minum dari cangkir atau gelas sendiri tanpa banyak yang tumpah?",
      category: "Sosialisasi dan kemandirian",
      hasImage: false
    },
    {
      id: 5,
      question: "Tanyakan kepada orang tua atau pengasuh, apakah anak suka meniru bila ibu atau pengasuh sedang melakukan pekerjaan rumah tangga (merapikan mainan, menyapu, dll)?",
      category: "Sosialisasi dan kemandirian",
      hasImage: false
    },
    {
      id: 6,
      question: "Gelindingkan bola tenis ke arah anak. Apakah anak dapat menggelindingkan atau melempar bola tersebut kembali kepada Anda?",
      category: "Gerak halus",
      hasImage: false
    },
    {
      id: 7,
      question: "Letakkan kubus di lantai, tanpa berpegangan atau menyentuh lantai, apakah anak dapat membungkuk untuk memungut kubus di lantai dan kemudian berdiri kembali?",
      category: "Gerak kasar",
      hasImage: false
    },
    {
      id: 8,
      question: "Minta anak untuk berjalan sepanjang ruangan. Dapatkah ia berjalan tanpa terhuyung-huyung atau terjatuh?",
      category: "Gerak kasar",
      hasImage: false
    },
    {
      id: 9,
      question: "Dapatkah anak berjalan mundur minimal 5 langkah tanpa kehilangan keseimbangan?",
      category: "Gerak kasar",
      hasImage: false
    },
    {
      id: 10,
      question: "Berikan anak perintah berikut ini dengan bantuan telunjuk atau isyarat: 'Ambil kertas' 'Ambil pensil' 'Tutup pintu' Dapatkah anak melakukan perintah tersebut dengan bantuan telunjuk atau isyarat?",
      category: "Bicara dan bahasa",
      hasImage: false
    }
  ];

  // Questions for 25-36 months
  const getQuestionsFor25To36Months = (): Question[] => [
    {
      id: 1,
      question: "Bayi dipangku orang tua atau pengasuh. Berikan anak sebuah pensil dan kertas. Apakah anak dapat mencoret-coret kertas tanpa bantuan atau petunjuk?",
      category: "Gerak halus",
      hasImage: false
    },
    {
      id: 2,
      question: "Bayi dipangku orang tua atau pengasuh. Minta anak untuk menyusun kubus. Apakah anak dapat menyusun 2 kubus?",
      category: "Gerak halus",
      hasImage: false
    },
    {
      id: 3,
      question: "Bayi dipangku orang tua atau pengasuh. Tunjukkan gambar di bawah pada anak dan minta ia untuk menunjuk gambar sesuai dengan yang Anda sebutkan namanya. Apakah anak dapat menunjuk minimal 1 gambar?",
      category: "Bicara dan bahasa",
      hasImage: true,
      imagePath: "point_pictures"
    },
    {
      id: 4,
      question: "Bayi dipangku orang tua atau pengasuh. Tanpa bimbingan, petunjuk, atau bantuan Anda, dapatkah anak menunjuk paling sedikit 1 bagian tubuhnya dengan benar (rambut, mata, hidung, mulut, atau bagian badan yang lain)?",
      category: "Bicara dan bahasa",
      hasImage: false
    },
    {
      id: 5,
      question: "Tanyakan kepada orang tua atau pengasuh, apakah anak dapat mengucapkan minimal 7 kata yang mempunyai arti (selain kata 'mama' dan 'papa')?",
      category: "Bicara dan bahasa",
      hasImage: false
    },
    {
      id: 6,
      question: "Tanyakan kepada orang tua atau pengasuh, apakah anak dapat minum dari cangkir atau gelas sendiri tanpa banyak yang tumpah?",
      category: "Sosialisasi dan kemandirian",
      hasImage: false
    },
    {
      id: 7,
      question: "Tanyakan kepada orang tua atau pengasuh, apakah anak suka meniru bila ibu atau pengasuh sedang melakukan pekerjaan rumah tangga (merapikan mainan, menyapu, dll)?",
      category: "Sosialisasi dan kemandirian",
      hasImage: false
    },
    {
      id: 8,
      question: "Tanyakan kepada orang tua atau pengasuh, apakah anak dapat berlari tanpa terjatuh?",
      category: "Gerak kasar",
      hasImage: false
    },
    {
      id: 9,
      question: "Letakkan kubus di lantai, tanpa berpegangan atau menyentuh lantai, apakah anak dapat membungkuk untuk memungut kubus di lantai dan kemudian berdiri kembali?",
      category: "Gerak kasar",
      hasImage: false
    },
    {
      id: 10,
      question: "Dapatkah anak berjalan mundur minimal 5 langkah tanpa kehilangan keseimbangan?",
      category: "Gerak kasar",
      hasImage: false
    }
  ];

  // Questions for 37-48 months (42 months)
  const getQuestionsFor37To48Months = (): Question[] => [
    {
      id: 1,
      question: "Buat garis lurus ke bawah sepanjang sekurang-kurangnya 2,5 cm. Minta anak untuk menggambar garis lain di samping garis ini. Jawab 'Ya' bila ia menggambar garis seperti ini: Jawab 'Tidak' bila ia menggambar garis seperti ini:",
      category: "Gerak halus",
      hasImage: true,
      imagePath: "draw_parallel_lines_42m"
    },
    {
      id: 2,
      question: "Beri kubus di depan anak. Dapatkah anak menyusun 8 buah kubus satu persatu di atas kubus yang lain tanpa menjatuhkannya?",
      category: "Gerak halus",
      hasImage: false
    },
    {
      id: 3,
      question: "Tunjukkan anak gambar di bawah ini dan tanyakan: 'Mana yang dapat terbang?' 'Mana yang dapat mengeong?' 'Mana yang dapat bicara?' 'Mana yang dapat menggonggong?' 'Mana yang dapat meringkik?' Apakah anak dapat menunjuk 2 kegiatan yang sesuai?",
      category: "Bicara dan bahasa",
      hasImage: true,
      imagePath: "animal_activities"
    },
    {
      id: 4,
      question: "Tanyakan kepada anak pertanyaan berikut ini satu persatu: 'Apa yang kamu lakukan bila kedinginan?' Jawaban: pakai jaket, pakai selimut 'Apa yang kamu lakukan bila kamu kelelahan?' Jawaban: tidur, berbaring, istirahat 'Apa yang kamu lakukan bila kamu merasa lapar?' Jawaban: makan 'Apa yang kamu lakukan bila kamu merasa haus?' Jawaban: minum Apakah anak dapat menjawab 3 pertanyaan dengan benar tanpa gerakan dan isyarat?",
      category: "Bicara dan bahasa",
      hasImage: false
    },
    {
      id: 5,
      question: "Minta anak untuk menyebut 1 warna. Dapatkah anak menyebut 1 warna dengan benar?",
      category: "Bicara dan bahasa",
      hasImage: true,
      imagePath: "color_bar"
    },
    {
      id: 6,
      question: "Tanyakan kepada orang tua atau pengasuh, apakah anak dapat mencuci tangannya sendiri dengan baik setelah makan?",
      category: "Sosialisasi dan kemandirian",
      hasImage: false
    },
    {
      id: 7,
      question: "Tanyakan kepada orang tua atau pengasuh, dapatkah anak menyebut nama teman bermain di luar rumah atau saudara yang tidak tinggal serumah?",
      category: "Sosialisasi dan kemandirian",
      hasImage: false
    },
    {
      id: 8,
      question: "Tanyakan kepada orang tua atau pengasuh, dapatkah anak mengenakan kaos (T-shirt) tanpa dibantu?",
      category: "Sosialisasi dan kemandirian",
      hasImage: false
    },
    {
      id: 9,
      question: "Letakkan selembar kertas seukuran buku ini di atas lantai. Apakah anak dapat melompati bagian lebar kertas dengan mengangkat kedua kakinya secara bersamaan tanpa didahului lari?",
      category: "Gerak kasar",
      hasImage: false
    },
    {
      id: 10,
      question: "Minta anak untuk berdiri 1 kaki tanpa berpegangan. Jika perlu tunjukkan caranya dan beri anak kesempatan sebanyak 3 kali. Dapatkah ia mempertahankan keseimbangan dalam waktu 1 detik atau lebih?",
      category: "Gerak kasar",
      hasImage: false
    }
  ];

  // Questions for 49-60 months (48 months)
  const getQuestionsFor49To60Months = (): Question[] => [
    {
      id: 1,
      question: "Beri kubus di depan anak. Dapatkah anak menyusun kubus seperti jembatan (2 kubus dengan jarak kecil, lalu 1 kubus di atasnya)?",
      category: "Gerak halus",
      hasImage: true,
      imagePath: "build_bridge"
    },
    {
      id: 2,
      question: "Minta anak untuk menggambar lingkaran di kertas setelah Anda menunjukkan contohnya. Jangan membantu atau menyebut kata 'lingkaran'. Apakah anak dapat menggambar lingkaran seperti contoh?",
      category: "Gerak halus",
      hasImage: false
    },
    {
      id: 3,
      question: "Tunjukkan anak gambar di bawah ini dan tanyakan: 'Mana yang dapat terbang?' 'Mana yang dapat mengeong?' 'Mana yang dapat bicara?' 'Mana yang dapat menggonggong?' 'Mana yang dapat meringkik?' Apakah anak dapat menunjuk minimal 2 kegiatan yang sesuai?",
      category: "Bicara dan bahasa",
      hasImage: true,
      imagePath: "animal_activities_48m"
    },
    {
      id: 4,
      question: "Tanyakan kepada anak: 'Siapa nama lengkap kamu?' Apakah anak dapat menyebutkan nama lengkapnya tanpa bantuan? Jawab 'Tidak' jika hanya menyebut sebagian nama atau pengucapannya sulit dipahami.",
      category: "Bicara dan bahasa",
      hasImage: false
    },
    {
      id: 5,
      question: "Letakkan 5 kubus dan 1 kertas di depan anak. Minta anak untuk mengambil 1 kubus dan meletakkannya di atas kertas. Kemudian tanyakan: 'Berapa kubus yang ada di atas kertas?' Apakah anak dapat melakukan tindakan tersebut dan menjawab 'Satu'?",
      category: "Bicara dan bahasa",
      hasImage: false
    },
    {
      id: 6,
      question: "Tanyakan kepada anak tentang fungsi 3 benda: kursi (untuk duduk), cangkir (untuk minum), dan pensil (untuk menulis/menggambar). Apakah anak dapat menjawab ketiga fungsi dengan benar?",
      category: "Bicara dan bahasa",
      hasImage: false
    },
    {
      id: 7,
      question: "Tanyakan kepada orang tua atau pengasuh, apakah anak dapat mengikuti aturan permainan seperti 'ular tangga' dan 'petak umpet'?",
      category: "Sosialisasi dan kemandirian",
      hasImage: true,
      imagePath: "board_games"
    },
    {
      id: 8,
      question: "Tanyakan kepada orang tua atau pengasuh, apakah anak dapat bermain dengan teman-temannya tanpa selalu membutuhkan bantuan orang dewasa?",
      category: "Sosialisasi dan kemandirian",
      hasImage: true,
      imagePath: "play_with_friends"
    },
    {
      id: 9,
      question: "Letakkan selembar kertas seukuran buku ini di atas lantai. Apakah anak dapat melompati bagian lebar kertas dengan mengangkat kedua kakinya secara bersamaan tanpa didahului lari?",
      category: "Gerak kasar",
      hasImage: false
    },
    {
      id: 10,
      question: "Minta anak untuk berdiri 1 kaki tanpa berpegangan. Jika perlu tunjukkan caranya dan beri anak kesempatan sebanyak 3 kali. Dapatkah ia mempertahankan keseimbangan dalam waktu 2 detik atau lebih?",
      category: "Gerak kasar",
      hasImage: false
    }
  ];

  // Questions for 60+ months (54 months)
  const getQuestionsFor60PlusMonths = (): Question[] => [
    {
      id: 1,
      question: "Jangan mengoreksi atau membantu anak. Jangan menyebut kata 'Lebih panjang'. Perlihatkan gambar kedua garis ini pada anak. Tanyakan: 'Mana garis yang lebih panjang?' Minta anak menunjuk garis yang lebih panjang. Setelah anak menunjuk, putar lembar ini dan ulangi pertanyaan tersebut. Apakah anak dapat menunjuk garis yang lebih panjang sebanyak 3 kali dengan benar?",
      category: "Gerak halus",
      hasImage: true,
      imagePath: "longer_line"
    },
    {
      id: 2,
      question: "Jangan membantu anak dan jangan memberitahu nama gambar ini. Minta anak untuk menggambar + seperti contoh di kertas kosong yang tersedia. Berikan 3 kali kesempatan. Apakah anak dapat menggambar + seperti contoh di bawah?",
      category: "Gerak halus",
      hasImage: true,
      imagePath: "draw_plus_sign"
    },
    {
      id: 3,
      question: "Berikan anak pensil dan kertas lalu katakan kepada anak 'Buatlah gambar orang' (anak laki-laki, anak perempuan, papa, mama, dll). Jangan memberi perintah lebih dari itu. Jangan bertanya atau mengingatkan anak bila ada bagian yang belum tergambar. Dalam memberi nilai, hitunglah berapa bagian tubuh yang tergambar. Untuk bagian tubuh yang berpasangan seperti mata, telinga, lengan, dan kaki, setiap pasang dinilai 1 bagian. Pastikan anak telah menyelesaikan gambar sebelum memberikan penilaian. Dapatkah anak menggambar orang dengan sedikitnya 3 bagian tubuh?",
      category: "Gerak halus",
      hasImage: false
    },
    {
      id: 4,
      question: "Memahami konsep 2 warna. Minta anak untuk menyebutkan 2 warna. Dapatkah anak menyebut 2 warna dengan benar?",
      category: "Bicara dan bahasa",
      hasImage: false
    },
    {
      id: 5,
      question: "Tanyakan kepada orang tua atau pengasuh, apakah bicara anak mampu dipahami seluruhnya oleh orang lain (yang tidak bertemu setiap hari)?",
      category: "Bicara dan bahasa",
      hasImage: false
    },
    {
      id: 6,
      question: "Tanyakan kepada orang tua atau pengasuh, dapatkah anak mengikuti peraturan permainan saat bermain dengan teman-temannya (misal: ular tangga, petak umpet, dll)?",
      category: "Sosialisasi dan kemandirian",
      hasImage: false
    },
    {
      id: 7,
      question: "Tanyakan kepada orang tua atau pengasuh, dapatkah anak menggosok gigi tanpa dibantu?",
      category: "Sosialisasi dan kemandirian",
      hasImage: false
    },
    {
      id: 8,
      question: "Tanyakan kepada orang tua atau pengasuh, apakah anak dapat mengancingkan bajunya atau pakaian boneka?",
      category: "Sosialisasi dan kemandirian",
      hasImage: false
    },
    {
      id: 9,
      question: "Mengenal konsep 2 kata depan. Minta anak untuk mengikuti perintah di bawah, jangan memberi isyarat. 'Ambil benda (misalnya kertas, balok) dan letakkan di atas meja' 'Ambil benda (misalnya kertas, balok) dan letakkan di bawah meja' 'Ambil benda (misalnya kertas, balok) dan letakkan di depan ibu'",
      category: "Bicara dan bahasa",
      hasImage: false
    },
    {
      id: 10,
      question: "Minta anak untuk berdiri 1 kaki tanpa berpegangan. Jika perlu tunjukkan caranya dan beri anak kesempatan sebanyak 3 kali. Dapatkah ia mempertahankan keseimbangan dalam waktu 2 detik atau lebih?",
      category: "Gerak kasar",
      hasImage: false
    }
  ];

  const handleAnswer = (questionId: number, answer: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Check if all questions are answered
      const unansweredQuestions = questions.filter(q => answers[q.id] === null);
      if (unansweredQuestions.length > 0) {
        Alert.alert('Peringatan', 'Silakan jawab semua pertanyaan terlebih dahulu');
        return;
      }

      // Prepare submission data
      const ageInMonths = calculateAgeInMonths();
      const questionnaireType = getQuestionnaireType(ageInMonths);
      
      const submission: QuestionnaireSubmission = {
        child_id: childData.id,
        questionnaire_type: questionnaireType,
        age_in_months: ageInMonths,
        answers: questions.map(q => ({
          question_id: q.id,
          answer: answers[q.id] || false
        })),
        completed_at: new Date().toISOString()
      };

      console.log('Submitting questionnaire:', submission);
      
      // Submit to backend
      const result = await questionnaireService.submitQuestionnaire(submission);
      
      console.log('Questionnaire result:', result);
      
      Alert.alert(
        'Berhasil', 
        `Kuesioner berhasil disimpan!\n\nStatus Perkembangan: ${result.development_status}\nSkor: ${result.score_percentage}%`, 
        [
          {
            text: 'OK',
            onPress: onBack,
          },
        ]
      );
      
    } catch (error: any) {
      console.error('Failed to submit questionnaire:', error);
      Alert.alert('Error', error.message || 'Gagal menyimpan kuesioner');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getQuestionnaireType = (ageInMonths: number): string => {
    if (ageInMonths >= 0 && ageInMonths <= 3) {
      return '0-3_months';
    } else if (ageInMonths >= 4 && ageInMonths <= 6) {
      return '4-6_months';
    } else if (ageInMonths >= 7 && ageInMonths <= 9) {
      return '7-9_months';
    } else if (ageInMonths >= 10 && ageInMonths <= 12) {
      return '10-12_months';
    } else if (ageInMonths >= 13 && ageInMonths <= 18) {
      return '13-18_months';
    } else if (ageInMonths >= 19 && ageInMonths <= 24) {
      return '19-24_months';
    } else if (ageInMonths >= 25 && ageInMonths <= 36) {
      return '25-36_months';
    } else if (ageInMonths >= 37 && ageInMonths <= 48) {
      return '37-48_months';
    } else if (ageInMonths >= 49 && ageInMonths <= 60) {
      return '49-60_months';
    } else if (ageInMonths >= 61) {
      return '60+_months';
    } else {
      return '0-3_months'; // Default fallback
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Gerak kasar':
        return '#4CAF50'; // Green
      case 'Sosialisasi dan kemandirian':
        return '#FFC107'; // Yellow
      case 'Bicara dan bahasa':
        return '#F44336'; // Red
      case 'Gerak halus':
        return '#2196F3'; // Blue
      default:
        return '#9E9E9E'; // Gray
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Gerak kasar':
        return 'fitness-outline';
      case 'Sosialisasi dan kemandirian':
        return 'people-outline';
      case 'Bicara dan bahasa':
        return 'chatbubbles-outline';
      case 'Gerak halus':
        return 'hand-left-outline';
      default:
        return 'help-outline';
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#87CEEB" />
        <Text style={styles.loadingText}>Memuat kuesioner...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const ageInMonths = calculateAgeInMonths();

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
          <Text style={styles.headerTitle}>Kuesioner Tumbuh Kembang</Text>
          <Text style={styles.headerSubtitle}>{childData.name} - {getAgeDisplay()}</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {currentQuestionIndex + 1} dari {questions.length}
          </Text>
        </View>

        {/* Question Card */}
        {currentQuestion && (
          <View style={styles.questionCard}>
            {/* Category Badge */}
            <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(currentQuestion.category) }]}>
              <Ionicons 
                name={getCategoryIcon(currentQuestion.category) as any} 
                size={16} 
                color="#FFFFFF" 
              />
              <Text style={styles.categoryText}>{currentQuestion.category}</Text>
            </View>

            {/* Question Number and Text */}
            <View style={styles.questionContent}>
              <Text style={styles.questionNumber}>Pertanyaan {currentQuestion.id}</Text>
              <Text style={styles.questionText}>{currentQuestion.question}</Text>
              
              {/* Question Image (if available) */}
              {currentQuestion.hasImage && (
                <View style={styles.questionImageContainer}>
                  <View style={styles.questionImagePlaceholder}>
                    <Ionicons name="image-outline" size={48} color="#87CEEB" />
                    <Text style={styles.questionImageText}>Ilustrasi</Text>
                  </View>
                </View>
              )}
            </View>

            {/* Answer Options */}
            <View style={styles.answerContainer}>
              <TouchableOpacity
                style={[
                  styles.answerButton,
                  answers[currentQuestion.id] === true && styles.answerButtonSelected
                ]}
                onPress={() => handleAnswer(currentQuestion.id, true)}
              >
                <View style={[
                  styles.answerRadio,
                  answers[currentQuestion.id] === true && styles.answerRadioSelected
                ]}>
                  {answers[currentQuestion.id] === true && <View style={styles.answerRadioInner} />}
                </View>
                <Text style={[
                  styles.answerText,
                  answers[currentQuestion.id] === true && styles.answerTextSelected
                ]}>
                  Ya
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.answerButton,
                  answers[currentQuestion.id] === false && styles.answerButtonSelected
                ]}
                onPress={() => handleAnswer(currentQuestion.id, false)}
              >
                <View style={[
                  styles.answerRadio,
                  answers[currentQuestion.id] === false && styles.answerRadioSelected
                ]}>
                  {answers[currentQuestion.id] === false && <View style={styles.answerRadioInner} />}
                </View>
                <Text style={[
                  styles.answerText,
                  answers[currentQuestion.id] === false && styles.answerTextSelected
                ]}>
                  Tidak
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={[styles.navButton, currentQuestionIndex === 0 && styles.navButtonDisabled]}
            onPress={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <Ionicons name="chevron-back" size={20} color={currentQuestionIndex === 0 ? "#CCCCCC" : "#87CEEB"} />
            <Text style={[styles.navButtonText, currentQuestionIndex === 0 && styles.navButtonTextDisabled]}>
              Sebelumnya
            </Text>
          </TouchableOpacity>

          {currentQuestionIndex === questions.length - 1 ? (
            <TouchableOpacity
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                  <Text style={styles.submitButtonText}>Selesai</Text>
                </>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.navButton}
              onPress={handleNext}
            >
              <Text style={styles.navButtonText}>Selanjutnya</Text>
              <Ionicons name="chevron-forward" size={20} color="#87CEEB" />
            </TouchableOpacity>
          )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#666',
    marginTop: 10,
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
  progressContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#87CEEB',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 10,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 15,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  questionContent: {
    marginBottom: 20,
  },
  questionNumber: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#87CEEB',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#333',
    lineHeight: 24,
  },
  questionImageContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  questionImagePlaceholder: {
    width: 120,
    height: 80,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E9ECEF',
    borderStyle: 'dashed',
  },
  questionImageText: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: '#87CEEB',
    marginTop: 4,
  },
  answerContainer: {
    gap: 12,
  },
  answerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E9ECEF',
  },
  answerButtonSelected: {
    backgroundColor: '#E3F2FD',
    borderColor: '#87CEEB',
  },
  answerRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerRadioSelected: {
    borderColor: '#87CEEB',
  },
  answerRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#87CEEB',
  },
  answerText: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#666',
    flex: 1,
  },
  answerTextSelected: {
    color: '#87CEEB',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 10,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#87CEEB',
    backgroundColor: '#FFFFFF',
  },
  navButtonDisabled: {
    borderColor: '#CCCCCC',
    backgroundColor: '#F5F5F5',
  },
  navButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#87CEEB',
    marginHorizontal: 8,
  },
  navButtonTextDisabled: {
    color: '#CCCCCC',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#87CEEB',
  },
  submitButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  submitButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default GrowthQuestionnaireScreen;
