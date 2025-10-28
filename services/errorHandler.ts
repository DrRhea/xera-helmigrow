// Helper function untuk handle error messages
export const getErrorMessage = (error: any): string => {
  if (!error.response) {
    return error.message || 'Terjadi kesalahan';
  }

  const status = error.response.status;
  const data = error.response.data;

  // Handle validation errors (422)
  if (status === 422 && data.errors) {
    const errors = data.errors;
    const errorMessages: string[] = [];

    // Map common validation errors to Indonesian
    Object.keys(errors).forEach(field => {
      const fieldErrors = errors[field];
      fieldErrors.forEach((errorMsg: string) => {
        let translatedError = errorMsg;
        
        // Translate common validation messages
        if (errorMsg.includes('field is required')) {
          translatedError = `${field} harus diisi`;
        } else if (errorMsg.includes('must be at least 8 characters')) {
          translatedError = 'Password harus minimal 8 karakter';
        } else if (errorMsg.includes('has already been taken')) {
          if (field === 'email') {
            translatedError = 'Email sudah terdaftar';
          } else if (field === 'phone') {
            translatedError = 'Nomor HP sudah terdaftar';
          } else {
            translatedError = `${field} sudah digunakan`;
          }
        } else if (errorMsg.includes('must be a valid email')) {
          translatedError = 'Format email tidak valid';
        } else if (errorMsg.includes('does not match')) {
          translatedError = 'Password dan konfirmasi password tidak sama';
        } else if (errorMsg.includes('must be at least')) {
          translatedError = `${field} terlalu pendek`;
        } else if (errorMsg.includes('must not be greater than')) {
          translatedError = `${field} terlalu panjang`;
        }
        
        errorMessages.push(translatedError);
      });
    });

    return errorMessages.join('\n');
  }

  // Handle other HTTP errors
  switch (status) {
    case 401:
      return 'Nomor HP atau password salah';
    case 403:
      return 'Akses ditolak';
    case 404:
      return 'Data tidak ditemukan';
    case 500:
      return 'Terjadi kesalahan server';
    default:
      return data.message || 'Terjadi kesalahan';
  }
};

// Helper function untuk log error dengan format yang konsisten
export const logError = (context: string, error: any) => {
  console.error(`❌ ${context} Error:`, {
    message: error.message,
    status: error.response?.status,
    data: error.response?.data,
    stack: error.stack
  });
};
