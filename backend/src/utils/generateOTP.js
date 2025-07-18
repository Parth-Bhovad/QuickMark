function generateOTP(length = 6) {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}

const verificationCodes = new Map();
function storeVerificationCode(key, value, timeLimit = 10 * 60 * 1000) {
  verificationCodes.set(key, value);
  // Auto-delete code after timeLimit
  setTimeout(() => verificationCodes.delete(key), timeLimit);
}
function getVerificationCode(key) {
  return verificationCodes.get(key);
}

function deleteVerificationCode(key) {
  verificationCodes.delete(key);
}

export { generateOTP, storeVerificationCode, getVerificationCode, deleteVerificationCode };