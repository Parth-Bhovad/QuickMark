function generateOTP(length = 6) {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}

const verificationCodes = new Map();
function storeVerificationCode(subjectName, code) {
  verificationCodes.set(subjectName, code);
  // Auto-delete code after 10 minutes
  setTimeout(() => verificationCodes.delete(subjectName), 10 * 60 * 1000);
}
function getVerificationCode(subjectName) {
  return verificationCodes.get(subjectName);
}

function deleteVerificationCode(subjectName) {
  verificationCodes.delete(subjectName);
}

export { generateOTP, storeVerificationCode, getVerificationCode, deleteVerificationCode };