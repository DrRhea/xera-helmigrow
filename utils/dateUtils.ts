/**
 * Utility functions for date and age calculations
 */

/**
 * Calculate age in months from birth date
 * @param birthDate - Birth date in various formats (YYYY-MM-DD, ISO string, etc.)
 * @returns Age in months (0-60), or -1 if invalid
 */
export const calculateAgeInMonths = (birthDate: string): number => {
  // Validasi input birthDate
  if (!birthDate || birthDate.trim() === '') {
    return -1; // Return -1 untuk menandai error
  }
  
  // Handle different date formats
  let birth: Date;
  let processedDate = birthDate;
  
  // Clean the date string
  if (typeof birthDate === 'string') {
    // Remove any extra spaces
    processedDate = birthDate.trim();
    
    // If it's a Laravel datetime format (YYYY-MM-DD HH:MM:SS), extract just the date part
    if (processedDate.includes(' ') && processedDate.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
      processedDate = processedDate.split(' ')[0];
    }
  }
  
  // Try parsing different date formats
  if (processedDate.includes('T')) {
    // ISO format: 2024-01-01T00:00:00.000000Z
    birth = new Date(processedDate);
  } else if (processedDate.includes('-') && processedDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
    // Date format: 2024-01-01
    birth = new Date(processedDate + 'T00:00:00.000Z');
  } else {
    // Try direct parsing
    birth = new Date(processedDate);
  }
  
  const today = new Date();
  
  // Validasi apakah Date object valid
  if (isNaN(birth.getTime())) {
    return -1; // Return -1 untuk menandai error
  }
  
  // Validasi tanggal lahir tidak boleh di masa depan
  if (birth > today) {
    return -1; // Return -1 untuk menandai error
  }
  
  // Perhitungan usia yang lebih akurat dengan mempertimbangkan hari
  let ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12 + 
                   (today.getMonth() - birth.getMonth());
  
  // Jika hari lahir belum tiba di bulan ini, kurangi 1 bulan
  if (today.getDate() < birth.getDate()) {
    ageInMonths--;
  }
  
  // Pastikan usia tidak negatif
  if (ageInMonths < 0) {
    ageInMonths = 0;
  }
  
  // Batasi usia maksimal 60 bulan (5 tahun) untuk bayi
  return Math.min(ageInMonths, 60);
};

/**
 * Format age in months to human readable format
 * @param ageInMonths - Age in months
 * @returns Formatted age string (e.g., "2 bulan", "1 tahun 3 bulan")
 */
export const formatAge = (ageInMonths: number): string => {
  if (ageInMonths < 0) {
    return 'Usia tidak valid';
  }
  
  if (ageInMonths === 0) {
    return 'Baru lahir';
  }
  
  if (ageInMonths < 12) {
    return `${ageInMonths} bulan`;
  }
  
  const years = Math.floor(ageInMonths / 12);
  const months = ageInMonths % 12;
  
  if (months === 0) {
    return `${years} tahun`;
  }
  
  return `${years} tahun ${months} bulan`;
};

/**
 * Format date to Indonesian format
 * @param dateString - Date string in various formats
 * @returns Formatted date string (e.g., "29 Oktober 2024")
 */
export const formatDateIndonesian = (dateString: string): string => {
  if (!dateString) return '';
  
  let processedDate = dateString.trim();
  
  // Handle different date formats
  if (processedDate.includes(' ')) {
    processedDate = processedDate.split(' ')[0];
  }
  
  let date: Date;
  if (processedDate.includes('T')) {
    date = new Date(processedDate);
  } else if (processedDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
    date = new Date(processedDate + 'T00:00:00.000Z');
  } else {
    date = new Date(processedDate);
  }
  
  if (isNaN(date.getTime())) {
    return 'Tanggal tidak valid';
  }
  
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
};

/**
 * Get current date in YYYY-MM-DD format
 * @returns Current date string
 */
export const getCurrentDateString = (): string => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Validate date string format
 * @param dateString - Date string to validate
 * @returns True if valid date format
 */
export const isValidDate = (dateString: string): boolean => {
  if (!dateString) return false;
  
  let processedDate = dateString.trim();
  if (processedDate.includes(' ')) {
    processedDate = processedDate.split(' ')[0];
  }
  
  let date: Date;
  if (processedDate.includes('T')) {
    date = new Date(processedDate);
  } else if (processedDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
    date = new Date(processedDate + 'T00:00:00.000Z');
  } else {
    date = new Date(processedDate);
  }
  
  return !isNaN(date.getTime());
};



